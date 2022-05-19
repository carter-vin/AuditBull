/* eslint-disable import/prefer-default-export */
export const listVendors = `
query MyQuery {
  listVendors {
    items {
      name
      id
      email
      compliance
      owner
      status
      Notes {
        items {
          note
          taged
          id
          creator
          createdAt
        }
      }
    }
  }
}
`;
