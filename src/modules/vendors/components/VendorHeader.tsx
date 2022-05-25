import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

import { AppRoute } from 'utils/route';
import classNames from 'classnames';

interface VendorHeaderProps {
    breadcrumb?: string;
    hideCTA?: boolean;
}
const VendorHeader = (props: VendorHeaderProps) => {
    const { breadcrumb, hideCTA } = props;
    return (
        <Box
            className={classNames(
                ' w-full flex items-center',
                hideCTA || breadcrumb ? 'justify-between' : 'justify-end'
            )}
        >
            {breadcrumb && (
                <Typography variant="h6" className="text-bold">
                    {breadcrumb}
                </Typography>
            )}
            {!hideCTA && (
                <Link href={AppRoute.CreateVendor} passHref>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        href={AppRoute.CreateVendor}
                    >
                        <span>Add Vendor</span>
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default VendorHeader;
