import { graphql } from 'gatsby';
import React from 'react';
import { DuoLangDescription } from '../DuoLangDescription';
import { Page } from '../Page';

export default function StaticPage({
    data: {
        contentfulPage: { title, text, metaDescription },
        pageEn: { text: textEn },
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
            <DuoLangDescription de={text} en={textEn} />
        </Page>
    );
}

export const pageQuery = graphql`
    query PageById($rawSlug: String!, $id: String!) {
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
        pageEn: contentfulPage(
            slug: { eq: $rawSlug }
            node_locale: { eq: "en" }
        ) {
            text {
                ...textContentfulPage
            }
        }
    }
`;
