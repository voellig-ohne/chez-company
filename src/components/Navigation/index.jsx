import React from 'react';
import * as s from './style.module.css';
import Logo from './logo-without-shadow.inline.svg';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { getRoute } from '../util';

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
        </div>
    );
}
