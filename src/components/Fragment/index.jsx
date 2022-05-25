import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { IFrameEmbed, useImagesForAnimation } from '../YoutubeEmbed';
import * as s from './style.module.css';
import { Helmet } from 'react-helmet';

export function Fragment({
    description,
    images,
    youtubeId,
    audio,
    aspectRatio,
}) {
    const animationImages = useImagesForAnimation(youtubeId);
    return (
        <>
            <Helmet>
                {!!images?.length && (
                    <meta
                        property="og:image"
                        content={images[0].gatsbyImageData?.images?.fallback?.src.replace(
                            '//',
                            'https://'
                        )}
                    />
                )}
                {youtubeId && (
                    <meta
                        property="og:image"
                        content={animationImages.length && animationImages[0]}
                    />
                )}
                {!!images?.length && (
                    <meta
                        name="twitter:image"
                        content={images[0].gatsbyImageData?.images?.fallback?.src.replace(
                            '//',
                            'https://'
                        )}
                    />
                )}
                {youtubeId && (
                    <meta
                        name="twitter:image"
                        content={animationImages.length && animationImages[0]}
                    />
                )}
            </Helmet>
            {youtubeId && (
                <IFrameEmbed youtubeUrl={youtubeId} aspectRatio={aspectRatio} />
            )}
            {audio?.file?.url && (
                <audio controls autoPlay src={audio.file.url} />
            )}
            {!!images?.length && (
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
            <div>
                <ContentfulRichtTextToHtml source={description} />
            </div>
        </>
    );
}
