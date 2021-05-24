import * as s from './style.module.css';
import React from 'react';

export function MetaDataInline({ what, who }) {
    return (
        <div className={s.container}>
            <div className={s.what}>{what}:</div>
            <div className={s.who}>{who?.who}</div>
        </div>
    );
}
