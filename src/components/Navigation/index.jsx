import React from 'react';
import * as s from './style.module.css';
import Logo from './logo-without-shadow.inline.svg';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { getRoute } from '../util';
import FacebookIcon from './facebook-brands.inline.svg';
import InstagramIcon from './instagram-brands.inline.svg';
import TwitchIcon from './twitch-brands.inline.svg';

const SOCIAL_MEDIA_CHANNELS = [
    {
        title: 'Twitch',
        type: 'twitch',
        link: 'https://www.twitch.tv/chezcompany',
        Icon: TwitchIcon,
    },
    {
        title: 'Facebook',
        type: 'facebook',
        link: 'https://www.facebook.com/ChezIcke/',
        Icon: FacebookIcon,
    },
    {
        title: 'Instagram',
        type: 'instagram',
        link: 'https://www.instagram.com/p/CPQBBkUnfiG/',
        Icon: InstagramIcon,
    },
];

export default function Navigation() {
    const {
        contentfulGlobal: { menu },
    } = useStaticQuery(graphql`
        query MenuQuery {
            contentfulGlobal(
                id: { eq: "7a2518b6-52e7-59d7-b0a0-1a812f2980b9" }
            ) {
                title
                description {
                    description
                }
                ogimage {
                    resize(width: 1000) {
                        src
                    }
                }
                menu {
                    ... on ContentfulPage {
                        title
                        slug
                        internal {
                            type
                        }
                    }
                    ... on ContentfulProject {
                        title
                        slug
                        internal {
                            type
                        }
                    }
                    ... on ContentfulFragmentText {
                        title
                        slug
                        internal {
                            type
                        }
                    }
                    ... on ContentfulFragmentVideo {
                        title
                        slug
                        internal {
                            type
                        }
                    }
                    ... on ContentfulFragmentAudio {
                        title
                        slug
                        internal {
                            type
                        }
                    }
                }
            }
        }
    `);

    return (
        <div className={s.container}>
            <Link to="/">
                <Logo className={s.logo} />
            </Link>
            <nav className={s.nav}>
                {menu.map(item => (
                    <Link
                        key={item.slug}
                        className={s.link}
                        activeClassName={s.active}
                        to={getRoute(item)}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
            <div className={s.social}>
                {SOCIAL_MEDIA_CHANNELS.map(({ title, link, type, Icon }) => (
                    <a
                        href={link}
                        key={type}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={title}
                        title={title}
                        className={s.socialLink}
                    >
                        <Icon className={s.socialIcon} />
                    </a>
                ))}
            </div>
        </div>
    );
}
