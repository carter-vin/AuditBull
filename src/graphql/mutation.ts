/* eslint-disable import/prefer-default-export */
export const createNote = `
mutation MyMutation {
  createNotes(input: {creator: $creator, note: $note, taged: $taged, vendor_id: $vendor_id}) {
    id
    note
  }
}
`;
