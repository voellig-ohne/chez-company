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
            </Helmet>
            <div className={s.graph}>
                {typeof window !== 'undefined' && <ProjectGraph />}
            </div>
            <Navigation />
            {path !== '/' && children}
        </>
    );
}