import { Box, Button } from '@mui/material';
import Image from 'next/image';

interface SuccessScreenProps {
    callback: () => void;
    callbackLabel: string;
    description: string;
}
const Success = (props: SuccessScreenProps) => {
    const { callback, callbackLabel, description } = props;
    return (
        <Box className="h-[80vh] w-full grid place-content-center gap-32 ">
            <Image
                src="/icons/success.png"
                alt="success"
                width={300}
                height={300}
            />
            <Box className="w-full flex flex-col gap-8 justify-center">
                <Box>
                    <p className="text-center text-xl font-medium">
                        {description}
                    </p>
                </Box>
                <Button variant="outlined" onClick={() => callback()}>
                    {callbackLabel}
                </Button>
            </Box>
        </Box>
    );
};

export default Success;
