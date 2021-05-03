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
        }
        contentfulFragmentVideo(id: { eq: $id }) {
            title
            id
            youtubeId
        }
        contentfulFragmentAudio(id: { eq: $id }) {
            title
            audio {
                file {
                    url
                }
            }
            id
        }
    }
`;
