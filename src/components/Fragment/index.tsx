import contentfulRichtTextToThml from "../contentfulRichTextToHtml";
import * as s from "./style.module.css";
import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { YoutubeEmbed } from "../YoutubeEmbed";

type ProjectProps = {
  title?: string;
  description?: { raw: string };
  image?: { gatsbyImageData: IGatsbyImageData };
  youtubeId?: string;
};

export function Fragment({
  title,
  description,
  image,
  youtubeId,
}: ProjectProps) {
  return (
    <article className={s.project}>
      <h1>{title}</h1>
      {youtubeId && <YoutubeEmbed youtubeUrl={youtubeId} />}
      {image && <GatsbyImage alt={""} image={image.gatsbyImageData} />}
      <div>{contentfulRichtTextToThml(description?.raw)}</div>
    </article>
  );
}
