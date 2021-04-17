import React from "react";
import { useProjects } from "../../hooks/useProjects";
import { Project } from "../Project";

export function Timeline() {
  const projects = useProjects();

  return (
    <div>
      {projects.map(({ node: project }) => (
        <Project
          key={project.id}
          title={project.title}
          description={project.description?.raw}
        />
      ))}
    </div>
  );
}
