import React from "react";
import { ForceGraph2D } from "react-force-graph";
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
          tags={project.tags}
        />
      ))}
    </div>
  );
}
