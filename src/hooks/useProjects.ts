import { useStaticQuery, graphql } from 'gatsby';

export const useProjects = () => {
    const {
        allContentfulProjekt: { edges },
    } = useStaticQuery<GatsbyTypes.ProjectsQuery>(
        graphql`
            query Projects {
                allContentfulProjekt {
                    edges {
                        node {
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
                                image {
                                    id
                                    resize(width: 200) {
                                        aspectRatio
                                        src
                                    }
                                }
                            }
                            fragments {
                                ... on Node {
                                    ... on ContentfulFragmentTextBild {
                                        id
                                        title
                                        slug
                                    }
                                    ... on ContentfulFragmentVideo {
                                        id
                                        title
                                        slug
                                    }
                                    ... on ContentfulFragmentAudio {
                                        id
                                        title
                                        slug
                                    }
                                }
                            }
                            persons {
                                name
                                id
                                image {
                                    resize(width: 200) {
                                        aspectRatio
                                        src
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    );

    return edges;
};
