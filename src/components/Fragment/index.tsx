import contentfulRichtTextToThml from "../contentfulRichTextToHtml";
import * as s from "./style.module.css";
import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

type ProjectProps = {
  title?: string;
  description?: { raw: string };
  image?: { gatsbyImageData: IGatsbyImageData };
};

export function Fragment({ title, description, image }: ProjectProps) {
  console.log(image);
  return (
    <article className={s.project}>
      <h1>{title}</h1>
      {image && <GatsbyImage alt={""} image={image.gatsbyImageData} />}
      <div>{contentfulRichtTextToThml(description?.raw)}</div>
    </article>
  );
}
