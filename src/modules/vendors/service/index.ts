/* eslint-disable import/prefer-default-export */
import { API, graphqlOperation } from 'aws-amplify';

const createVendor = async (payload: any) => {
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
export { createVendor };
