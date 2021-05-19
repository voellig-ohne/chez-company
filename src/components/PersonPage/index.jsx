import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import { Page } from '../Page';

export default function PersonPage({
    data: {
        contentfulPerson: { name, description, image, profession },
    },
}) {
    return (
        <Page superTitle={profession} title={name} color="pink">
            <Helmet>
                {image && (
                    <meta
                        property="og:image"
                        content={`${process.env.GATSBY_ROOT_URL}${image?.gatsbyImageData?.images?.fallback?.src}`}
                    />
                )}
            </Helmet>
            <GatsbyImage
                alt={`Bild von ${name}`}
                image={image?.gatsbyImageData}
            />
            {contentfulRichtTextToThml(description)}
        </Page>
    );
}

export const pageQuery = graphql`
    query PersonById($id: String!) {
        contentfulPerson(id: { eq: $id }) {
            name
            id
            profession
            description {
                raw
            }
            image {
                id
                gatsbyImageData(width: 800)
            }
        }
    }
`;
