import React from 'react';
import * as s from './style.module.css';

export function YoutubeEmbed({ youtubeUrl }: { youtubeUrl?: string }) {
    const youtubeUrlNoCookie = getYoutubeUrlNoCookie(youtubeUrl);

    return (
        <div className={s.container}>
            <iframe
                className={s.iFrame}
                width="560"
                height="315"
                src={youtubeUrlNoCookie}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

function getYoutubeUrlNoCookie(str?: string) {
    if (!str) {
        return undefined;
    }
    const ID = youtubeParser(str);
    if (!ID) {
        return undefined;
    }
    return `https://www.youtube-nocookie.com/embed/${ID}`;
}

function youtubeParser(url: string) {
    var regExp = /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i;
    var match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : false;
}
