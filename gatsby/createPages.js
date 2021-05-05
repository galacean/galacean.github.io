/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

const { resolve } = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Used to detect and prevent duplicate redirects

  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
  });

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
  const redirects = {};

  const { edges } = allMarkdown.data.allMarkdownRemark;
  
  edges.forEach((edge) => {
    const { slug, underScoreCasePath } = edge.node.fields;
    if (slug.includes('docs/') || slug.includes('/blog')) {
      const template = docsTemplate;
      const createArticlePage = (path) => {
        if (underScoreCasePath !== path) {
          redirects[underScoreCasePath] = path;
        }

        return createPage({
          path,
          component: template,
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

  // API
  const apiTemplate  = resolve(__dirname, '../src/templates/api.tsx');
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
        path: `api/${name}/`,
        component: apiTemplate,
        context: { node, paths: `${name}/`, type: 'package', packages}
      });

      if (node.children){
        node.children.forEach((child) => {
          // console.log('node:', node)
          createPage({
            path: `api/${name}/${child.name}`,
            component: apiTemplate,
            context: { node: child, paths: `${name}/${child.name}`, type: 'module', packages, packageIndex: i }
          });
        })
      }
    });
  }

  // Playground
  const playgroundTemplate  = resolve(__dirname, '../src/templates/playground.tsx');

  const playgroundquery = await graphql(
    `
    {
      playground {
        internal {
          content
        }
      }
    }
    `,
  );

  createPage({
    path: `playground/transform`,
    component: playgroundTemplate,
    context: { node: playgroundquery }
  });

  // 首页的中文版
  const indexTemplate = resolve(__dirname, '../src/pages/index.tsx');

  createPage({
    path: '/index-cn',
    component: indexTemplate,
  });

  createRedirect({
    fromPath: '/docs/',
    redirectInBrowser: true,
    toPath: '/docs/getting-started',
  });

  createRedirect({
    fromPath: '/blog/beter-block/',
    redirectInBrowser: true,
    toPath: '/blog/better-block',
  });

  createRedirect({
    fromPath: '/blog/beter-block-cn/',
    redirectInBrowser: true,
    toPath: '/blog/better-block-cn',
  });

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

  Object.keys(redirects).map((path) =>
    createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path],
    }),
  );
};
