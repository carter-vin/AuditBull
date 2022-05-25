// eslint-disable-next-line import/prefer-default-export

export type OptionType = {
    label: string;
    value: string;
};

export const vendorStatus: OptionType[] = [
    {
        label: 'All Status',
        value: 'all',
    },
    {
        label: 'Seeking Approval',
        value: 'seeking-approval',
    },
    {
        label: 'Evaluation',
        value: 'evaluation',
    },
    {
        label: 'Buddget Approved',
        value: 'budget-approved',
    },
    {
        label: 'Active',
        value: 'active',
    },
];

export const complianceStatus: OptionType[] = [
    {
        label: 'Both',
        value: 'both',
    },
    {
        label: 'Yes',
        value: 'yes',
    },
    {
        label: 'No',
        value: 'no',
    },
];

export const contractOptions: OptionType[] = [
    {
        label: 'MNDA',
        value: 'MNDA',
    },
    {
        label: 'MSA',
        value: 'MSA',
    },
    {
        label: 'SOW',
        value: 'SOW',
    },
    {
        label: 'Other',
        value: 'Other',
    },
];

export const riskClassificationOptions: OptionType[] = [
    {
        label: 'Very High',
        value: 'very-high',
    },
    {
        label: 'High',
        value: 'high',
    },
    {
        label: 'Medium',
        value: 'medium',
    },
    {
        label: 'Low',
        value: 'low',
    },
    {
        label: 'Very Low',
        value: 'very-low',
    },
];

export const statusOptions: OptionType[] = [
    {
        label: 'Not Started',
        value: 'not-started',
    },
    {
        label: 'In Progress',
        value: 'in-progress',
    },
    {
        label: 'Completed',
        value: 'completed',
    },
];

export const dataUsageOption: OptionType[] = [
    {
        label: 'EPHI',
        value: 'EPHI',
    },
    {
        label: 'PII',
        value: 'PII',
    },
    {
        label: 'Customer Data',
        value: 'customer-data',
    },
    {
        label: 'CUI',
        value: 'CUI',
    },
    {
        label: 'Synthetic Data Only',
        value: 'synthetic-data-only',
    },
    {
        label: 'Other',
        value: 'other',
    },
];

export const serviceOption: OptionType[] = [
    {
        label: 'Technology: Software',
        value: 'technology-software',
    },
    {
        label: 'Technology: SaaS',
        value: 'technology-saas',
    },
    {
        label: 'Cloud Service Provider',
        value: 'colud-service-provider',
    },
    {
        label: 'Personnel',
        value: 'personnel',
    },
    {
        label: 'Professional Services',
        value: 'professional-services',
    },
    {
        label: 'VAR',
        value: 'var',
    },
];

export const vendorStatusOptions: OptionType[] = [
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Inactive',
        value: 'inactive',
    },
    {
        label: 'Approved for Evaluation',
        value: 'approved-for-evaluation',
    },
    {
        label: 'Awaiting VRM',
        value: 'awaiting-vrm',
    },
];
