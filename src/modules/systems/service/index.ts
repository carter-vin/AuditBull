/* eslint-disable import/prefer-default-export */
import { API, graphqlOperation } from 'aws-amplify';
import { OptionType } from '../../../utils/select';

type SystemLocation = {
    type: string;
    other_location?: string;
};

type SystemRisk = {
    criticality: string;
    risk_rating: string;
};

type SystemDataClassification = {
    transmist_process_pii: boolean;
    transmist_process_phi: boolean;
    transmist_process_pci: boolean;
};

type SystemCompliance = {
    last_access_review_date: string;
    last_access_review_result: string;
    next_access_review_date: string;
    periodic_review: string;
    role_based_access: {
        value: string;
        label: string;
    }[];
};
export interface ISytemPayload {
    name: string;
    status: string;
    owner: OptionType;
    type: string;
    description: string;
    vendor: {
        vendor_provided: boolean;
        vendor: string;
    };
    customer_facing_info_system: boolean;
    location: SystemLocation | string;
    risk: SystemRisk | string;
    data_classification: SystemDataClassification | string;
    compliance: SystemCompliance | string;
}
const createSystem = async (payload: ISytemPayload) => {
    const createSystemMutation = `
        mutation CreateSystem {
                createSystem(input: {
                    name: "${payload.name}", 
                    status: "${payload.status}", 
                    type: "${payload.type}", 
                    description: "${payload.description}", 
                    vendor_provided: ${payload.vendor.vendor_provided},
                    systemVendorsId: "${payload.vendor.vendor}", 
                    customer_facing_info_system: ${
                        payload.customer_facing_info_system
                    },
                    owner:${JSON.stringify(JSON.stringify(payload.owner))}, 
                    location: ${JSON.stringify(
                        JSON.stringify(payload.location)
                    )}, 
                    risk: ${JSON.stringify(JSON.stringify(payload.risk))}, 
                    data_classification: ${JSON.stringify(
                        JSON.stringify(payload.data_classification)
                    )}, 
                    compliance: ${JSON.stringify(
                        JSON.stringify(payload.compliance)
                    )}
                }) {
                    id
                    name
                }
        }
                `;
    return API.graphql(graphqlOperation(createSystemMutation));
};

const listSystem = async () => {
    const listSystemQuery = `
        query ListSystem {
            listSystems {
                items {
                    id
                    name
                    status
                    owner
                    type
                    description
                    vendor_provided
                    customer_facing_info_system
                    location
                    risk
                    data_classification
                    compliance
                    Vendors {
                        name
                        id
                    }
                }
            }
        }
        `;
    return API.graphql(graphqlOperation(listSystemQuery));
};

export { createSystem, listSystem };
