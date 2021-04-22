import { graphql } from "gatsby";
import React from "react";
import { Fragment } from "../Fragment";
import { Page } from "../Page";

export default function FragmentPage({ data: { contentfulFragmentTextBild: fragment } }) {
  return <Page><Fragment {...fragment} /></Page>;
}

export const pageQuery = graphql`
  query FragmentById($id: String!) {
    contentfulFragmentTextBild(id: { eq: $id }) {
      title
      id
      description {
          raw
      }
      image {
        gatsbyImageData(width: 800)
      }
    }
  }
`;
