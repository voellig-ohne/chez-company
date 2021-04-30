const Promise = require('bluebird');
const path = require('path');
const { stringToSslug } = require('./src/components/util');

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
                    allContentfulProject {
                        edges {
                            node {
                                slug
                                id
                            }
                        }
                    }
                    allContentfulFragmentText {
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
                    allContentfulFragmentAudio {
                        edges {
                            node {
                                slug
                                id
                            }
                        }
                    }
                    allContentfulPerson {
                        edges {
                            node {
                                slug
                                id
                            }
                        }
                    }
                    allContentfulPage {
                        edges {
                            node {
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

                result.data?.allContentfulProject.edges.forEach(project => {
                    const slug = `/projekt/${stringToSslug(project.node.slug)}`;

                    createPage({
                        path: slug,
                        component: ProjectPage,
                        context: { slug, id: project.node.id },
                    });
                });

                result.data?.allContentfulPerson.edges.forEach(person => {
                    const slug = `/person/${stringToSslug(person.node.slug)}`;

                    createPage({
                        path: slug,
                        component: PersonPage,
                        context: { slug, id: person.node.id },
                    });
                });

                result.data?.allContentfulPage.edges.forEach(page => {
                    const slug = `/${stringToSslug(page.node.slug)}`;

                    createPage({
                        path: slug,
                        component: StaticPage,
                        context: { slug, id: page.node.id },
                    });
                });

                const fragments = [
                    ...result.data?.allContentfulFragmentText.edges,
                    ...result.data?.allContentfulFragmentVideo.edges,
                    ...result.data?.allContentfulFragmentAudio.edges,
                ];
                fragments.forEach(fragment => {
                    const slug = `/fragment/${stringToSslug(
                        fragment.node.slug
                    )}`;

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
