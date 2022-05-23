import { Box } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';

export type MentionInputDataType = {
    id: string;
    display: string;
};
interface MentionTextAreaProps {
    note: string;
    taggedUser: string[] | number[];
    data: MentionInputDataType[];
    setNote: (obj: string) => void;
    setTaggeduser: (obj: any) => void;
}

// const totalChars = 140;

const MentionTextArea = (props: MentionTextAreaProps) => {
    const { note, setNote, data, taggedUser, setTaggeduser } = props;
    const handleNoteChange = (value: string) => {
        setNote(value);
    };
    return (
        <Box>
            <MentionsInput
                style={{
                    control: {
                        backgroundColor: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: 'black',
                    },

                    '&multiLine': {
                        control: {
                            fontFamily: 'monospace',
                            minHeight: 63,
                        },
                        highlighter: {
                            padding: 9,
                            border: '1px solid transparent',
                        },
                        input: {
                            padding: 9,
                            border: '1px solid silver',
                        },
                    },

                    '&singleLine': {
                        display: 'inline-block',
                        width: 180,

                        highlighter: {
                            padding: 1,
                            border: '2px inset transparent',
                        },
                        input: {
                            padding: 1,
                            border: '2px inset',
                        },
                    },

                    suggestions: {
                        list: {
                            backgroundColor: 'white',
                            border: '1px solid rgba(0,0,0,0.15)',
                            fontSize: 14,
                            color: 'black',
                        },
                        item: {
                            padding: '5px 15px',
                            borderBottom: '1px solid rgba(0,0,0,0.15)',
                            '&focused': {
                                backgroundColor: '#cee4e5',
                            },
                        },
                    },
                }}
                value={note}
                onChange={(e) => handleNoteChange(e.target.value)}
                allowSuggestionsAboveCursor
            >
                <Mention
                    data={data}
                    trigger="@"
                    displayTransform={(id, display) => {
                        return `@${display}`;
                    }}
                    onAdd={(id) => {
                        setTaggeduser([...taggedUser, id]);
                    }}
                    markup="{{__display__}}"
                />
            </MentionsInput>
            {/* <Typography color="gray" textAlign="right">
                {charLeft(note) > 0
                    ? `${charLeft(note)} characters left`
                    : '0 characters left'}
            </Typography> */}
        </Box>
    );
};

export default MentionTextArea;
