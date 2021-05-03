import React from 'react';
import * as s from './style.module.css';
import Logo from './logo-without-shadow.inline.svg';
import { Link } from 'gatsby';

const NAV_ITEMS = [
    {
        to: '/chez-company',
        children: 'über',
    },
    {
        to: '/projekte',
        children: 'projekte',
    },
    {
        to: '/impressum',
        children: 'impressum',
    },
];

export default function Navigation() {
    return (
        <div className={s.container}>
            <Link to="/">
                <Logo className={s.logo} />
            </Link>
            <nav className={s.nav}>
                {NAV_ITEMS.map(item => (
                    <Link
                        key={item.to}
                        className={s.link}
                        activeClassName={s.active}
                        {...item}
                    />
                ))}
            </nav>
        </div>
    );
}
