/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react';
import {
    Stack,
    Typography,
    Button,
    IconButton,
    Box,
    Divider,
} from '@mui/material';
import { filter, map, orderBy, split } from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import AddIcon from '@mui/icons-material/Add';

import MentionTextArea from 'components/MentionTextArea';
import { useAppData } from 'hooks/useAppData';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'react-toastify';

interface VendorExtraNotesProps {
    selectedVendor: any;
    refetch: () => void;
}
const VendorExtraNotes = (props: VendorExtraNotesProps) => {
    const { selectedVendor, refetch } = props;
    const { loginUser } = useAuth();
    const [noteList, setNoteList] = useState<string[]>([]);
    const [note, setNote] = useState<string>('');
    const [taggedUser, setTaggeduser] = useState([]);
    const [showNoteForm, setShowNoteForm] = useState<boolean>(false);

    const {
        userReducer: { getListOfUsers, users, userLoading },
    } = useAppData();

    const handleShowNoteForm = () => {
        setShowNoteForm(!showNoteForm);
    };

    const submitNote = async () => {
        setNoteList([...noteList, note.replace('{{', '').replace('}}', '')]);
        const payload = {
            creator: loginUser?.username,
            note: note.replace('{{', '').replace('}}', ''),
            taged: taggedUser,
            vendor_id: selectedVendor.id,
        };
        const mutationQuery = `mutation MyMutation {
                    createNotes(input: {vendorsID: "${payload.vendor_id}", taged: "${payload.taged}", note: "${payload.note}", creator: "${payload.creator}"}) {
                        note
                        id
                        taged
                        creator
                        vendorsID
                    }
                }`;
        const res: any = await API.graphql(graphqlOperation(mutationQuery));
        if (res && res.data) {
            refetch();
            toast.success('Note added successfully');
        } else {
            toast.error(res.error.message || 'Error adding note');
        }
        setNote('');
        handleShowNoteForm();
    };

    useEffect(() => {
        getListOfUsers();
    }, []);

    if (userLoading) {
        return <p className="min-h-[50vh]">loading ...</p>;
    }

    return (
        <Stack direction="column" spacing={1}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography>Notes</Typography>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleShowNoteForm}
                >
                    <AddIcon />
                </IconButton>
            </Stack>
            <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
                {orderBy(
                    filter(selectedVendor?.Notes?.items, (vendorNotes) => {
                        return (
                            vendorNotes.taged.includes(loginUser.username) ||
                            vendorNotes.creator === loginUser.username
                        );
                    }) || [],
                    ['createdAt'],
                    ['desc']
                ).map((item: any, index: number) => (
                    <div key={item.id} className="flex flex-col gap-2">
                        <Typography>Note By: {item.creator}</Typography>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.note,
                            }}
                            key={index}
                            className="bg-gray-400 p-2"
                        />
                        <Box className="flex flex-column w-full bg-primary">
                            <Typography>Tagged:</Typography>
                            {item?.taged.map((tag: string) => {
                                return <Typography key={tag}>{tag}</Typography>;
                            })}
                        </Box>
                        <Divider />
                    </div>
                ))}
            </div>

            {showNoteForm && (
                <>
                    <MentionTextArea
                        note={note}
                        taggedUser={taggedUser}
                        data={map(users, (user) => {
                            return {
                                id: user?.email || '',
                                display: user?.name || user?.email || '',
                            };
                        })}
                        setNote={setNote}
                        setTaggeduser={setTaggeduser}
                    />

                    <Button variant="contained" onClick={() => submitNote()}>
                        Save
                    </Button>
                </>
            )}
        </Stack>
    );
};

export default VendorExtraNotes;
