import { graphql } from 'gatsby';
import React from 'react';
import { Fragment } from '../Fragment';
import { Page } from '../Page';

export default function FragmentPage({
    data: {
        contentfulFragmentText,
        contentfulFragmentVideo,
        contentfulFragmentAudio,
    },
}) {
    const fragment =
        contentfulFragmentText ||
        contentfulFragmentVideo ||
        contentfulFragmentAudio;
    return (
        <Page
            color="blue"
            size={!!contentfulFragmentVideo ? 'large' : 'medium'}
            title={fragment.title}
            metaDescription={fragment.metaDescription?.metaDescription}
        >
            <Fragment {...fragment} />
        </Page>
    );
}

export const pageQuery = graphql`
    query FragmentById($id: String!) {
        contentfulFragmentText(id: { eq: $id }) {
            title
            id
            description {
                ...textStuff2
            }
            images {
                id
                gatsbyImageData(width: 800)
            }
            metaDescription {
                metaDescription
            }
        }
        contentfulFragmentVideo(id: { eq: $id }) {
            title
            id
            youtubeId
            metaDescription {
                metaDescription
            }
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
    }
`;
