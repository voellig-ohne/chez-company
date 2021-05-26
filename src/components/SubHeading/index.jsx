import React from 'react';
import * as s from './style.module.css';

export function SubHeading({ children }) {
    return <h2 className={s.heading}>{children}</h2>;
}
