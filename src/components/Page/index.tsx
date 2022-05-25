import clsx from 'clsx';
import { Link, navigate } from 'gatsby';
import React, { useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import * as s from './style.module.css';

export function Page({
    children,
    color = 'white',
    size = 'medium',
    title,
    superTitle,
    metaDescription,
    blankPage,
    location,
}: {
    children: React.ReactNode;
    color?: 'pink' | 'blue' | 'white';
    size?: 'medium' | 'large';
    title?: string;
    superTitle?: React.ReactNode;
    metaDescription?: string;
    blankPage?: boolean;
    location?: any;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            navigate('/');
        }
    }, []);

    const handleWindowClick = useCallback((event: MouseEvent) => {
        const clickInside =
            event.target instanceof Node && ref.current?.contains(event.target);

        const navClick = !!(event.target as HTMLElement).closest('nav');

        if (!clickInside && !navClick) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleWindowClick);
        };
    }, [handleKeyDown, handleWindowClick]);

    return (
        <main
            className={clsx(s.main, s[size], {
                [s.blankPage]: blankPage,
            })}
        >
            <Helmet title={title}>
                <meta property="og:title" content={title} />
                <meta property="twitter:title" content={title} />
                {metaDescription && (
                    <meta name="description" content={metaDescription} />
                )}
                {metaDescription && (
                    <meta
                        name="twitter:description"
                        content={metaDescription}
                    />
                )}
            </Helmet>
            <article className={clsx(s.article, s[color])} ref={ref}>
                <Link
                    className={s.backButton}
                    to="/"
                    aria-label="zurück"
                    title="zurück"
                    onClick={e => {
                        if (location?.state.goBack) {
                            navigate(-1);
                            e.preventDefault();
                        }
                    }}
                ></Link>
                <header className={s.header}>
                    {superTitle && (
                        <div className={s.superTitle}>
                            <span className={s.superTitleInner}>
                                {superTitle}
                            </span>
                        </div>
                    )}
                    {title && (
                        <h1 className={s.heading}>
                            <span className={s.headingInner}>{title}</span>
                        </h1>
                    )}
                    {metaDescription && (
                        <h2 className={s.subTitle}>{metaDescription}</h2>
                    )}
                </header>
                {children}
            </article>
        </main>
    );
}
