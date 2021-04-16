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
              description {
                raw
              }
            }
          }
        }
      }
    `
  );

  return edges;
};
