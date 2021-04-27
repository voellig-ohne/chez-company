import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { YoutubeEmbed } from '../YoutubeEmbed';

type ProjectProps = {
    title?: string;
    description?: { raw: string };
    image?: { gatsbyImageData: IGatsbyImageData };
    youtubeId?: string;
};

export function Fragment({ description, image, youtubeId }: ProjectProps) {
    return (
        <>
            {youtubeId && <YoutubeEmbed youtubeUrl={youtubeId} />}
            {image && <GatsbyImage alt={''} image={image.gatsbyImageData} />}
            <div>{contentfulRichtTextToThml(description?.raw)}</div>
        </>
    );
}
