import { graphql } from 'gatsby';
import React from 'react';
import { Page } from '../Page';
import { Project } from '../Project';

export default function ProjectPage({ data, location }) {
    const { projectDe: project, projectEn } = data;
    const superTitle =
        project.year && project.yearUntil
            ? `${project.year} – ${project.yearUntil}`
            : project.year;

    return (
        <Page
            title={project.title}
            superTitle={superTitle}
            metaDescription={project.metaDescription?.metaDescription}
            color="pink"
            location={location}
        >
            <Project
                {...project}
                descriptionEn={projectEn.description}
                location={location}
            />
        </Page>
    );
}

export const pageQuery = graphql`
    query ProjectById($rawSlug: String!, $id: String!) {
        projectDe: contentfulProject(id: { eq: $id }) {
            title
            id
            year
            yearUntil
            metaDescription {
                metaDescription
            }
            description {
                ...textContentfulProject
            }
            tags {
                id
                title
                image {
                    id
                    gatsbyImageData(layout: FIXED, width: 100)
                }
                text {
                    text
                }
            }
            persons {
                internal {
                    type
                }
                name
                slug
                id
                image {
                    id
                    gatsbyImageData(layout: FIXED, width: 100)
                }
                profession
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
                            gatsbyImageData(layout: CONSTRAINED, width: 200)
                        }
                    }
                    ... on ContentfulFragmentVideo {
                        internal {
                            type
                        }
                        id
                        slug
                        title
                        youtubeId
                    }
                    ... on ContentfulFragmentAudio {
                        internal {
                            type
                        }
                        id
                        slug
                        title
                        audio {
                            file {
                                url
                            }
                        }
                    }
                }
            }
            supportOrg {
                id
                link
                name
                logo {
                    id
                    gatsbyImageData(layout: FIXED, width: 100)
                    file {
                        contentType
                        url
                    }
                }
            }
        }
        projectEn: contentfulProject(
            slug: { eq: $rawSlug }
            node_locale: { eq: "en" }
        ) {
            description {
                ...textContentfulProject
            }
        }
    }
`;
