/* eslint-disable import/prefer-default-export */
export const createNote = `
mutation MyMutation {
  createNotes(input: {creator: $creator, note: $note, taged: $taged, vendor_id: $vendor_id}) {
    id
    note
  }
}
`;

export const createVendor = `
  mutation CreateVendor($compliance: AWSJSON, $name: String, $status: String!, $service: String,$finance: AWSJSON, $use_cases:[AWSJSON] ) {
    createVendors(input: {compliance: $compliance, finance: $finance, name: $name, status:$status, service: $service, use_cases: $use_cases}) {
      id
    }
  }
`;
