/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CardContent,
    Stack,
    Grid,
    Typography,
    Divider,
    Box,
} from '@mui/material';
import React from 'react';
import VendorExtraNotes from './VendorExtraNotes';

const VendorCompliance = (props: {
    vendor: any;
    vendorCompliance: any;
    getVendorList: () => void;
}) => {
    const { vendor, getVendorList, vendorCompliance } = props;
    return (
        <CardContent>
            <Stack direction="column" spacing={2}>
                {vendorCompliance?.compliaceTaggedUser && (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography className="capitalize">
                                Assign User
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className="capitalize">
                                {vendorCompliance?.compliaceTaggedUser || '-'}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                <Divider />
                {
                    // !vendorCompliance?.compliaceTaggedUser &&
                    <>
                        <Box className="flex flex-col gap-2">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        VRM Status
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        {vendor?.vrmStatus}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        vrm Questionnaire
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        {vendorCompliance?.vrmQuestionnaire}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        security Assesment
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        {vendorCompliance?.securityAssesment}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        privacy Review
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        {vendorCompliance?.privacyReview}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        legal Review
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="capitalize">
                                        {vendorCompliance?.legalReview}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                        <Stack direction="column" spacing={2}>
                            <Typography>Risk Management</Typography>
                            <Box className="flex flex-col gap-2">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography className="capitalize">
                                            risk Classification
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="capitalize">
                                            {
                                                vendorCompliance?.riskClassification
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography className="capitalize">
                                            risk Statement
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="capitalize">
                                            {vendorCompliance?.riskStatement}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                        <Divider />
                    </>
                }
                <VendorExtraNotes
                    selectedVendor={vendor}
                    refetch={() => getVendorList()}
                />
            </Stack>
        </CardContent>
    );
};

export default VendorCompliance;
