import contentfulRichtTextToThml from "../contentfulRichTextToHtml";
import * as s from "./style.module.css";
import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

type ProjectProps = {
  title?: string;
  description?: string;
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
      <div>{contentfulRichtTextToThml(description)}</div>
      {tags?.map((tag) => (
        <>
          {tag?.image?.gatsbyImageData && (
            <GatsbyImage
              key={tag.id}
              alt="foo"
              image={tag?.image?.gatsbyImageData}
            />
          )}
        </>
      ))}
    </article>
  );
}
