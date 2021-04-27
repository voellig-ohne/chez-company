import React from "react";
import * as s from "./style.module.css";
import "./style.css";
import { ProjectGraph } from "../ProjectGraph";

export default function Layout({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return (
    <>
      <div className={s.graph}>
        {typeof window !== "undefined" && <ProjectGraph />}
      </div>
      {path !== "/" && children}
    </>
  );
}
