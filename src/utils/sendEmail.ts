/* eslint-disable import/prefer-default-export */
import AWS from 'aws-sdk';
import awsmobile from 'aws-exports';

export const sendMail = async () => {
    AWS.config.update({
        region: awsmobile.aws_cognito_region,
    });
    const ses = new AWS.SES({ apiVersion: '2022-05-11' });
    console.log('I am sending the mail');
    const res = await ses
        .sendEmail({
            Destination: {
                ToAddresses: ['rajeevrajchal12@gmail.com'],
            },
            Source: 'jj544855@gmail.com',
            Message: {
                Subject: { Data: 'Candidate Submission' },
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: 'HTML_FORMAT_BODY',
                    },
                    Text: {
                        Data: `My name is rajeevr rajchal. You can reach me at test`,
                    },
                },
            },
        })
        .promise();
    console.log('the res', res);
    return res;
};
