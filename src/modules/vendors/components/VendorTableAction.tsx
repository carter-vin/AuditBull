import { Box, TextField, MenuItem, InputAdornment } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { vendorStatus, complianceStatus, OptionType } from 'utils/select';
import { VendorItem } from 'pages/vendors';
import { filter } from 'lodash';

interface VendorTableActionProps {
    setVendorList: (items: VendorItem[]) => void;
    setQuery: (query: string) => void;
    query: string;
    vendorList: VendorItem[];
    ownerOptions?: OptionType[];
}

const VendorTableAction = (props: VendorTableActionProps) => {
    const { setVendorList, setQuery, query, vendorList, ownerOptions } = props;
    const [status, setStatus] = useState<string>('all');
    const [compliance, setCompliance] = useState<string>('both');
    const [owner, setOwner] = useState<string>('all');

    const handleStatusChange = (value: string) => {
        setStatus(value);
        if (value === 'all') {
            setVendorList(vendorList);
        } else {
            setVendorList(
                // vendorList.filter((item: VendorItem) => item.status === value)
                filter(vendorList, (item: VendorItem) =>
                    item.status.includes(value)
                )
            );
        }
    };

    const handleComplianceChange = (value: string) => {
        setCompliance(value);
        if (value === 'both') {
            setVendorList(vendorList);
        } else {
            setVendorList(
                vendorList.filter((item: VendorItem) =>
                    item.compliance?.includes(value)
                )
            );
        }
    };

    const handleOwnerChange = (value: string) => {
        setOwner(value);
        if (value === 'all') {
            setVendorList(vendorList);
        } else {
            setVendorList(
                vendorList.filter((item: VendorItem) =>
                    item.owner?.includes(value)
                )
            );
        }
    };

    return (
        <Box className="flex flex-col md:flex-row md:justify-end items-center gap-4 md:hidden">
            <TextField
                id="status"
                variant="outlined"
                placeholder="Select Status"
                size="small"
                select
                value={status}
                className="w-full md:w-48"
                onChange={(e) => handleStatusChange(e.target.value)}
            >
                {vendorStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="compliance"
                variant="outlined"
                placeholder="Select Compliance"
                size="small"
                select
                value={compliance}
                className="w-full md:w-48"
                onChange={(e) => handleComplianceChange(e.target.value)}
            >
                {complianceStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="owner"
                variant="outlined"
                placeholder="Owner"
                size="small"
                select
                value={owner}
                className="w-full md:w-48"
                onChange={(e) => handleOwnerChange(e.target.value)}
            >
                {(ownerOptions || []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="search-vendors"
                variant="outlined"
                placeholder="Search"
                size="small"
                className="w-full md:w-48"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default VendorTableAction;
