import { Box, Button } from '@mui/material';

export type Menu = {
    label: string;
};

interface SubHeaderProps {
    menu: Menu[];
}

const SubHeader = (props: SubHeaderProps) => {
    const { menu } = props;
    return (
        <Box className="flex flex-col md:flex-row  md:w-auto gap-4 space-between">
            {menu.map((item: Menu) => (
                <Button variant="outlined" key={item.label}>
                    {item.label}
                </Button>
            ))}
        </Box>
    );
};

export default SubHeader;
