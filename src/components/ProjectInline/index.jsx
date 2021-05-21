import * as s from './style.module.css';
import React from 'react';
import { Link } from 'gatsby';

export function ProjectInline({
    slug,
    title,
    year,
    yearUntil,
    persons,
    metaDescription,
}) {
    const superTitle = year && yearUntil ? `${year} – ${yearUntil}` : year;
    const description = metaDescription?.internal?.content;
    console.log(description, metaDescription);

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
                        <li className={s.person} key={person.id}>
                            {person.name}
                        </li>
                    ))}
                </ul>
            )}
            {description && <p className={s.description}>{description}</p>}
        </Link>
    );
}
