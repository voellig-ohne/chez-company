import contentfulRichtTextToThml from "../contentfulRichTextToHtml";
import * as s from "./style.module.css";
import React from "react";

type ProjectProps = {
  title?: string;
  description?: string;
};

export function Project({ title, description }: ProjectProps) {
  return (
    <article className={s.project}>
      <h1>{title}</h1>
      <div>{contentfulRichtTextToThml(description)}</div>
    </article>
  );
}
