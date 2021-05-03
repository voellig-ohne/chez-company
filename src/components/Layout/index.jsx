import React from 'react';
import * as s from './style.module.css';
import './style.css';
import { ProjectGraph } from '../ProjectGraph';
import Navigation from '../Navigation';
import { Helmet } from 'react-helmet';
import Favicon from './favicon.png';

export default function Layout({ children, path }) {
    return (
        <>
            <Helmet
                defaultTitle="Chez Company"
                titleTemplate="Chez Company - %s"
            >
                <link rel="icon" type="image/png" href={Favicon} />
                <link
                    rel="canonical"
                    href={`https://chez-company.org${path}`}
                />
            </Helmet>
            <div className={s.graph}>
                <ProjectGraph />
            </div>
            <Navigation />
            {path !== '/' && children}
        </>
    );
}
