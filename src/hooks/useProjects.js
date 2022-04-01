import { useStaticQuery, graphql } from 'gatsby';

export const useProjects = () => {
    const {
        allContentfulProject: { edges },
    } = useStaticQuery(
        graphql`
            query Projects {
                allContentfulProject {
                    edges {
                        node {
                            internal {
                                type
                            }
                            id
                            year
                            title
                            slug
                            description {
                                raw
                            }
                            tags {
                                id
                                title
                                text {
                                    text
                                }
                                image {
                                    id
                                    resize(width: 200) {
                                        width
                                        height
                                        src
                                    }
                                }
                            }
                            fragments {
                                ... on Node {
                                    ... on ContentfulFragmentText {
                                        internal {
                                            type
                                        }
                                        id
                                        title
                                        slug
                                        images {
                                            id
                                            resize(width: 200) {
                                                width
                                                height
                                                src
                                            }
                                        }
                                    }
                                    ... on ContentfulFragmentVideo {
                                        internal {
                                            type
                                        }
                                        id
                                        title
                                        slug
                                    }
                                    ... on ContentfulFragmentAudio {
                                        internal {
                                            type
                                        }
                                        id
                                        title
                                        slug
                                    }
                                }
                            }
                            persons {
                                internal {
                                    type
                                }
                                name
                                id
                                image {
                                    resize(width: 200) {
                                        width
                                        height
                                        src
                                    }
                                }
                            }
                            hideInGraph
                        }
                    }
                }
            }
        `
    );

    return edges;
};
