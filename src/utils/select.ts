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
        label: 'Select ALL',
        value: 'all',
    },
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
        label: 'Select ALL',
        value: 'all',
    },
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

export const compilantOptions: OptionType[] = [
    {
        label: 'Compliant',
        value: 'compliant',
    },
    {
        label: 'Non-Compliant',
        value: 'non-compliant',
    },
    {
        label: 'Not Determined',
        value: 'not-determined',
    },
];

export const locationOptions: OptionType[] = [
    {
        label: 'Cloud',
        value: 'cloud',
    },
    {
        label: 'On Premise',
        value: 'on-premise',
    },
    {
        label: 'Other',
        value: 'other',
    },
];

export const perodicOptions: OptionType[] = [
    {
        label: 'Monthly',
        value: 'monthly',
    },
    {
        label: 'Quarterly',
        value: 'quarterly',
    },
    {
        label: 'Semi-Annual',
        value: 'semi-annual',
    },
    {
        label: 'Annual',
        value: 'annual',
    },
];

export const rolesBasedAccess: OptionType[] = [
    {
        label: 'Administrator',
        value: 'administrator',
    },
    {
        label: 'Power User',
        value: 'power-user',
    },
    {
        label: 'Standard',
        value: 'standard',
    },
    {
        label: 'Read Only',
        value: 'read-only',
    },
    {
        label: 'Audit',
        value: 'audit',
    },
];
