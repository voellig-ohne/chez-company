import React from 'react';
import * as s from './style.module.css';
import './style.css';
import { ProjectGraph } from '../ProjectGraph';
import Navigation from '../Navigation';
import { Helmet } from 'react-helmet';
import Favicon from './favicon.png';
import { graphql, Link, useStaticQuery } from 'gatsby';

export default function Layout({ children, path }) {
    const {
        contentfulGlobal: {
            title,
            description,
            ogimage,
            storerText,
            storerLink,
            storerText2,
            storerLink2,
            projectFocus,
        },
    } = useStaticQuery(graphql`
        query GlobalStuffQuery {
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
                storerText
                storerLink
                storerText2
                storerLink2
                projectFocus {
                    id
                }
            }
        }
    `);

    return (
        <>
            <Helmet defaultTitle={title} titleTemplate={`${title} - %s`}>
                <link
                    rel="icon"
                    type="image/png"
                    href={`${process.env.GATSBY_ROOT_URL}${Favicon}`}
                />
                <link
                    rel="canonical"
                    href={`${process.env.GATSBY_ROOT_URL}${path}`}
                />
                <meta name="description" content={description?.description} />
                <meta property="og:site_name" content={title} />
                <meta property="og:title" content={title} />
                <meta
                    property="og:image"
                    content={ogimage?.resize?.src.replace('//', 'https://')}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta
                    name="twitter:description"
                    content={description?.description}
                />
                <meta
                    name="twitter:image"
                    content={ogimage?.resize?.src.replace('//', 'https://')}
                />
            </Helmet>
            <div className={s.graph}>
                <ProjectGraph projectFocusId={projectFocus?.id} path={path} />
            </div>
            <Navigation />
            {storerText && storerLink && (
                <div className={s.storerContainer}>
                    <Link
                        to={storerLink}
                        className={s.storer}
                        aria-label={storerText}
                    >
                        {generateStorerText(storerText)}
                    </Link>
                </div>
            )}
            {storerText2 && storerLink2 && (
                <div className={s.storerContainer}>
                    <Link
                        to={storerLink}
                        className={s.storer}
                        aria-label={storerText}
                    >
                        {generateStorerText(storerText)}
                    </Link>
                </div>
            )}
            {storerText2 && storerLink2 && (
                <div className={s.storerContainer2}>
                    <Link
                        to={storerLink2}
                        className={s.storer2}
                        aria-label={storerText2}
                    >
                        {generateStorerText(storerText2)}
                    </Link>
                </div>
            )}
            {path !== '/' && children}
        </>
    );
}

function generateStorerText(storerText) {
    return new Array(100).fill().map(() => {
        return ` +++ ${storerText}`;
    });
}
