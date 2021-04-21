import { graphql } from "gatsby";
import React from "react";
import { Page } from "../Page";
import { Project } from "../Project";

// type ProjectPageProps = { data: any };

export default function ProjectPage({ data: { contentfulProjekt: project } }) {
  console.log(project);
  // return <>{project.title}</>
  return <Page><Project {...project} /></Page>;
}

export const pageQuery = graphql`
  query StaticPageBySlug($id: String!) {
    contentfulProjekt(id: { eq: $id }) {
      title
      id
      year
      description {
        raw
      }
      tags {
        id
        title
        image {
          id
          gatsbyImageData(layout: FIXED, width: 100)
        }
      }
      fragments {
        ... on Node {
          ... on ContentfulFragmentTextBild {
            id
            title
          }
          ... on ContentfulFragmentVideo {
            id
            title
          }
        }
      }
    }
  }
`;
