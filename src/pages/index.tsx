import { ReactElement } from 'react';
import { Text } from '@fluentui/react/lib/Text';

import DashboardLayout from 'layouts/DashboardLayout';
import Card from 'components/Card';
import { Stack, PrimaryButton, DefaultButton } from '@fluentui/react';
import SubHeader, { Menu } from 'components/SubHeader';

const subMenu: Menu[] = [
    {
        label: 'X Access Reviews Complete',
    },
    {
        label: '% of Systems compliant to policy',
    },
    {
        label: 'X Users have been Eliminated',
    },
    {
        label: 'X $ have been saved',
    },
];

const Home = () => {
    return (
        <>
            <SubHeader menu={subMenu} />
            <div className="mt-10">
                <Stack horizontal>
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            className="flex flex-col justify-center items-center gap-4 flex-1"
                            key={`item-${index}`}
                        >
                            <Text
                                as="h5"
                                variant="mediumPlus"
                                className="text-lg text-center"
                                block
                            >
                                Compliance
                            </Text>
                            <Card>
                                <Stack
                                    verticalAlign="space-between"
                                    className="h-[30vh] w-[100%] flex-1"
                                >
                                    <Stack
                                        tokens={{
                                            childrenGap: '22px',
                                        }}
                                    >
                                        <DefaultButton
                                            text="Issue"
                                            allowDisabledFocus
                                            className="text-black p-6 rounded-md"
                                        />
                                        <PrimaryButton
                                            text="Agg Info"
                                            allowDisabledFocus
                                            className="text-black p-6 rounded-md"
                                            primary
                                        />
                                    </Stack>
                                    <PrimaryButton
                                        primary
                                        text="Recommendation"
                                        allowDisabledFocus
                                        className="text-black p-6 rounded-md"
                                    />
                                </Stack>
                            </Card>
                        </div>
                    ))}
                </Stack>
            </div>
        </>
    );
};

Home.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
