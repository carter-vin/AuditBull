import { Box, Tabs, Tab as TabItem, CircularProgress } from '@mui/material';
import { useState } from 'react';
import type { ReactElement } from 'react';

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

type TabItem = {
    label: string;
    component: ReactElement;
};

interface TabProps {
    tabs: TabItem[];
    activeTab: number;
    loading: boolean;
}

const Tab = (props: TabProps) => {
    const { tabs, activeTab, loading } = props;
    const [value, setValue] = useState(activeTab || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        event.preventDefault();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {tabs.map((tab, index) => (
                        <TabItem
                            label={tab.label}
                            {...a11yProps(index)}
                            key={tab.label}
                        />
                    ))}
                </Tabs>
            </Box>
            {loading ? (
                <Box className="flex justify-center items-center justify-items-center h-full w-full">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                tabs.map((tab, index) => (
                    <div
                        key={tab.label}
                        role="tabpanel"
                        hidden={value !== index}
                        id={`simple-tabpanel-${index}`}
                        aria-labelledby={`simple-tab-${index}`}
                    >
                        {value === index && <Box>{tab.component}</Box>}
                    </div>
                ))
            )}
        </Box>
    );
};

export default Tab;
