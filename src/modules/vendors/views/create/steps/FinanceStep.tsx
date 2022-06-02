/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Card,
    IconButton,
    LinearProgress,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select from 'components/Select';
import { contractOptions, OptionType } from 'utils/select';
import { map } from 'lodash';
import { useState } from 'react';
import Dropzone from 'components/Dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { Storage } from 'aws-amplify';

interface FinanceStepProps {
    formik: any;
    users: OptionType[];
}

const FinanceStep = (props: FinanceStepProps) => {
    const { formik, users } = props;
    const [inputForm, setInputForms] = useState([
        {
            type: '',
            file: '',
        },
    ]);
    const [progress, setProgress] = useState({
        id: 0,
        value: 0,
        show: false,
    });

    const removeStorage = async (value: any, index: number) => {
        const path = formik.values.finance?.contracts[index]?.type
            ? `${formik.values.finance?.contracts[index]?.type}/${value.name}-${index}`
            : `${value.name}-${index}`;
        await Storage.remove(path);
    };

    const onCardDeleteHandler = (index: number, item: any) => {
        const filtred = formik.values?.finance?.contracts.filter(
            (value: any, i: number) => {
                if (formik.values.finance.contracts[index].file) {
                    removeStorage(
                        formik.values.finance.contracts[index]?.file[0],
                        index
                    );
                }
                return item?.type !== value && i !== index;
            }
        );
        const filtredInput = inputForm.filter(
            (value: any, i: number) => i !== index
        );
        formik.setFieldValue('finance.contracts', filtred);
        setInputForms(filtredInput);
    };

    const setContractFile = async (
        contractType: string,
        value: any,
        index: number
    ) => {
        if (!contractType) {
            formik.setFieldError(
                `finance.contracts.${index}.type`,
                'Contract type is required, before adding contract file'
            );
        } else {
            setProgress({
                id: index,
                value: 0,
                show: true,
            });
            if (value.length > 0) {
                const path = contractType
                    ? `${contractType}/${value[0].name}`
                    : `${value[0].name}`;
                const result = await Storage.put(path, value[0], {
                    progressCallback(runningProgress) {
                        const percentage =
                            (runningProgress.loaded / runningProgress.total) *
                            100;
                        setProgress({
                            id: index,
                            value: Math.round(percentage),
                            show: true,
                        });
                    },
                    completeCallback: () => {
                        setProgress({
                            id: 0,
                            value: 0,
                            show: false,
                        });
                    },
                });
                formik.setFieldValue(`finance.contracts.${index}.file`, value);
                formik.setFieldValue(
                    `finance.contracts.${index}.key`,
                    result.key
                );
            } else {
                formik.setFieldValue(`finance.contracts.${index}.file`, []);
                formik.setFieldValue(`finance.contracts.${index}.key`, '');
            }
            setProgress({
                id: index,
                value: 0,
                show: false,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {formik.values.finance?.financeTaggedUser && (
                <Typography color="green">
                    You can navigate to next step
                </Typography>
            )}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Select
                    label="Assigned To"
                    name="finance.financeTaggedUser"
                    options={users || []}
                    values={formik.values.finance?.financeTaggedUser}
                    onChange={formik.handleChange}
                />
            </Box>
            <div className="w-[100%] flex flex-col ">
                <Box className="flex items-center gap-8">
                    <Typography>
                        <strong className="text-gray-700"> Contract </strong>
                    </Typography>
                    <IconButton
                        color="primary"
                        component="div"
                        onClick={() => {
                            setInputForms([
                                ...inputForm,
                                { type: '', file: '' },
                            ]);
                            formik.values.finance.contracts.push({
                                type: '',
                                file: '',
                            });
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {map(inputForm || [], (item, index) => (
                        <Card
                            className="p-4 flex flex-col gap-4 relative"
                            key={index}
                        >
                            <Select
                                label="Contract Type"
                                name={`finance.contracts.${index}.type`}
                                options={contractOptions || []}
                                values={
                                    formik.values.finance?.contracts[index]
                                        ?.type || ''
                                }
                                onChange={(e: any) => {
                                    formik.setFieldValue(
                                        `finance.contracts.${index}.type`,
                                        e.target.value
                                    );
                                }}
                                error={
                                    (formik.touched.finance?.contracts[index]
                                        ?.type &&
                                        formik.errors.finance?.contracts[index]
                                            ?.type) ||
                                    ''
                                }
                            />
                            <Dropzone
                                label="Upload Contract Files"
                                max={1}
                                files={
                                    formik.values.finance?.contracts[index]
                                        ?.file || []
                                }
                                onDelete={(value: any) =>
                                    removeStorage(value, index)
                                }
                                progressBar={
                                    index === progress.id && progress.show ? (
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress.value}
                                        />
                                    ) : null
                                }
                                error={
                                    (formik.touched.finance?.contracts[index]
                                        ?.file &&
                                        formik.errors.finance?.contracts[index]
                                            ?.file) ||
                                    ''
                                }
                                setFiles={(value: any) =>
                                    setContractFile(
                                        formik.values.finance?.contracts[index]
                                            ?.type,
                                        value,
                                        index
                                    )
                                }
                                name="file-upload"
                            />
                            <Box className="absolute top-1 right-1">
                                <IconButton
                                    onClick={() =>
                                        onCardDeleteHandler(
                                            index,
                                            formik.values?.finance?.contracts[
                                                index
                                            ]
                                        )
                                    }
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </div>
        </div>
    );
};

export default FinanceStep;
