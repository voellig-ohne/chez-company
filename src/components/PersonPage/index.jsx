import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import { DuoLangDescription } from '../DuoLangDescription';
import { Page } from '../Page';
import { ProjectInline } from '../ProjectInline';
import { SubHeading } from '../SubHeading';

export default function PersonPage({
    data: {
        personDe: { name, description, image, profession },
        personEn: { description: descriptionEn },
        allContentfulProject: { edges: projects },
    },
    location,
}) {
    return (
        <Page
            superTitle={profession}
            title={name}
            color="pink"
            location={location}
        >
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
                style={{ marginBottom: '1rem' }}
            />
            <DuoLangDescription de={description} en={descriptionEn} />
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
    query PersonById($rawSlug: String!, $id: String!) {
        personDe: contentfulPerson(id: { eq: $id }) {
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
        personEn: contentfulPerson(
            slug: { eq: $rawSlug }
            node_locale: { eq: "en" }
        ) {
            description {
                raw
            }
        }
        allContentfulProject(
            filter: {
                persons: { elemMatch: { id: { eq: $id } } }
                hideInGraph: { ne: true }
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
