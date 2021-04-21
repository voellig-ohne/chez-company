import { ForceGraph2D } from "react-force-graph";
import React, { useCallback } from "react";
import { useProjects } from "../../hooks/useProjects";

const graphStyles = {
  project: {
    color: "#ffff3b",
    background: "#fec4fc",
    fontSize: 20,
  },
  fragment: {
    color: "#f81955",
    background: "#2c99e4",
    fontSize: 15,
  },
  tag: {
    color: "#ffff3b",
    background: "#fec4fc",
    fontSize: 15,
  },
};

export function ProjectGraph() {
  const projects = useProjects();

  const graphRef = useCallback((node) => {
    if (node) {
      setTimeout(() => {
        node.zoomToFit(1000, 50);
      }, 1500);
    }
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  const graphData = { links: [], nodes: [] };

  projects.forEach(({ node }) => {
    const projectNode = node;
    projectNode.type = "project";
    graphData.nodes.push(projectNode);

    node.fragments?.forEach((fragment) => {
      const fragmentNode = fragment;
      fragmentNode.type = "fragment";

      graphData.nodes.push(fragmentNode);
      graphData.links.push({ source: projectNode.id, target: fragmentNode.id });
    });

    node.tags?.forEach((tag) => {
      const tagNode = tag;
      tagNode.type = "tag";
      const image = tagNode?.image?.gatsbyImageData?.images?.fallback?.src;

      if (image) {
        tagNode.imageEl = new Image();
        tagNode.ratio =
          tagNode?.image?.gatsbyImageData.height /
          tagNode?.image?.gatsbyImageData.width;

        tagNode.imageEl.src = image;
      }

      graphData.links.push({ source: projectNode.id, target: tagNode.id });
      if (!graphData.nodes.find((foo) => foo.id === tag.id)) {
        graphData.nodes.push(tagNode);
      }
    });
  });

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (node.imageEl) {
          const width = 30;
          const height = width * node.ratio;
          node.__bckgDimensions = [width, height];
          ctx.drawImage(
            node.imageEl,
            node.x - width / 2,
            node.y - height / 2,
            width,
            height
          );
        } else {
          const styles = graphStyles[node.type];

          const label = node.title;
          const fontSize = styles.fontSize / globalScale;
          ctx.font = `${fontSize}px PT Mono`;

          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.4
          ); // some padding

          ctx.fillStyle = styles.background;
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = styles.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }
      }}
      // warmUpTicks={100}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions &&
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );
      }}
      linkColor={() => {
        return "#ffff3b";
      }}
      ref={graphRef}
      linkWidth={2}
    />
  );
}
