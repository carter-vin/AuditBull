/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import { Box, InputLabel, FormHelperText, useTheme } from '@mui/material';
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
    const theme = useTheme();
    const reactSelectStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            minHeight: '38px',
            border:
                theme.palette.mode === 'dark'
                    ? '1px solid #fff'
                    : '1px solid #1A202C',
            boxShadow: 'none',
        }),

        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0 6px',
        }),

        indicatorSeparator: () => ({
            display: 'none',
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            height: '32px',
            marginTop: -2,
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor:
                theme.palette.mode === 'dark' ? '#212839' : 'white',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            '&:hover': {
                borderColor: 'red',
                color: state.isFocused ? 'black' : 'white',
            },
        }),
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    };
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {label && (
                <Box>
                    <InputLabel htmlFor="email" className="capitalize">
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
                menuPortalTarget={document.body}
                styles={reactSelectStyles}
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
