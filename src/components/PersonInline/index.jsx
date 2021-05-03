import * as s from './style.module.css';
import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export function PersonInline({ slug, name, profession, image }) {
    console.log(image);
    return (
        <Link to={`/person/${slug}`} className={s.person}>
            <GatsbyImage image={image.gatsbyImageData} />
            <div>
                {profession && (
                    <div className={s.superTitle}>
                        <span>{profession}</span>
                    </div>
                )}
                <h2 className={s.title}>
                    <span>{name}</span>
                </h2>
            </div>
        </Link>
    );
}
