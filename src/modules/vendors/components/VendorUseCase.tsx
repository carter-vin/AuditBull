/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CardContent,
    Stack,
    Typography,
    Box,
    Grid,
    Divider,
} from '@mui/material';
import { map } from 'lodash';
import React from 'react';

const VendorUseCase = (props: { vendorUseCase: any }) => {
    const { vendorUseCase } = props;
    return (
        <CardContent>
            <Stack direction="column" spacing={2}>
                <Typography>Use Case</Typography>
                {vendorUseCase.useCaseTaggedUser && (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography className="capitalize">
                                Assign User
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className="capitalize">
                                {vendorUseCase?.useCaseTaggedUser || '-'}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                <Divider />
                {
                    // !vendorUseCase.useCaseTaggedUser &&
                    <Box className="flex flex-col gap-2">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography className="capitalize">
                                    owner
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography className="capitalize">
                                    {vendorUseCase?.owner}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography className="capitalize">
                                    description
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography className="capitalize">
                                    {vendorUseCase?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography className="capitalize">
                                    data Usage
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                {map(
                                    vendorUseCase?.dataUsage || [],
                                    (dataUsage, index) => (
                                        <Typography
                                            key={`${dataUsage.value}-${index}`}
                                        >
                                            {dataUsage.label}
                                        </Typography>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                }
            </Stack>
        </CardContent>
    );
};

export default VendorUseCase;
