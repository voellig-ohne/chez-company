import { useStaticQuery, graphql } from 'gatsby';

export const useProjects = () => {
    const {
        allContentfulProject: { edges },
    } = useStaticQuery<GatsbyTypes.ProjectsQuery>(
        graphql`
            query Projects {
                allContentfulProject {
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
                                    ... on ContentfulFragmentText {
                                        id
                                        title
                                        slug
                                        images {
                                            id
                                            resize(width: 200) {
                                                aspectRatio
                                                src
                                            }
                                        }
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
