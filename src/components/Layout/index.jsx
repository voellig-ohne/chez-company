import React from 'react';
import * as s from './style.module.css';
import './style.css';
import { ProjectGraph } from '../ProjectGraph';
import Navigation from '../Navigation';
import { Helmet } from 'react-helmet';
import Favicon from './favicon.png';
import { graphql, useStaticQuery } from 'gatsby';

export default function Layout({ children, path }) {
    const {
        contentfulGlobal: { title, description, ogimage },
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
            }
        }
    `);

    return (
        <>
            <Helmet defaultTitle={title} titleTemplate={`${title} - %s`}>
                <link rel="icon" type="image/png" href={Favicon} />
                <link
                    rel="canonical"
                    href={`https://chez-company.org${path}`}
                />
                <meta name="description" content={description?.description} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={ogimage?.resize?.src} />
            </Helmet>
            <div className={s.graph}>
                <ProjectGraph />
            </div>
            <Navigation />
            {path !== '/' && children}
        </>
    );
}
