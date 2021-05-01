import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import React from 'react';
import { graphql } from 'gatsby';
import { ProjectInline } from './ProjectInline';

export default function contentfulRichtTextToThml(source) {
    if (!source) return null;

    const options = {
        renderText: text =>
            text
                .split('\n')
                .flatMap((text, i) => [i > 0 && <br key={i} />, text]),

        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                console.log(node);
                if (node.data?.target?.internal?.type === 'ContentfulProject') {
                    return <ProjectInline {...node.data.target} />;
                }
                return null;
            },
        },
    };

    return renderRichText(source, options);
}

export const markdownFrontmatterFragment = graphql`
    fragment textStuff on ContentfulPageText {
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
                    name
                }
            }
        }
    }
`;
