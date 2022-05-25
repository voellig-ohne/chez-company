import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import { Page } from '../Page';
import { ProjectInline } from '../ProjectInline';
import { SubHeading } from '../SubHeading';

export default function PersonPage({
    data: {
        contentfulPerson: { name, description, image, profession },
        allContentfulProject: { edges: projects },
    },
}) {
    return (
        <Page superTitle={profession} title={name} color="pink">
            <Helmet>
                {image && (
                    <meta
                        property="og:image"
                        content={image?.gatsbyImageData?.images?.fallback?.src.replace(
                            '//',
                            'https://'
                        )}
                    />
                )}
                {image && (
                    <meta
                        name="twitter:image"
                        content={image?.gatsbyImageData?.images?.fallback?.src.replace(
                            '//',
                            'https://'
                        )}
                    />
                )}
            </Helmet>
            <GatsbyImage
                alt={`Bild von ${name}`}
                image={image?.gatsbyImageData}
            />
            <ContentfulRichtTextToHtml source={description} />
            {projects && (
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
        allContentfulProject(
            filter: {
                persons: { elemMatch: { id: { eq: $id } } }
                hideInGraph: { ne: true }
                node_locale: { eq: "de" }
            }
            sort: { fields: year, order: DESC }
        ) {
            edges {
                node {
                    title
                    year
                    yearUntil
                    slug
                    id
                    metaDescription {
                        internal {
                            content
                        }
                    }
                    persons {
                        name
                        id
                    }
                }
            }
        }
    }
`;
