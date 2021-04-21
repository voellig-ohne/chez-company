import contentfulRichtTextToThml from "../contentfulRichTextToHtml";
import * as s from "./style.module.css";
import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

type ProjectProps = {
  title?: string;
  description?: { raw: string };
  tags?: readonly GatsbyTypes.Maybe<{
    id?: string;
    title?: string;
    image?: {
      gatsbyImageData?: IGatsbyImageData;
    };
  }>[];
};

export function Project({ title, description, tags }: ProjectProps) {
  return (
    <article className={s.project}>
      <h1>{title}</h1>
      <div className={s.tags}>
        {tags?.map((tag) => {
          if (!tag?.image?.gatsbyImageData) return null;
          return (
            <GatsbyImage
              key={tag.id}
              alt={tag.title || ""}
              image={tag?.image?.gatsbyImageData}
            />
          );
        })}
      </div>
      <div>{contentfulRichtTextToThml(description?.raw)}</div>
    </article>
  );
}
