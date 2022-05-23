import { Box, OutlinedInput, Select, Chip, MenuItem } from '@mui/material';
import React from 'react';

interface MultiSelectProps {
    value: {
        value: string | number;
        label: string;
    }[];
    handleChange: any;
    options: {
        value: string | number;
        label: string;
    }[];
}
const MultiSelect = (props: MultiSelectProps) => {
    const { value, handleChange, options } = props;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };
    return (
        <Select
            fullWidth
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((item: any) => {
                        return <Chip key={item} label={item} />;
                    })}
                </Box>
            )}
            MenuProps={MenuProps}
        >
            {options.map(
                (option: { value: string | number; label: string }) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                )
            )}
        </Select>
    );
};

export default MultiSelect;
