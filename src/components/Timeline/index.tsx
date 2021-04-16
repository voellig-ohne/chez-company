import React from "react";
import { useProjects } from "../../hooks/useProjects";

export function Timeline() {
  const projects = useProjects();
  console.log(projects);

  return (
    <div>
      {projects.map(({ node: project }) => (
        <article key={project.id}>{project.title}</article>
      ))}
    </div>
  );
}
