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
        "AdminQueries10de20ac": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "auditbull": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "auditbullstorage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}