import { ForceGraph2D } from 'react-force-graph';
import React, { useEffect, useRef, useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { some, sortBy } from 'lodash';
import { navigate } from 'gatsby';
import { getRandomTagColors, getRatio, getRoute } from '../util';
import { prefetchPathname } from 'gatsby';

const graphStyles = {
    project: {
        color: '#ffff3b',
        background: '#fec4fc',
        fontSize: 5,
        order: 1,
    },
    fragment: {
        color: '#f81955',
        background: '#2c99e4',
        fontSize: 3,
        order: 2,
    },
    tag: {
        color: '#ffff3b',
        background: '#fec4fc',
        fontSize: 7,
        order: 3,
    },
};

const borderWidth = 0.5;
const shadowDistance = 1;

export function ProjectGraph({ projectFocusId, path }) {
    const projects = useProjects();
    const [hasCenteredOnce, setHasCenteredOnce] = useState(false);
    const [isHovering, setIsHovering] = useState(0);
    const [isHoveringTag, setIsHoveringTag] = useState(false);
    const [graphData] = useState(() => formatGraphData(projects));
    const graphRef = useRef();

    const getDisplaySize = () => ({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth,
    });
    const [displaySize, setDisplaySize] = useState(getDisplaySize());

    useEffect(() => {
        const handleResize = () => {
            setDisplaySize(getDisplaySize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // zooming around on pageload or when a project is selected
    useEffect(() => {
        let nodeIdToFocus;

        nodeIdToFocus = graphData.nodes.find(
            node => node.slug && getRoute(node) === path
        )?.id;

        if (!nodeIdToFocus && !hasCenteredOnce) {
            nodeIdToFocus = projectFocusId;
        }

        if (nodeIdToFocus) {
            setTimeout(
                () => {
                    graphRef.current.zoomToFit(2000, 50, node => {
                        return shouldBeInViewById(
                            nodeIdToFocus,
                            node,
                            graphData
                        );
                    });
                },
                hasCenteredOnce ? 0 : 4000
            );
            setHasCenteredOnce(true);
        }

        // dont actually want to run when hasCenteredOnce is updated
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, graphData]);

    return (
        <div
            style={{
                cursor: !!isHovering
                    ? isHoveringTag
                        ? 'grab'
                        : 'pointer'
                    : 'move',
            }}
        >
            {typeof window === 'undefined' ? (
                <div></div>
            ) : (
                <ForceGraph2D
                    {...displaySize}
                    graphData={graphData}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        if (node.tagImageEl) {
                            // TAG WITH AN IMAGE
                            drawImageTag(node, ctx);
                        } else if (node?.text?.text) {
                            // TAGS THAT ARE TEXT
                            drawTextTag(node, ctx);
                        } else if (node.fragmentImageEls) {
                            // THESE ARE MULTIPLE IMAGES, FRAGMENTS
                            drawImageFragment(node, ctx);
                        } else {
                            // PROJECTS & FRAGMENTS THAT DO NOT HAVE IMAGES
                            drawText(node, ctx);
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
                        return '#ffff3b';
                    }}
                    ref={graphRef}
                    linkWidth={2}
                    onNodeClick={(node, event) => {
                        if (
                            node.type === 'project' ||
                            node.type === 'fragment'
                        ) {
                            navigate(getRoute(node));
                        }
                    }}
                    cooldownTime={5000}
                    onNodeHover={(node, prevNode, ctx) => {
                        if (node) {
                            node.__hovered = true;
                            setIsHovering(hovering => hovering + +1);
                            if (node.type === 'tag') {
                                setIsHoveringTag(true);
                            }
                        }
                        if (prevNode) {
                            prevNode.__hovered = false;
                            setIsHovering(hovering => hovering + -1);
                            if (prevNode.type === 'tag') {
                                setIsHoveringTag(false);
                            }
                        }
                        if (
                            node?.type === 'project' ||
                            node?.type === 'fragment'
                        ) {
                            prefetchPathname(getRoute(node));
                        }
                    }}
                />
            )}
        </div>
    );
}

function shouldBeInViewById(nodeIdToFocus, currentNode, graphData) {
    return (
        currentNode.id === nodeIdToFocus ||
        some(graphData.links, {
            source: { id: nodeIdToFocus },
            target: { id: currentNode.id },
        }) ||
        some(graphData.links, {
            source: { id: currentNode.id },
            target: { id: nodeIdToFocus },
        })
    );
}

function drawImageTag(node, ctx) {
    const area = 1200;
    const width = Math.sqrt(area * node.ratio);
    const height = Math.sqrt(area * (1 / node.ratio));
    node.__bckgDimensions = [width, height];

    ctx.drawImage(
        node.tagImageEl,
        node.x - width / 2,
        node.y - height / 2,
        width,
        height
    );
}

function drawImageFragment(node, ctx) {
    const styles = graphStyles[node.type];
    node.fragmentImageEls.forEach((image, index) => {
        const area = 400;
        const width = Math.sqrt(area * image.ratio);
        const height = Math.sqrt(area * (1 / image.ratio));
        let x = node.x - width / 2;
        let y = node.y - height / 2;

        if (!!node.__hovered && index !== node.fragmentImageEls.length - 1) {
            x += image.hoverX;
            y += image.hoverY;
        }

        node.__bckgDimensions = [width + 10, height + 10];

        ctx.translate(x + width * 0.5, y + height * 0.5);
        ctx.rotate(image.rotation);

        // BORDER
        ctx.fillStyle = styles.color;
        ctx.fillRect(
            width * -0.5 - borderWidth / 2,
            height * -0.5 - borderWidth / 2,
            width + borderWidth,
            height + borderWidth
        );

        // IMAGE
        ctx.drawImage(image.el, width * -0.5, height * -0.5, width, height);

        // UNDO TRANSLATIONS
        ctx.rotate(-image.rotation);
        ctx.translate(-(x + width * 0.5), -(y + height * 0.5));
    });
}

function drawText(node, ctx) {
    const shadowDistanceHovered = !!node.__hovered
        ? shadowDistance * 2
        : shadowDistance;

    const styles = graphStyles[node.type];

    const label = node.title;
    const fontSize = styles.fontSize;
    ctx.font = `${fontSize}px PT Mono`;

    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

    ctx.fillStyle = styles.color;

    // border
    ctx.fillRect(
        node.x - borderWidth / 2 - bckgDimensions[0] / 2,
        node.y - borderWidth / 2 - bckgDimensions[1] / 2,
        ...bckgDimensions.map(d => d + borderWidth)
    );

    // shadow
    ctx.fillRect(
        node.x + shadowDistanceHovered - bckgDimensions[0] / 2,
        node.y + shadowDistanceHovered - bckgDimensions[1] / 2,
        ...bckgDimensions
    );

    // background
    ctx.fillStyle = !!node.__hovered ? '#f8927d' : styles.background;

    ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
    );

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = styles.color;
    ctx.fillText(label, node.x, node.y);

    node.__bckgDimensions = bckgDimensions;
}

function drawTextTag(node, ctx) {
    const styles = graphStyles[node.type];

    const lines = node.text.text.split('\n');

    // BIGGER FONT-SIZE FOR TAGS WITH FEWER LINES
    const fontSize = styles.fontSize / 2 + styles.fontSize / lines.length;

    const lineHeight = fontSize - 0;
    ctx.font = `${fontSize}px Bernard`;

    const width = Math.max(...lines.map(line => ctx.measureText(line).width));

    const bckgDimensions = [width, lineHeight * lines.length];

    lines.forEach((line, index) => {
        ctx.fillStyle = styles.color;
        const posY = node.y + lineHeight * index - bckgDimensions[1] / 2;

        // background
        ctx.fillStyle = node.tagColors[0];
        ctx.fillRect(
            node.x - ctx.measureText(line).width / 2,
            posY - lineHeight / 2,
            ctx.measureText(line).width,
            lineHeight
        );

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.tagColors[1];
        ctx.fillText(line, node.x, posY);
    });

    node.__bckgDimensions = bckgDimensions;
}

function formatGraphData(projects) {
    const graphData = { links: [], nodes: [] };

    if (typeof window === 'undefined') return graphData;

    projects.forEach(({ node }) => {
        const projectNode = node;

        if (projectNode.hideInGraph) {
            return;
        }

        projectNode.type = 'project';
        graphData.nodes.push(projectNode);

        node.fragments?.forEach(fragment => {
            const fragmentNode = fragment;
            fragmentNode.type = 'fragment';

            graphData.links.push({
                source: projectNode.id,
                target: fragmentNode.id,
            });

            if (!graphData.nodes.find(node => node.id === fragmentNode.id)) {
                if (fragmentNode.images) {
                    fragmentNode.fragmentImageEls = fragmentNode.images.map(
                        image => {
                            const el = new Image();
                            el.src = image.resize.src;

                            return {
                                el,
                                ratio: getRatio(image.resize),
                                rotation: Math.random() * 0.4 - 0.2,
                                hoverX: Math.random() * 40 - 20,
                                hoverY: Math.random() * 40 - 20,
                            };
                        }
                    );
                    fragmentNode.fragmentImageEls.reverse();
                }
                graphData.nodes.push(fragmentNode);
            }
        });

        node.tags?.forEach(tag => {
            const tagNode = tag;
            tagNode.type = 'tag';
            const image = tagNode?.image?.resize?.src;
            const text = tagNode?.text?.text;

            graphData.links.push({
                source: projectNode.id,
                target: tagNode.id,
            });

            if (!graphData.nodes.find(node => node.id === tag.id)) {
                if (image) {
                    tagNode.tagImageEl = new Image();
                    tagNode.ratio = getRatio(tagNode?.image?.resize);

                    tagNode.tagImageEl.src = image;
                }

                if (text) {
                    tagNode.tagColors = getRandomTagColors(tagNode.title);
                }

                graphData.nodes.push(tagNode);
            }
        });
    });

    // ORDER TO HAVE PROJECTS ON TOP
    graphData.nodes = sortBy(
        graphData.nodes,
        node => -graphStyles[node.type].order
    );

    return graphData;
}
