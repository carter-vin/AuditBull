/* eslint-disable import/prefer-default-export */
export const listVendors = `
query MyQuery {
  listVendors {
    items {
      id
      name
      service
      status
      finance
      compliance
      use_cases
      createdAt
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
