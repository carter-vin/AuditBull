/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, IconButton, Typography } from '@mui/material';
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

    const removeStorage = async (value: any, index: number) => {
        const path = formik.values.finance?.contracts[index]?.type
            ? `${formik.values.finance?.contracts[index]?.type}/${value.name}-${index}`
            : `${value.name}-${index}`;
        await Storage.remove(path, { level: 'protected' });
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
        if (value.length > 0) {
            const path = contractType
                ? `${contractType}/${value[0].name}-${index}`
                : `${value[0].name}-${index}`;
            const result = await Storage.put(path, value, {
                level: 'protected',
                contentType: value.type,
            });
            formik.setFieldValue(`finance.contracts.${index}.file`, value);
            formik.setFieldValue(`finance.contracts.${index}.key`, result.key);
        } else {
            formik.setFieldValue(`finance.contracts.${index}.file`, []);
            formik.setFieldValue(`finance.contracts.${index}.key`, '');
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
                    values={formik.values.finance?.financeTaggedUser || ''}
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
                        onClick={() =>
                            setInputForms([
                                ...inputForm,
                                { type: '', file: '' },
                            ])
                        }
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
                                setFiles={(value: any) =>
                                    setContractFile(
                                        formik.values.finance?.contracts[index]
                                            ?.type,
                                        value,
                                        index
                                    )
                                }
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
