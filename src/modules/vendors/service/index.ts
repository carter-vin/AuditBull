/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { API, graphqlOperation } from 'aws-amplify';
import { OptionType } from 'utils/select';

type FianceContractType = {
    type: string;
    file: any[];
};

export interface IVendor {
    name: string;
    website: string;
    service: OptionType[];
    status: string;
    compliance: {
        compliaceTaggedUser: string;
        riskClassification: string;
        riskStatement: string;
        vrmStatus: string;
        vrmQuestionnaire: string;
        securityAssesment: string;
        privacyReview: string;
        legalReview: string;
    };
    useCases: {
        useCaseTaggedUser: string;
        owner: string;
        description: string;
        dataUsage: OptionType[];
    };
    finance: {
        financeTaggedUser: string;
        contracts: FianceContractType[];
    };
}

const createVendor = async (payload: IVendor) => {
    const createVendorMutation = `
        mutation CreateVendor {
            createVendors(input: {
                compliance: ${JSON.stringify(
                    JSON.stringify(payload.compliance)
                )},
                finance:${JSON.stringify(JSON.stringify(payload.finance))},
                name: "${payload.name}",
                status:"${payload.status}",
                service: ${JSON.stringify(JSON.stringify(payload.service))},
                website: "${payload.website}",
                use_cases: ${JSON.stringify(JSON.stringify(payload.useCases))}
            }) {
                id
            }
        }
    `;

    return API.graphql(graphqlOperation(createVendorMutation));
};

const listVendors = async () => {
    const listVenuesQuery = `
        query MyQuery {
            listVendors {
                items {
                id
                name
                service
                status
                finance
                compliance
                use_cases
                createdAt
                Notes {
                        items {
                            note
                            taged
                            id
                            creator
                            createdAt
                        }
                    }
                }
            }
        }
`;

    return API.graphql(graphqlOperation(listVenuesQuery));
};

export { createVendor, listVendors };
