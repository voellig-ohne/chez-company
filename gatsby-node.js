const Promise = require('bluebird');
const path = require('path');
const { getRoute } = require('./src/components/util');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'build-html' || stage === 'develop-html') {
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
        const ProjectPage = path.resolve(
            './src/components/ProjectPage/index.jsx'
        );
        const FragmentPage = path.resolve(
            './src/components/FragmentPage/index.jsx'
        );
        const PersonPage = path.resolve(
            './src/components/PersonPage/index.jsx'
        );
        const StaticPage = path.resolve(
            './src/components/StaticPage/index.jsx'
        );
        resolve(
            graphql(`
                {
                    allContentfulProject(
                        filter: { node_locale: { eq: "de" } }
                    ) {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                    allContentfulFragmentText {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                    allContentfulFragmentVideo {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                    allContentfulFragmentAudio {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                    allContentfulPerson {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                    allContentfulPage {
                        edges {
                            node {
                                internal {
                                    type
                                }
                                slug
                                id
                            }
                        }
                    }
                }
            `).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                result.data?.allContentfulProject.edges.forEach(({ node }) => {
                    const slug = getRoute(node);

                    createPage({
                        path: slug,
                        component: ProjectPage,
                        context: { slug, id: node.id },
                    });
                });

                result.data?.allContentfulPerson.edges.forEach(({ node }) => {
                    const slug = getRoute(node);

                    createPage({
                        path: slug,
                        component: PersonPage,
                        context: { slug, id: node.id },
                    });
                });

                result.data?.allContentfulPage.edges.forEach(({ node }) => {
                    const slug = getRoute(node);

                    createPage({
                        path: slug,
                        component: StaticPage,
                        context: { slug, id: node.id },
                    });
                });

                const fragments = [
                    ...result.data?.allContentfulFragmentText.edges,
                    ...result.data?.allContentfulFragmentVideo.edges,
                    ...result.data?.allContentfulFragmentAudio.edges,
                ];
                fragments.forEach(({ node }) => {
                    const slug = getRoute(node);

                    createPage({
                        path: slug,
                        component: FragmentPage,
                        context: { slug, id: node.id },
                    });
                });
            })
        );
    });
};
