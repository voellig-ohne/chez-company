const Promise = require("bluebird");
const path = require("path");
const { stringToSslug } = require("./src/components/util");

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-force-graph/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const ProjectPage = path.resolve("./src/components/ProjectPage/index.jsx");
    const FragmentPage = path.resolve(
      "./src/components/FragmentPage/index.jsx"
    );
    resolve(
      graphql(`
        {
          allContentfulProjekt {
            edges {
              node {
                slug
                id
              }
            }
          }
          allContentfulFragmentTextBild {
            edges {
              node {
                slug
                id
              }
            }
          }
          allContentfulFragmentVideo {
            edges {
              node {
                slug
                id
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        result.data?.allContentfulProjekt.edges.forEach((project) => {
          const slug = `/projekt/${stringToSslug(project.node.slug)}`;

          createPage({
            path: slug,
            component: ProjectPage,
            context: { slug, id: project.node.id },
          });
        });

        const fragments = [
          ...result.data?.allContentfulFragmentTextBild.edges,
          ...result.data?.allContentfulFragmentVideo.edges,
        ];
        fragments.forEach((fragment) => {
          const slug = `/fragment/${stringToSslug(fragment.node.slug)}`;

          createPage({
            path: slug,
            component: FragmentPage,
            context: { slug, id: fragment.node.id },
          });
        });
      })
    );
  });
};
