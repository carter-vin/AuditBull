import { Modal as MUIModal, Box } from '@mui/material';
import type { ReactElement } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
    name: string;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: 350,
        sm: 350,
        md: 450,
        lg: 450,
    },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const Modal = (props: ModalProps) => {
    const { open, onClose, children, name } = props;
    return (
        <MUIModal
            open={open}
            onClose={onClose}
            aria-labelledby={name}
            aria-describedby={name}
        >
            <Box sx={style}>{children}</Box>
        </MUIModal>
    );
};

export default Modal;
