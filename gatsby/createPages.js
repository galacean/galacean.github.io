/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

const { resolve } = require('path');
const { version } = require('../siteconfig.json');

async function createHomepage(actions) {
  const { createPage, createRedirect } = actions;

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
  });

  // 首页的中文版
  const indexTemplate = resolve(__dirname, '../src/pages/index.tsx');

  createPage({
    path: '/index-cn',
    component: indexTemplate,
  });
}

async function createDoc(graphql, actions) {
  const { createPage, createRedirect } = actions;

  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
                underScoreCasePath
                path
              }
            }
          }
        }
      }
    `,
  );


  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);

    throw Error(allMarkdown.errors);
  }

  const { edges } = allMarkdown.data.allMarkdownRemark;

  edges.forEach((edge) => {
    const { slug } = edge.node.fields;
    if (slug.includes('docs/') || slug.includes('/blog')) {
      const createArticlePage = (path) => {
        return createPage({
          path: slug.includes('docs/') ? version + path : path,
          component: docsTemplate,
          context: {
            slug,
            // if is docs page
            type: slug.includes('docs/') ? '/docs/' : '/blog/',
            locale: slug.includes('-cn') ? '/-cn/' : '//',
          },
        });
      };

      // Register primary URL.
      createArticlePage(slug.replace('/index', ''));
    }
  });

  createRedirect({
    fromPath: `${version}/docs/`,
    redirectInBrowser: true,
    toPath: `${version}/docs/install`,
  });
}

async function createAPI(graphql, actions) {
  const { createPage } = actions;

  const apiTemplate = resolve(__dirname, '../src/templates/api.tsx');
  const typedocquery = await graphql(
    `
    {
      typedoc {
        internal {
          content
        }
      }
    }
    `,
  );


  let apis = JSON.parse(typedocquery.data.typedoc.internal.content);

  const packages = apis.children.map((p) => {
    return {
      id: p.id,
      kind: p.kind,
      name: p.name.replace('/src', '')
    };
  });

  if (apis) {
    apis.children.forEach((node, i) => {
      const name = node.name.replace('/src', '');

      createPage({
        path: `${version}/api/${name}/index`,
        component: apiTemplate,
        context: { node, type: 'package', packages }
      });

      if (node.children) {
        node.children.forEach((child) => {
          // console.log('node:', node)
          createPage({
            path: `${version}/api/${name}/${child.name}`,
            component: apiTemplate,
            context: { node: child, type: 'module', packages, packageIndex: i }
          });
        })
      }
    });
  }
}

async function createPlayground(graphql, actions) {
  const { createPage } = actions;
  // Playground
  const playgroundTemplate = resolve(__dirname, '../src/templates/playground.tsx');

  const playgroundquery = await graphql(
    `
    {
      allPlayground {
        nodes {
          internal {
            content
          }
          name
          id
        }
      }
    }
    `,
  );

  if (playgroundquery.errors) {
    console.error(playgroundquery.errors);

    throw Error(playgroundquery.errors);
  }

  const { nodes } = playgroundquery.data.allPlayground;

  nodes.forEach(node => {
    createPage({
      path: `${version}/playground/${node.name}`,
      component: playgroundTemplate,
      context: { node }
    });
  })

  // examples page
  createPage({
    path: `${version}/examples`,
    component: resolve(__dirname, '../src/pages/examples.tsx') 
  });

  // gltf viewer page
  createPage({
    path: `/gltf-viewer`,
    component: resolve(__dirname, '../src/pages/gltf-viewer.tsx')
  });
}

module.exports = async ({ graphql, actions }) => {
  const { createRedirect } = actions;

  createHomepage(actions);
  await createDoc(graphql, actions);
  await createAPI(graphql, actions);
  await createPlayground(graphql, actions);

  const blogEdges = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/blog/" }, fields: { slug: {} } }
          sort: { order: DESC, fields: [frontmatter___time] }
          limit: 1
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  const { node } = blogEdges.data.allMarkdownRemark.edges[0];
  const blogPath = node.fields.slug.replace('-cn', '');

  createRedirect({
    fromPath: '/blog-cn',
    redirectInBrowser: true,
    toPath: `${blogPath}-cn`,
  });

  createRedirect({
    fromPath: '/blog/',
    redirectInBrowser: true,
    toPath: blogPath,
  });
};
