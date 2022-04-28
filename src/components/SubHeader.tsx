import { DefaultButton, Stack } from '@fluentui/react';

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
            horizontal
            horizontalAlign="end"
            tokens={{
                childrenGap: '32px',
            }}
        >
            <Stack
                horizontal
                horizontalAlign="end"
                tokens={{
                    childrenGap: 24,
                }}
            >
                {menu.map((item: Menu) => (
                    <DefaultButton
                        key={item.label}
                        text={item.label}
                        className="p-4 rounded-md"
                        allowDisabledFocus
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default SubHeader;
