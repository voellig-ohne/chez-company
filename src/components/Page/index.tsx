import clsx from 'clsx';
import { Link, navigate } from 'gatsby';
import React, { useCallback, useEffect, useRef } from 'react';
import * as s from './style.module.css';

export function Page({
    children,
    color = 'white',
    size = 'medium',
    title,
}: {
    children: React.ReactNode;
    color?: 'pink' | 'blue' | 'white';
    size?: 'medium' | 'large';
    title?: React.ReactNode;
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
        if (!clickInside) {
            // TODO: FIX THIS, DIRTY HACK NEEDS TO BE DONE PROPERLY!!
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
        <main className={clsx(s.main, s[size])}>
            <article className={clsx(s.article, s[color])} ref={ref}>
                <Link
                    className={s.backButton}
                    to="/"
                    aria-label="zurück"
                    title="zurück"
                ></Link>
                {title && (
                    <h1 className={s.heading}>
                        <span className={s.headingInner}>{title}</span>
                    </h1>
                )}
                {children}
            </article>
        </main>
    );
}
