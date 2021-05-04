import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
    YoutubeEmbed,
    getPreviewImagesForAnimation,
    youtubeParser,
} from '../YoutubeEmbed';
import * as s from './style.module.css';
import { Helmet } from 'react-helmet';

export function Fragment({ description, images, youtubeId, audio }) {
    return (
        <>
            <Helmet>
                {images?.length && (
                    <meta
                        property="og:image"
                        content={
                            images[0].gatsbyImageData?.images?.fallback?.src
                        }
                    />
                )}
                {youtubeId && (
                    <meta
                        property="og:image"
                        content={
                            getPreviewImagesForAnimation(
                                youtubeParser(youtubeId)
                            )[0]
                        }
                    />
                )}
            </Helmet>
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
            <div>{contentfulRichtTextToThml(description)}</div>
        </>
    );
}
