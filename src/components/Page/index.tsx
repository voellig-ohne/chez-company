import clsx from "clsx";
import { Link, navigate } from "gatsby";
import React, { useCallback, useEffect, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      navigate("/");
    }
  }, []);

  const handleWindowClick = useCallback((event: MouseEvent) => {
    const clickInside =
      event.target instanceof Node && ref.current?.contains(event.target);
    if (!clickInside) {
      // TODO: FIX THIS, DIRTY HACK NEEDS TO BE DONE PROPERLY!!
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleWindowClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleWindowClick);
    };
  }, [handleKeyDown, handleWindowClick]);

  return (
    <>
      <article className={clsx(s.main, s[color])} ref={ref}>
        <Link
          className={s.backButton}
          to="/"
          aria-label="zurück"
          title="zurück"
        ></Link>
        {title && (
          <h1 className={s.heading}>
            <span className={s.headingInner}>{title}</span>
          </h1>
        )}
        {children}
      </article>
    </>
  );
}
