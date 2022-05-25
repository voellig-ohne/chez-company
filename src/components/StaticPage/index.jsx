import { graphql } from 'gatsby';
import React from 'react';
import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import { Page } from '../Page';

export default function StaticPage({
    data: {
        contentfulPage: { title, text, metaDescription },
    },
    location,
}) {
    return (
        <Page
            title={title}
            color="pink"
            metaDescription={metaDescription?.metaDescription}
            location={location}
        >
            <ContentfulRichtTextToHtml source={text} />
        </Page>
    );
}

export const pageQuery = graphql`
    query PageById($id: String!) {
        contentfulPage(id: { eq: $id }) {
            title
            id
            text {
                ...textContentfulPage
            }
            metaDescription {
                metaDescription
            }
        }
    }
`;
