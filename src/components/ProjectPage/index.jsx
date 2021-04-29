import { graphql } from 'gatsby';
import React from 'react';
import { Page } from '../Page';
import { Project } from '../Project';

export default function ProjectPage({ data: { contentfulProjekt: project } }) {
    return (
        <Page title={project.title} color="pink">
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
