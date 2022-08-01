const babel = require("@babel/core");
const Prism = require('prismjs');

exports.onCreateNode = module.exports.onCreateNode = async function onCreateNode(
  {
    node,
    loadNodeContent,
    actions,
    createNodeId,
    reporter,
    createContentDigest
  }
) {
  try {
    const { createNode } = actions

    const content = await loadNodeContent(node)

    const result = babel.transformSync(content, {
      presets: [
        ["@babel/preset-env",
          {
            "loose": true,
            "modules": 'umd'
          }
        ],
        "@babel/preset-typescript"
      ],
      plugins: [
        [
          "@babel/plugin-proposal-class-properties", { loose: true },
        ],
        [
          "@babel/plugin-transform-modules-umd",
          {
            "globals": {
              "oasis-engine-toolkit": "oasisEngineToolkit",
              "@oasis-engine-toolkit/controls": "@oasisEngineToolkit/controls",
              "@oasis-engine-toolkit/framebuffer-picker": "@oasisEngineToolkit/framebufferPicker",
              "@oasis-engine-toolkit/stats": "@oasisEngineToolkit/stats",
              "@oasis-engine-toolkit/auxiliary-lines": "@oasisEngineToolkit/auxiliaryLines",
              "@oasis-engine-toolkit/skeleton-viewer": "@oasisEngineToolkit/skeletonViewer",
              "@oasis-engine-toolkit/planar-shadow-material": "@oasisEngineToolkit/planarShadowMaterial",
              "@oasis-engine-toolkit/lines": "@oasisEngineToolkit/lines",
              "@oasis-engine-toolkit/gizmo": "@oasisEngineToolkit/gizmo",
              "@oasis-engine-toolkit/outline": "@oasisEngineToolkit/outline",
              "@oasis-engine/physics-lite": "@oasisEngine/physicsLite",
              "@oasis-engine/physics-physx": "@oasisEngine/physicsPhysx",
              "@oasis-engine/spine": "oasisSpine",
              "@oasis-engine/lottie": "engine-lottie",
              "@oasis-engine/baker": "@oasisEngine/baker",
              "dat.gui": "dat",
              "@tweenjs/tween.js": "TWEEN"
            },
            exactGlobals: true
          }
        ],
      ],
      filename: "index.ts",
    });

    const titleResult = /@title\s+(.+)|([\u4e00-\u9fa5]+)\b/.exec(content);
    const categoryResult = /@category\s+(.+)|([\u4e00-\u9fa5]+)\b/.exec(content);
    // const orderResult = /@order\s+(.+)\b/.exec(content);

    const playgroundNode = {
      id: createNodeId(`${node.id} >>> Playground`),
      playgroundId: 'default',
      name: node.name,
      title: titleResult ? titleResult[1] : node.name,
      category: categoryResult ? categoryResult[1] : 'Others',
      // order: orderResult ? orderResult[1] : 0,
      sourceCode: content,
      formatedCode: Prism.highlight(content, Prism.languages.javascript, 'javascript'),
      internal: {
        content: result.code,
        type: `Playground`,
      },
    }

    playgroundNode.internal.contentDigest = createContentDigest(playgroundNode)

    createNode(playgroundNode)

    return playgroundNode
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Playground ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
      }:\n
      ${err.message}`
    )

    return {} // eslint
  }
}

module.exports.unstable_shouldOnCreateNode = function ({ node }) {
  return node.extension === `ts`
}