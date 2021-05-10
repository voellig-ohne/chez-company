import React, { useEffect, useState } from 'react';
import * as s from './style.module.css';

const regExpYoutube = /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i;
const regExpVimeo = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;

export function IFrameEmbed({
    youtubeUrl,
    aspectRatio,
}: {
    youtubeUrl?: string;
    aspectRatio?: number;
}) {
    const youtubeUrlNoCookie = getUrl(youtubeUrl);
    const containerStyle = aspectRatio
        ? {
              paddingBottom: `${(1 / aspectRatio) * 100}%`,
          }
        : undefined;

    return (
        <div className={s.container} style={containerStyle}>
            <iframe
                className={s.iFrame}
                width="560"
                height="315"
                src={youtubeUrlNoCookie}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export function VideoPreview({ youtubeUrl }: { youtubeUrl?: string }) {
    const { id } = urlParser(youtubeUrl);
    const images = useImagesForAnimation(youtubeUrl);
    if (!youtubeUrl || !id) return null;

    return (
        <div className={s.preview}>
            <div className={s.previewInner}>
                {images.map((url, index) => (
                    <img
                        className={s.previewImage}
                        key={index}
                        alt=""
                        src={url}
                    />
                ))}
            </div>
        </div>
    );
}

export function useImagesForAnimation(url?: string) {
    const [images, setImages] = useState<string[]>([]);
    const { type, id } = urlParser(url);

    useEffect(() => {
        if (type === 'vimeo') {
            fetch(`https://vimeo.com/api/v2/video/${id}.json`)
                .then(response => response.json())
                .then(data => {
                    setImages([0, 1, 2].map(() => data[0].thumbnail_medium));
                });
        }

        if (type === 'youtube') {
            setImages(
                [0, 1, 2, 3].map(
                    index => `https://img.youtube.com/vi/${id}/${index}.jpg`
                )
            );
        }
    }, [setImages, id, type]);

    return images;
}

function getUrl(str?: string) {
    if (!str) {
        return undefined;
    }

    const { type, id } = urlParser(str);

    if (type === 'youtube') {
        return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (type === 'vimeo') {
        return `https://player.vimeo.com/video/${id}`;
    }

    return str;
}

function urlParser(url?: string) {
    if (!url) return { type: undefined, id: undefined };

    const matchYoutube = url.match(regExpYoutube);
    const matchVimeo = url.match(regExpVimeo);

    if (matchYoutube && matchYoutube[1].length === 11) {
        return { type: 'youtube', id: matchYoutube[1] };
    }

    if (matchVimeo) {
        return { type: 'vimeo', id: matchVimeo[1] };
    }

    return { type: undefined, id: undefined };
}
