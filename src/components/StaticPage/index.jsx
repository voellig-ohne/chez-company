import { graphql } from 'gatsby';
import React from 'react';
import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import { Page } from '../Page';

export default function PersonPage({
    data: {
        contentfulPage: { title, text, metaDescription },
    },
}) {
    return (
        <Page
            title={title}
            color="pink"
            metaDescription={metaDescription?.metaDescription}
        >
            {contentfulRichtTextToThml(text)}
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
