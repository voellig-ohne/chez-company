import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import * as s from './style.module.css';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { YoutubePreview } from '../YoutubeEmbed';
import { stringToSslug } from '../util';

export function Project({ description, tags, fragments }) {
    return (
        <>
            <div className={s.tags}>
                {tags?.map(tag => {
                    if (!tag?.image?.gatsbyImageData) return null;
                    return (
                        <GatsbyImage
                            key={tag.id}
                            alt={tag.title || ''}
                            image={tag?.image?.gatsbyImageData}
                        />
                    );
                })}
            </div>
            <div>{contentfulRichtTextToThml(description?.raw)}</div>
            <Fragments fragments={fragments} />
        </>
    );
}

function Fragments({ fragments }) {
    if (!fragments) return null;

    return (
        <div className={s.fragments}>
            {fragments.map(fragment => (
                <FragmentItem key={fragment?.id} {...fragment} />
            ))}
        </div>
    );
}

function FragmentItem(fragment) {
    if (!fragment) return null;

    const image = fragment.images[0];

    return (
        <Link
            to={`/fragment/${stringToSslug(fragment.slug)}`}
            className={s.fragmentLink}
        >
            <h1 className={s.fragmentHeading}>{fragment.title}</h1>
            {image && (
                <GatsbyImage
                    alt={image.title || ''}
                    image={image.gatsbyImageData}
                    className={s.fragmentImage}
                />
            )}
            {fragment.youtubeId && (
                <YoutubePreview youtubeUrl={fragment.youtubeId} />
            )}
        </Link>
    );
}
