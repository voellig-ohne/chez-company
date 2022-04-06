import React from 'react';
import { FragmentItem } from '../Project';
import * as s from './style.module.css';

export function FragmentItemInline(fragment) {
    return (
        <div class={s.container}>
            <FragmentItem {...fragment}></FragmentItem>
        </div>
    );
}
