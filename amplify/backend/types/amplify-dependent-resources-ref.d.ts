export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "auditbull37e38ef1": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "GoogleWebClient": "string"
        },
        "userPoolGroups": {
            "adminGroupRole": "string",
            "usersGroupRole": "string"
        }
    },
    "function": {
        "AdminQueriesaf68d25f": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}