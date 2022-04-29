import { Stack, Button } from '@mui/material';

export type Menu = {
    label: string;
};

interface SubHeaderProps {
    menu: Menu[];
}

const SubHeader = (props: SubHeaderProps) => {
    const { menu } = props;
    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={4}
        >
            {menu.map((item: Menu) => (
                <Button variant="outlined" key={item.label}>
                    {item.label}
                </Button>
            ))}
        </Stack>
    );
};

export default SubHeader;
