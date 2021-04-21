import { ForceGraph2D } from "react-force-graph";
import React, { useCallback, useEffect, useRef } from "react";
import { useProjects } from "../../hooks/useProjects";
import { sortBy } from "lodash";
import { navigate } from "gatsby-link";
import { stringToSslug } from "../util";

const graphStyles = {
  project: {
    color: "#ffff3b",
    background: "#fec4fc",
    fontSize: 30,
    order: 1,
  },
  fragment: {
    color: "#f81955",
    background: "#2c99e4",
    fontSize: 15,
    order: 3,
  },
  tag: {
    color: "#ffff3b",
    background: "#fec4fc",
    fontSize: 15,
    order: 2,
  },
};

export function ProjectGraph() {
  const projects = useProjects();

  const graphRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      graphRef.current.zoomToFit(1000, 50);
    }, 1500);
  }, [graphRef])

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
      if (!graphData.nodes.find((node) => node.id === tag.id)) {
        graphData.nodes.push(tagNode);
      }
    });
  });

  graphData.nodes = sortBy(
    graphData.nodes,
    (node) => -graphStyles[node.type].order
  );

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
          );

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
      onNodeClick={(node) => {
        if(node.type === 'project') {
          navigate(`/projekt/${stringToSslug(node.slug)}/`)
        }
        console.log("node", node);
      }}
    />
  );
}
