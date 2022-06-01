import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import classNames from 'classnames';

interface ComponentHeaderProps {
    breadcrumb?: string;
    ctaLabel?: string;
    ctaRedirectUrl?: string;
    hideCTA?: boolean;
    ctaIcon?: React.ReactNode;
}
const ComponentHeaderProps = (props: ComponentHeaderProps) => {
    const { breadcrumb, hideCTA, ctaIcon, ctaLabel, ctaRedirectUrl } = props;
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
                <Link href={ctaRedirectUrl || ''} passHref>
                    <Button
                        variant="contained"
                        startIcon={ctaIcon || <AddIcon />}
                        href={ctaRedirectUrl}
                    >
                        <span>{ctaLabel}</span>
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default ComponentHeaderProps;
