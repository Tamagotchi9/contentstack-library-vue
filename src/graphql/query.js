import gql from "graphql-tag";

const ALL_BOOKS = gql`
  query ALL_BOOKPAGE($limit: Int!, $skip: Int!) {
    all_bookpage (limit: $limit, skip: $skip) {
      total
      items {
        system {
          uid
        }
        title
        cover_imageConnection {
          edges {
            node {
              url(transform: {height: "150", width: "100"})
              title
            }
          }
        }
      }
    }
  }
`;

const HOMEPAGE = gql`
  query HOMEPAGE {
    all_homepage {
      items {
        title
        hero_imageConnection {
          edges {
            node {
              url
            }
          }
        }
      }
    }}
`;

export {
  ALL_BOOKS,
  HOMEPAGE
}