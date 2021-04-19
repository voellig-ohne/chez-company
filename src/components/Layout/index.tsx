import React from "react";
import * as s from "./style.module.css";
import "./style.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return <main className={s.main}>{children}</main>;
}
