/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CardContent,
    Stack,
    Typography,
    Box,
    Grid,
    Button,
    Divider,
} from '@mui/material';
import { map } from 'lodash';
import { Storage } from 'aws-amplify';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export function downloadBlob(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    a.target = '_blank';
    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener('click', clickHandler);
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
    return a;
}

const VendorFinance = (props: { vendorFinance: any }) => {
    const { vendorFinance } = props;
    const getFinanceDocumentUrl = async (contract: any) => {
        const res: any = await Storage.get(
            contract?.key || contract?.files[0]?.name
        );
        downloadBlob(res || '', contract?.key || contract?.files[0]?.name);
    };
    return (
        <CardContent>
            <Stack direction="column" spacing={2}>
                <Typography>Finance</Typography>
                <Box className="flex flex-col gap-2">
                    {vendorFinance.financeTaggedUser && (
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography className="capitalize">
                                    Assign User
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className="capitalize">
                                    {vendorFinance?.financeTaggedUser || '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Divider />
                    {
                        // !vendorFinance.financeTaggedUser &&
                        map(vendorFinance?.contracts, (contract, index) => {
                            return (
                                <Grid
                                    container
                                    spacing={2}
                                    key={`${contract.type}-${index}-${contract?.key}`}
                                >
                                    <Grid item xs={4}>
                                        <Typography className="capitalize">
                                            Contract Type
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography className="capitalize">
                                                {contract?.type}
                                            </Typography>
                                            {(contract?.files &&
                                                contract?.files[0]?.name) ||
                                                (contract?.key && (
                                                    <Button
                                                        startIcon={
                                                            <AttachFileIcon />
                                                        }
                                                        onClick={() =>
                                                            getFinanceDocumentUrl(
                                                                contract
                                                            )
                                                        }
                                                    >
                                                        <Typography>
                                                            {contract?.key ||
                                                                contract
                                                                    ?.files[0]
                                                                    ?.name}
                                                        </Typography>
                                                    </Button>
                                                ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                </Box>
            </Stack>
        </CardContent>
    );
};

export default VendorFinance;
