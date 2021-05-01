import * as s from './style.module.css';
import React from 'react';
import { Link } from 'gatsby';

export function ProjectInline({ slug, title, year, yearUntil, persons }) {
    const superTitle = year && yearUntil ? `${year} – ${yearUntil}` : year;

    return (
        <Link to={`/projekt/${slug}`} className={s.project}>
            {superTitle && (
                <div className={s.superTitle}>
                    <span>{superTitle}</span>
                </div>
            )}
            <h2 className={s.title}>
                <span>{title}</span>
            </h2>
            {persons?.length && (
                <ul className={s.persons}>
                    {persons.map(person => (
                        <li className={s.person}>{person.name}</li>
                    ))}
                </ul>
            )}
        </Link>
    );
}
