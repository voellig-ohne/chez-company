import clsx from "clsx";
import { Link } from "gatsby";
import React from "react";
import * as s from "./style.module.css";

export function Page({
  children,
  color = "white",
  title,
}: {
  children: React.ReactNode;
  color?: "pink" | "blue" | "white";
  title?: React.ReactNode;
}) {
  return (
    <>
      <article className={clsx(s.main, s[color])}>
        <Link
          className={s.backButton}
          to="/"
          aria-label="zurück"
          title="zurück"
        ></Link>
        {title && <h1 className={s.heading}>{title}</h1>}
        {children}
      </article>
    </>
  );
}
