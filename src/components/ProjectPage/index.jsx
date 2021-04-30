import { graphql } from 'gatsby';
import React from 'react';
import { Page } from '../Page';
import { Project } from '../Project';

export default function ProjectPage({ data: { contentfulProjekt: project } }) {
    const superTitle =
        project.year && project.yearUntil
            ? `${project.year} – ${project.yearUntil}`
            : project.year;

    return (
        <Page title={project.title} superTitle={superTitle} color="pink">
            <Project {...project} />
        </Page>
    );
}

export const pageQuery = graphql`
    query ProjectById($id: String!) {
        contentfulProjekt(id: { eq: $id }) {
            title
            id
            year
            yearUntil
            description {
                raw
            }
            tags {
                id
                title
                image {
                    id
                    gatsbyImageData(layout: FIXED, width: 100)
                }
            }
            persons {
                name
                slug
                id
                image {
                    id
                    gatsbyImageData(layout: FIXED, width: 100)
                }
            }
            fragments {
                ... on Node {
                    ... on ContentfulFragmentTextBild {
                        id
                        title
                        slug
                        images {
                            id
                            gatsbyImageData(layout: CONSTRAINED, width: 200)
                        }
                    }
                    ... on ContentfulFragmentVideo {
                        id
                        slug
                        title
                        youtubeId
                    }
                    ... on ContentfulFragmentAudio {
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
        }
    }
`;
