import {
    Box,
    Button,
    Card,
    Step,
    StepLabel,
    Stepper as MUIStepper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';

export type StepperStepsType = { label: string; component: ReactElement };
interface StepperProps {
    activeStep: number;
    steps: StepperStepsType[];
    isDisabled?: boolean;
    stepperComponent?: ReactElement;
    handleBack: () => void;
    handleSubmit: () => void;
}
const Stepper = (props: StepperProps) => {
    const theme = useTheme();
    const verticalStepper = useMediaQuery(theme.breakpoints.down('sm'));
    const {
        activeStep,
        steps,
        isDisabled,
        handleBack,
        handleSubmit,
        stepperComponent,
    } = props;
    return (
        <Box className="flex flex-col gap-8 justify-start  flex-1">
            <Box className="flex justify-start flex-col md:flex-row">
                <MUIStepper
                    orientation={verticalStepper ? 'vertical' : 'horizontal'}
                    activeStep={activeStep}
                    className="flex-1 md:w-3/4 items-start md:items-center flex "
                >
                    {(steps || []).map((step: { label: string }) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={step.label} {...stepProps}>
                                <StepLabel {...labelProps}>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </MUIStepper>
            </Box>

            <Card className="min-h-[60vh] p-8 flex flex-col gap-4">
                <Typography variant="h6" className="text-bold">
                    {steps[activeStep].label}
                </Typography>
                <Box>
                    {stepperComponent ||
                        steps[activeStep].component ||
                        'no component render'}
                </Box>
            </Card>

            <Box className="flex items-center justify-end gap-4">
                <Button
                    disabled={activeStep === 0 || isDisabled}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isDisabled}
                >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
};

export default Stepper;
