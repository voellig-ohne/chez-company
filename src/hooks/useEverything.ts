import { useStaticQuery, graphql } from "gatsby";

export const useEverything = () => {
  const everything = useStaticQuery<GatsbyTypes.EverythingQuery>(
    graphql`
      query Everything {
        allContentfulProjekt {
          edges {
            node {
              id
              year
              title
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
                id
                title
              }
            }
          }
        }
      }
    `
  );

  return everything;
};
