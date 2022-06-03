import * as s from './style.module.css';
import React, { useState } from 'react';
import ContentfulRichtTextToHtml from '../../ContentfulRichtTextToHtml';
import clsx from 'clsx';

const languages = ['de', 'en'];

export function DuoLangDescription({ de, en }) {
    const [lang, setLang] = useState('de');
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
                            setLang(buttonLang);
                        }}
                    >
                        {buttonLang}
                    </button>
                ))}
            </div>
            {lang === 'de' ? (
                <ContentfulRichtTextToHtml source={de} />
            ) : (
                <ContentfulRichtTextToHtml source={en} />
            )}
        </>
    );
}
