import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { YoutubeEmbed } from '../YoutubeEmbed';
import * as s from './style.module.css';

export function Fragment({ description, images, youtubeId, audio }) {
    return (
        <>
            {youtubeId && <YoutubeEmbed youtubeUrl={youtubeId} />}
            {audio?.file?.url && (
                <audio controls autoPlay src={audio.file.url} />
            )}
            {images?.length && (
                <div className={s.images}>
                    {images.map(image => (
                        <GatsbyImage
                            key={image.id}
                            alt={''}
                            image={image.gatsbyImageData}
                        />
                    ))}
                </div>
            )}
            <div>{contentfulRichtTextToThml(description?.raw)}</div>
        </>
    );
}
