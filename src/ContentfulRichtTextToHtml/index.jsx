import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import React from 'react';
import { graphql } from 'gatsby';
import { ProjectInline } from '../components/ProjectInline';
import { PersonInline } from '../components/PersonInline';
import * as s from './style.module.css';

export default function ContentfulRichtTextToHtml({ source }) {
    if (!source) return null;

    const options = {
        renderText: text =>
            text
                .split('\n')
                .flatMap((text, i) => [i > 0 && <br key={i} />, text]),

        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                if (node.data?.target?.internal?.type === 'ContentfulProject') {
                    return <ProjectInline {...node.data.target} />;
                }
                if (node.data?.target?.internal?.type === 'ContentfulPerson') {
                    return <PersonInline {...node.data.target} />;
                }
                return null;
            },
        },
    };

    return <div className={s.container}>{renderRichText(source, options)}</div>;
}

export const markdownFrontmatterFragment = graphql`
    fragment textContentfulPage on ContentfulPageText {
        raw
        references {
            ... on ContentfulProject {
                contentful_id
                internal {
                    type
                }
                title
                slug
                year
                yearUntil
                persons {
                    id
                    name
                }
                metaDescription {
                    internal {
                        content
                    }
                }
            }
            ... on ContentfulPerson {
                contentful_id
                internal {
                    type
                }
                name
                profession
                slug
                image {
                    id
                    gatsbyImageData(width: 200)
                }
            }
        }
    }
    fragment textStuff2 on ContentfulFragmentTextDescription {
        raw
        references {
            ... on ContentfulProject {
                contentful_id
                title
                slug
                year
                yearUntil
                internal {
                    type
                }
                persons {
                    id
                    name
                }
                metaDescription {
                    internal {
                        content
                    }
                }
            }
        }
    }
`;
