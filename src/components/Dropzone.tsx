/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, IconButton, InputLabel, Typography } from '@mui/material';
import { concat } from 'lodash';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { ReactElement } from 'react';

interface DropzoneProps {
    max: number;
    files: any;
    setFiles: any;
    label: string;
    onDelete?: any;
    progressBar?: ReactElement | null;
}
const Dropzone = (props: DropzoneProps) => {
    const { max, files, setFiles, label, onDelete, progressBar } = props;
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(
                concat(
                    files,
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                )
            );
        },
        maxFiles: max || 1,
    });

    const onDeleteHandler = (index: number, file: any) => {
        const filtred = files.filter(
            (value: any, i: number) => file !== value && i !== index
        );
        onDelete(file);
        setFiles(filtred || []);
    };

    const getFilePreview = (file: any, index: number) => {
        switch (file.type) {
            case 'application/pdf':
                return (
                    <Box
                        key={index}
                        className="relative w-full flex items-center justify-between"
                    >
                        <Typography>
                            {file.path} - {file.size} bytes
                        </Typography>
                        <IconButton
                            onClick={() => onDeleteHandler(index, file)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                );
            default:
                return (
                    <Box
                        key={index}
                        className="relative w-full flex items-center justify-between"
                    >
                        <Box className="h-[16vh] flex justify-start">
                            <img
                                src={file.preview}
                                className="h-full w-full object-contain bg-primary"
                            />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => onDeleteHandler(index, file)}
                        >
                            Delete
                        </Button>
                    </Box>
                );
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Box>
                <InputLabel>
                    <strong className="text-gray-700">{label}</strong>
                </InputLabel>
            </Box>
            <Box>{progressBar}</Box>
            {files.length > 0 ? (
                <Box className="grid grid-cols-1 gap-4">
                    {files.map((file: any, index: number) =>
                        getFilePreview(file, index)
                    )}
                </Box>
            ) : (
                <Box
                    {...getRootProps({
                        className:
                            'dropzone border-primary rounded border-2 border-dashed h-16 grid place-content-center',
                    })}
                >
                    <input {...getInputProps()} />
                    <Box>
                        <Typography>
                            Drag and drop files here, or click to select files
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Dropzone;
