/* eslint-disable no-unused-expressions */
import { Box, InputLabel, FormHelperText } from '@mui/material';
import React from 'react';
import ReactSelect from 'react-select';
import { OptionType } from 'utils/select';

interface MultipleSelectProps {
    label?: string;
    name: string;
    disabled?: boolean;
    options: OptionType[];
    values: OptionType;
    onChange: any;
    error?: any;
}

const MultipleSelect = (props: MultipleSelectProps) => {
    const { label, name, options, values, error, onChange, disabled } = props;

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {label && (
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700"> {label} </strong>
                    </InputLabel>
                </Box>
            )}
            <ReactSelect
                name={name}
                options={options}
                isMulti
                value={values || ''}
                isDisabled={disabled}
                onChange={(selected) => {
                    selected.length &&
                    selected.find((option) => option.value === 'all')
                        ? onChange(options.slice(1))
                        : onChange(selected);
                }}
            />
            {Boolean(error) && (
                <FormHelperText error id="username" color="red">
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default MultipleSelect;
