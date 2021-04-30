import contentfulRichtTextToThml from '../contentfulRichTextToHtml';
import * as s from './style.module.css';
import React, { useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { YoutubePreview } from '../YoutubeEmbed';
import { stringToSslug } from '../util';

export function Project({ description, tags, fragments, persons }) {
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
            <div className={s.persons}>
                {persons?.map(person => {
                    if (!person?.image?.gatsbyImageData) return null;
                    return (
                        <Link
                            to={`/person/${stringToSslug(person.slug)}`}
                            key={person.id}
                        >
                            <GatsbyImage
                                alt={person.name}
                                title={person.name}
                                image={person?.image?.gatsbyImageData}
                            />
                        </Link>
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
    const audioref = useRef();
    if (!fragment) return null;

    const image = fragment.images && fragment?.images[0];

    return (
        <Link
            to={`/fragment/${stringToSslug(fragment.slug)}`}
            className={s.fragmentLink}
            onMouseEnter={() => {
                audioref?.current?.play();
            }}
            onMouseLeave={() => {
                audioref?.current?.pause();
            }}
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
            {fragment.audio?.file?.url && (
                <div className={s.audio}>
                    <audio ref={audioref} src={fragment.audio?.file?.url} />
                    <div className={s.audioInner}>💿</div>
                </div>
            )}
        </Link>
    );
}
