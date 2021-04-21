import { useStaticQuery, graphql } from "gatsby";

export const useProjects = () => {
  const {
    allContentfulProjekt: { edges },
  } = useStaticQuery<GatsbyTypes.ProjectsQuery>(
    graphql`
      query Projects {
        allContentfulProjekt {
          edges {
            node {
              id
              year
              title
              slug
              description {
                raw
              }
              tags {
                id
                title
                image {
                  id
                  gatsbyImageData
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
        }
      }
    `
  );

  return edges;
};
