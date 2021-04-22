import { ForceGraph2D } from "react-force-graph";
import React, { useEffect, useRef, useState } from "react";
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
  const [hasCenteredOnce, setHasCenteredOnce] = useState(false);
  const [isHovering, setIsHovering] = useState(0);
  const [isHoveringTag, setIsHoveringTag] = useState(false);
  const [graphData] = useState(() => formatGraphData(projects));
  const graphRef = useRef();

  const getDisplaySize = () => ({height: window.innerHeight, width: window.innerWidth})
  const [displaySize, setDisplaySize] = useState(getDisplaySize());

  useEffect(() => {
    const handleResize = () => {
      setDisplaySize(getDisplaySize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div
      style={{
        cursor: !!isHovering ? (isHoveringTag ? "grab" : "pointer") : "default",
      }}
    >
      <ForceGraph2D
        {...displaySize}
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          if (node.imageEl) {
            const width = 30;
            const height = width / node.ratio;
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

            ctx.fillStyle = !!node.__hovered ? "#f8927d" : styles.background;
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
          if (node.type === "project") {
            navigate(`/projekt/${stringToSslug(node.slug)}/`);
          }
          if (node.type === "fragment") {
            navigate(`/fragment/${stringToSslug(node.slug)}/`);
          }
        }}
        cooldownTime={3000}
        onEngineStop={() => {
          if (!hasCenteredOnce) {
            setHasCenteredOnce(true);
            graphRef.current.zoomToFit(2000, 50);
          }
        }}
        onNodeHover={(node, prevNode, ctx) => {
          if (node) {
            node.__hovered = true;
            setIsHovering((hovering) => hovering + +1);
            if (node.type === "tag") {
              setIsHoveringTag(true);
            }
          }
          if (prevNode) {
            prevNode.__hovered = false;
            setIsHovering((hovering) => hovering + -1);
            if (prevNode.type === "tag") {
              setIsHoveringTag(false);
            }
          }
        }}
        autoPauseRedraw={false}
      />
    </div>
  );
}

function formatGraphData(projects) {
  const graphData = { links: [], nodes: [] };

  projects.forEach(({ node }) => {
    const projectNode = node;
    projectNode.type = "project";
    graphData.nodes.push(projectNode);

    node.fragments?.forEach((fragment) => {
      const fragmentNode = fragment;
      fragmentNode.type = "fragment";

      graphData.nodes.push(fragmentNode);
      graphData.links.push({
        source: projectNode.id,
        target: fragmentNode.id,
      });
    });

    node.tags?.forEach((tag) => {
      const tagNode = tag;
      tagNode.type = "tag";
      const image = tagNode?.image?.resize?.src;

      if (image) {
        tagNode.imageEl = new Image();
        tagNode.ratio = tagNode?.image?.resize?.aspectRatio;

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

  return graphData;
}
