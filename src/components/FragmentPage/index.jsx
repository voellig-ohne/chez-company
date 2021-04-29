import { graphql } from 'gatsby';
import React from 'react';
import { Fragment } from '../Fragment';
import { Page } from '../Page';

export default function FragmentPage({
    data: {
        contentfulFragmentTextBild,
        contentfulFragmentVideo,
        contentfulFragmentAudio,
    },
}) {
    const fragment =
        contentfulFragmentTextBild ||
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
        contentfulFragmentTextBild(id: { eq: $id }) {
            title
            id
            description {
                raw
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
