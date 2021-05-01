import React from 'react';
import * as s from './style.module.css';
import Logo from './logo-without-shadow.inline.svg';
import { Link } from 'gatsby';

const NAV_ITEMS = [
    {
        to: '/impressum',
        children: 'impressum',
    },
    {
        to: '/projekte',
        children: 'projekte',
    },
];

export default function Navigation() {
    return (
        <div className={s.nav}>
            <Link to="/">
                <Logo className={s.logo} />
            </Link>
            <nav>
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
