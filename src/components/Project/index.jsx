import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import * as s from './style.module.css';
import React, { useRef, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { VideoPreview } from '../YoutubeEmbed';
import { getRandomTagColors, getRoute } from '../util';
import { PersonInline } from '../PersonInline';
import { SubHeading } from '../SubHeading';

export function Project({ description, tags, fragments, persons, supportOrg }) {
    return (
        <>
            <div className={s.tags}>
                {tags?.map(tag => (
                    <TagItem key={tag.id} {...tag} />
                ))}
            </div>
            <div>
                <ContentfulRichtTextToHtml source={description} />
            </div>
            <Fragments fragments={fragments} />

            <SubHeading>Mitwirkende</SubHeading>
            <div className={s.persons}>
                {persons?.map(person => (
                    <PersonInline key={person.id} {...person} />
                ))}
            </div>

            {supportOrg?.length && (
                <>
                    <SubHeading>Unterstützer*innen</SubHeading>
                    <SupportOrganisations orgs={supportOrg} />
                </>
            )}
        </>
    );
}

function SupportOrganisations({ orgs }) {
    return (
        <ul className={s.supportOrgs}>
            {orgs?.map(({ id, link, logo, name }) => (
                <li className={s.supportOrg} key={id}>
                    <SupportOrgLink link={link}>
                        {logo.file.contentType === 'image/svg+xml' ? (
                            <img
                                alt={name}
                                src={logo.file.url}
                                className={s.supportOrgLogo}
                            />
                        ) : (
                            <GatsbyImage
                                alt={name}
                                className={s.supportOrgLogo}
                                image={logo.gatsbyImageData}
                            />
                        )}
                    </SupportOrgLink>
                </li>
            ))}
        </ul>
    );
}

function SupportOrgLink({ link, children }) {
    if (link) {
        return (
            <a target="_blank" href={link} rel="noreferrer">
                {children}
            </a>
        );
    }
    return children;
}

function TagItem({ image, text, title }) {
    const [colors] = useState(getRandomTagColors(title));

    if (image?.gatsbyImageData) {
        return <GatsbyImage alt={title || ''} image={image?.gatsbyImageData} />;
    }

    if (text?.text) {
        const fontSizeFactor = 0.5 + (1 / text.text.split('\n').length) * 0.5;
        return (
            <div className={s.tagText}>
                <span
                    className={s.tagTextInner}
                    style={{
                        background: colors[0],
                        color: colors[1],
                        fontSize: `${fontSizeFactor * 2}rem`,
                    }}
                >
                    {text.text}
                </span>
            </div>
        );
    }

    return null;
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
            to={getRoute(fragment)}
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
                <VideoPreview youtubeUrl={fragment.youtubeId} />
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
