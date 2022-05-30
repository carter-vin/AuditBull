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

const VendorFinance = (props: { vendorFinance: any }) => {
    const { vendorFinance } = props;
    const getFinanceDocumentUrl = async (contract: any) => {
        const res = await Storage.get(
            contract?.key || contract?.files[0]?.name,
            {
                level: 'protected',
            }
        );
        return res;
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
                    {!vendorFinance.financeTaggedUser &&
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
                                                        href={
                                                            getFinanceDocumentUrl(
                                                                contract
                                                            ) || ''
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
                        })}
                </Box>
            </Stack>
        </CardContent>
    );
};

export default VendorFinance;
