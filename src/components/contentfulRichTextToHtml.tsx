import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from 'react';

export default function contentfulRichtTextToThml(source?: string) {
    if (!source) return null;
    const parsed = JSON.parse(source);

    const options = {
        renderText: (text: string) =>
            text
                .split('\n')
                .flatMap((text, i) => [i > 0 && <br key={i} />, text]),
    };

    return documentToReactComponents(parsed, options);
}
