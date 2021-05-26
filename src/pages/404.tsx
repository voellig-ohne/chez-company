import { Link } from 'gatsby';
import React from 'react';
import { Page } from '../components/Page';

export default function Error404() {
    return (
        <Page title="Nix gefunden :-/">
            Schade. <Link to="/chez-company">Hier mehr über Chez Company.</Link>
        </Page>
    );
}
