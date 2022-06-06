import * as s from './style.module.css';
import React, { useEffect, useState } from 'react';
import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import clsx from 'clsx';

const languages = ['de', 'en'];

export function DuoLangDescription({ de, en }) {
    const [lang, setLang] = useState(getDefaultLang());

    useEffect(() => {
        setLang(getDefaultLang());
    }, []);
    console.log(lang);

    function setLanguage(language) {
        setLang(language);
        localStorage.setItem('lang', language);
    }

    if (!en) {
        return <ContentfulRichtTextToHtml source={de} />;
    }

    return (
        <>
            <div className={s.buttons}>
                {languages.map(buttonLang => (
                    <button
                        key={buttonLang}
                        className={clsx(s.button, {
                            [s.buttonActive]: lang === buttonLang,
                        })}
                        onClick={() => {
                            setLanguage(buttonLang);
                        }}
                    >
                        {buttonLang}
                    </button>
                ))}
            </div>
            <ContentfulRichtTextToHtml source={lang === 'de' ? de : en} />
        </>
    );
}

function getDefaultLang() {
    if (typeof window === 'undefined') {
        return 'de';
    }
    if (localStorage.getItem('lang')) {
        return localStorage.getItem('lang');
    }
    if (window.navigator.language.includes('de')) {
        return 'de';
    }

    return 'en';
}
