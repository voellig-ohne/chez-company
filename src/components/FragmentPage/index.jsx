import { graphql } from 'gatsby';
import React from 'react';
import { Fragment } from '../Fragment';
import { Page } from '../Page';

export default function FragmentPage({
    data: { contentfulFragmentTextBild, contentfulFragmentVideo },
}) {
    const fragment = contentfulFragmentTextBild || contentfulFragmentVideo;
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
            image {
                gatsbyImageData(width: 800)
            }
        }
        contentfulFragmentVideo(id: { eq: $id }) {
            title
            id
            youtubeId
        }
    }
`;
