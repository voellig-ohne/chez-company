import { Link } from "gatsby";
import React from "react";
// import * as s from "./style.module.css";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Link to="/">Zurück</Link>
      </div>
      {children}
    </>
  );
}
