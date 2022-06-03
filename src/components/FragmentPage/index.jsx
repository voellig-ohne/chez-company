import { graphql } from 'gatsby';
import { some } from 'lodash';
import React from 'react';
import { Fragment } from '../Fragment';
import { Page } from '../Page';
import { ProjectInline } from '../ProjectInline';
import { SubHeading } from '../SubHeading';

export default function FragmentPage({
    data: {
        contentfulFragmentText,
        contentfulFragmentVideo,
        contentfulFragmentAudio,
        allContentfulProject,
        fragmentTextEn,
    },
    location,
}) {
    const fragment =
        contentfulFragmentText ||
        contentfulFragmentVideo ||
        contentfulFragmentAudio;
    const fragmentEn = fragmentTextEn;

    const projects = allContentfulProject.edges.filter(
        ({ node: { fragments, hideInGraph } }) =>
            some(fragments, { id: fragment.id }) && !hideInGraph
    );

    return (
        <Page
            color="blue"
            size={!!contentfulFragmentVideo ? 'large' : 'medium'}
            title={fragment.title}
            metaDescription={fragment.metaDescription?.metaDescription}
            blankPage={fragment.blankPage}
            location={location}
        >
            <Fragment {...fragment} descriptionEn={fragmentEn?.description} />
            {!!projects.length && (
                <>
                    <SubHeading>Projekte</SubHeading>
                    {projects.map(({ node }) => (
                        <ProjectInline key={node.id} {...node} />
                    ))}
                </>
            )}
        </Page>
    );
}

export const pageQuery = graphql`
    query FragmentById($rawSlug: String!, $id: String!) {
        contentfulFragmentText(id: { eq: $id }) {
            title
            id
            description {
                ...textContentfulFragment
            }
            images {
                id
                gatsbyImageData(width: 800)
            }
            metaDescription {
                metaDescription
            }
        }
        fragmentTextEn: contentfulFragmentText(
            slug: { eq: $rawSlug }
            node_locale: { eq: "en" }
        ) {
            description {
                ...textContentfulFragment
            }
        }
        contentfulFragmentVideo(id: { eq: $id }) {
            title
            id
            youtubeId
            metaDescription {
                metaDescription
            }
            aspectRatio
            blankPage
        }
        contentfulFragmentAudio(id: { eq: $id }) {
            title
            audio {
                file {
                    url
                }
            }
            id
            metaDescription {
                metaDescription
            }
        }
        allContentfulProject(sort: { fields: year, order: DESC }) {
            edges {
                node {
                    id
                    title
                    year
                    yearUntil
                    metaDescription {
                        metaDescription
                        internal {
                            content
                        }
                    }
                    slug
                    persons {
                        name
                        id
                    }
                    fragments {
                        ... on ContentfulFragmentAudio {
                            id
                        }
                        ... on ContentfulFragmentText {
                            id
                        }
                        ... on ContentfulFragmentVideo {
                            id
                        }
                    }
                    hideInGraph
                }
            }
        }
    }
`;
