/* eslint-disable import/prefer-default-export */
import { withSSRContext } from 'aws-amplify';
import awsmobile from 'aws-exports';

export const withAuth = async (context: any) => {
    try {
        const SSR = withSSRContext(context);
        SSR.Auth.configure({ ...awsmobile, ssr: true });
        const user = await SSR.Auth.currentAuthenticatedUser();
        return user;
    } catch (error) {
        // context.res.writeHead(301, { Location: '/login' });
        // context.res.end();
        // return {
        //     redirect: {
        //         destination: '/login',
        //         permanent: false,
        //     },
        // };
        return null;
    }
};
