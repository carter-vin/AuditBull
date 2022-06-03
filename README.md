# Audit Bull
## Audit Bull is the leading website for auditing .........


# Table Of Content
- [Audit Bull](#audit-bull)
  - [Audit Bull is the leading website for auditing .........](#audit-bull-is-the-leading-website-for-auditing-)
- [Table Of Content](#table-of-content)
- [Folder Structure](#folder-structure)
- [Run and Install](#run-and-install)
    - [`yarn install` or `yarn`](#yarn-install-or-yarn)
    - [`yarn dev`](#yarn-dev)
    - [`yarn run build`](#yarn-run-build)
    - [`yarn add <package-nanme>`](#yarn-add-package-nanme)
- [Used UI Libraries](#used-ui-libraries)
- [Formatting Code Automatically](#formatting-code-automatically)
- [Adding Image](#adding-image)
- [Working with Layouts & Pages](#working-with-layouts--pages)
- [Working with components](#working-with-components)
- [Working & createing function for useQuery and useMutation](#working--createing-function-for-usequery-and-usemutation)
- [Integration / Backend](#integration--backend)
  - [Working with Amplify](#working-with-amplify)
  - [Working with Cognioto](#working-with-cognioto)
  - [AdminQuries](#adminquries)
    - [How to user admin queries](#how-to-user-admin-queries)
    - [Adding custom function on admin queries](#adding-custom-function-on-admin-queries)
  - [Graphql API Amplify](#graphql-api-amplify)
  - [Using React Query with aws amplify](#using-react-query-with-aws-amplify)
    - [Uses of use Mutation](#uses-of-use-mutation)
  - [Amplify as Severless Backend](#amplify-as-severless-backend)
    - [Working with backend](#working-with-backend)
    - [PS: If Newly created api has CORS Error, Please follow the below steps](#ps-if-newly-created-api-has-cors-error-please-follow-the-below-steps)
- [Commit Rule](#commit-rule)
- [Reference](#reference)

# Folder Structure
Auditbull project is based on Next js with latest version (18.1.0) at the time of creation.
After clone of the project its looks like 
```
auditbull
    .husky
    .next
    amplify/*
    node_modules/*
    public/
        icons
        logo
        svgs
    src/
        components/*
        hooks/*
        layouts/*
        models/*
        modules/*
        pages/*
        styles/*
        utils/*
        aws-exports.js
    ...others
```
You can add images, logo into public folder selecting appropriate folder based on `icons logo svgs`
Creating new modules like `admin,user` you can get through `src/modules`.
`hooks` can be use to create some internal state management. 

Example of hook
```
    import {useAppData} from 'hooks/useAppData.tsx';
    const {
        <your data>
    } = useAppData()

    please look useUsers hook for referece
```

`models` is auto generated by the `ampliy` once you create `graphql schema` and update `amplify`    
Use `pages/` to create page  that can be switch with routes

# Run and Install
In this project, you can run: 

### `yarn install` or `yarn`
Be sure to use `yarn install` or `yarn` to install all required package holding on package json.

### `yarn dev`
Builds the app for local. With this script you can run the project locally. 
Its will run the project on default port `3000` hosting on url `http://localhost:3000`.

### `yarn run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about deployment for more information.

### `yarn add <package-nanme>`
To add the package/ dependency on this project.

# Used UI Libraries
- Material UI
- Tailwind CSS
- React Select
- Materail Data Grid
- Lodash
- Husky
- Prettier
- React Mention
- AWS Amplify
- React Query 
    - For wrapping aws api called with `useQuery` and `useMutations`.
    - React Query also cache query data. 
# Formatting Code Automatically
Prettier is an opinionated code formatter with support for JavaScript, CSS and JSON. With Prettier you can format the code you write automatically to ensure a code style within your project. See the [Prettier's GitHub page](https://github.com/prettier/prettier) for more information, and look at this [page to see it in action](https://prettier.github.io/prettier/).

To format our code whenever we make a commit in git, we need to install the following dependencies:

```sh
npm install --save husky lint-staged prettier
```

Alternatively you may use `yarn`:

```sh
yarn add husky lint-staged prettier
```

* `husky` makes it easy to use githooks as if they are npm scripts.
* `lint-staged` allows us to run scripts on staged files in git. See this [blog post about lint-staged to learn more about it](https://medium.com/@okonetchnikov/make-linting-great-again-f3890e1ad6b8).
* `prettier` is the JavaScript formatter we will run before commits.

Now we can make sure every file is formatted correctly by adding a few lines to the `package.json` in the project root.

Add the following line to `scripts` section:

```diff
  "scripts": {
+   "precommit": "lint-staged",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

Next we add a 'lint-staged' field to the `package.json`, for example:

```diff
  "dependencies": {
    // ...
  },
+ "lint-staged": {
+   "src/**/*.{js,jsx,json,css}": [
+     "prettier --single-quote --write",
+     "git add"
+   ]
+ },
  "scripts": {
```

Now, whenever you make a commit, Prettier will format the changed files automatically. You can also run `./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx}"` to format your entire project for the first time.

Next you might want to integrate Prettier in your favorite editor. Read the section on [Editor Integration](https://github.com/prettier/prettier#editor-integration) on the Prettier GitHub page.

PS: Auditbull is using `coding convention` provided by `airbnb`. 

# Adding Image
Auditbull use default `image` component provided by the nextjs.
```
    import Image from 'next/image'

    <Image {...props}/>
``` 

Also for some small and minor images Audit bull is using image provided by material ui. 

# Working with Layouts & Pages
Layouts are the high order components found on `layouts`
```
layouts
  - BlankLayout.js
  - DashboardLayout.js
```

- `BlankLayout` is used for blank pages.
- `DashboardLayout` is used for dashboard pages such as `vendor system etc`.
- You can create layout on each specific module  following Domain Driven Design. eg: `SettingLayout` inside `setting module`
  

Connecting to Dashboard Layout from Page

```
  cosnt Home = () => {
    return <p>Home</p>
  }
  Home.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
  };
  export default Home
```

# Working with components
Auditbull has some reusable components such as: 
- Dropzone: 
  - Based on reactdropzone
  - For file uploading enabled with dragdrop. 
  - Please check the component for valid props type.
  ```
    <Dropzone
        label="Upload Files"
        max={1}
        files={[]}
        onDelete={(value: any) => ()}
        progressBar={<component>}
        error={''}
        setFiles={(value: any) => ()}
        name="file-upload"
    />
  ```
- Input
  - Based on Textfield from material ui.
  - Please check the component for valid props type.
  ```
    <Input
      type="text"| "number"| "email"| "password"
      label="location"
      name="location"
      value={''}
      onChange={() => {}}
      error={''}
    />
  ```
- Select
  - Simple select based on matearil ui.
  - Please check the component for valid props type.
  ```
  <Select
    label="Location"
    name="location.type"
    options={locationOptions || []}
    values={formik.values?.location?.type || ''}
    onChange={formik.handleChange}
    error={
        (formik.touched?.location?.type &&
            formik.errors?.location?.type) ||
        ''
    }
  />
  ```
- MentionTextArea
  - Based on react-mention.
  - MentionTextArea provide the functionality of mention user on the text description.
  - Please check the component for valid props type.
  ```
    <MentionTextArea
      note={note}
      taggedUser={taggedUser}
      data={map(users, (user) => {
          return {
              id: user?.email || '',
              display: user?.name || user?.email || '',
          };
      })}
      setNote={setNote}
      setTaggeduser={setTaggeduser}
    />
  ```
- MultipleSelect
  - Based on react-select.
  - Help to select mulitple values with type ahead functionality and many more.
  - Please check the component for valid props type.
  ```
    <MultipleSelect
      label="breath of service"
      name="service"
      options={serviceOption}
      values={formik.values.service || {}}
      onChange={(values: any) => {
          formik.setFieldValue('service', values);
      }}
      error={(formik.touched.service && formik.errors.service) || ''}
  />
  ```
- Modal
  - Modal is simple popover modal based on materail ui with some custom styling.
  - Please check the component for valid props type.
   ```
      <Modal
          open={true}
          onClose={handleEditModal}
          name="edit-user-modal"
      >
          <div>hello world</div>
      </Modal>
  ```
- Table
  - Data table base on matrail xdatagrid
  - Please check the component for valid props type.
  ```
  <Table columns={columns || []} data={users || []} noFilter />
  ```
- Password
  - Simple password input field with show password and hide password feature.
  - Please check the component for valid props type.
- Stepper
  - Stepper is a horizontal progress bar for form showing title and number of steps.
  - Based on material ui.
  - Please check the component for valid props type.
  ```
    <Stepper
      activeStep={activeStep}
      steps={steps || []}
      isDisabled={isLoading}
      handleBack={handleBack}
      isLoading={isLoading}
      handleSubmit={() => {}}
    />
  ```
- Switch
  - Simple form input value based on switch in mateiral ui.
  - For conditional rendor of the value either true or false.
  - Please check the component for valid props type.
  ```
    <Switch
        name="vendor_provided"
        checked={false}
        disabled
    />
  ```
- ComponentHeader
  - Component Header shows the breadcrumn and the cta action if required on component head/initial.
  ```
    <ComponentHeaderProps breadcrumb="Create System" hideCTA />
  ```
- Tab
  - Tab is simple tab component that changes it component on based of active tab.
  - simillar to steppers
  ```
    <Tab tabs={tabs} activeTab={0} loading={false} />
  ```
- Sidebar
  - Sidebar is a sidebar component that shows the sidebar on the left side of the page.`
  - Its the main component mostly used in layouts such as `Dashboard Layout`, `SettingLayout`.
  ```
    <SideBar
        logoImg='/logo/ab_white_horizontal.svg'
        logoImgMobile='/logo/ab_vertical.svg'
        logoText="Audit Bull"
        menu={[]}
    />
  ```

# Working & createing function for useQuery and useMutation
So for function we are using react query. 
We can craete a function as follow
- create `services` folder in the modules that you created. 
- then on `services` index file create a simple async function that return the whole request. 
  - example: 
    - function
      ```
      const listVendorOptions = async () => {
          const listVendorQuery = `
              query ListVendor {
                  listVendors {
                      items {
                          id
                          name
                      }
                  }
              }
              `;
          return API.graphql(graphqlOperation(listVendorQuery));
      };
      ```
    - usage
      ```
        const { isLoading } = useQuery('systems', listVendorOptions, {
          onSuccess: (data: GraphQLResult<any>) => {
              if (data.data) {
                  setSystemList(data?.data?.listVendorOptions?.items || []);
              }
          },
          onError: (error: any) => {
              const message: string = error?.message || 'Failed to fetch systems';
              toast.error(message);
          },
        });
      ```

# Integration / Backend

As mention above on `used libraries`, We are using mulitple libraries to build the application. `Amplify, react-query` are one of most important plugin to work on.

## Working with Amplify
[AWS Amplify](https://aws.amazon.com/amplify/) is a set of purpose-built tools and features that lets frontend web and mobile developers quickly and easily build full-stack applications on AWS, with the flexibility to leverage the breadth of AWS services as your use cases evolve.

You can follow this link to mock the amplify setup
[Amplify Docs](https://docs.amplify.aws/)

Audit Bull Has two environment for working on amplify
- Audit Bull Environment
  - Staging (for all production and staging )
  - Dev (for all development process)
  - Switching between the amplify
    - to get into dev ```amplify env checkout dev```
    - to get into staging ```amplify env checkout staging```
  - When to switch env.
    - On developmenet, local working on our machine: `amplify env must be dev`
    - On Production/Staging, local working on our machine: `amplify env must be staging`
  - To verify env, 
    - check aws-exports.js, there will be  `aws_cloud_logic_custom` has staging `adminqueries`
    - in staging
    ```
        aws_cloud_logic_custom: [
                {
                    "name": "AdminQueries",
                    "endpoint": "https://xxxxxxx.execute-api.us-east-1.amazonaws.com/staging",
                    "region": "us-east-1"
                }
            ],
    ```
     - in dev
    ```
        aws_cloud_logic_custom: [
                {
                    "name": "AdminQueries",
                    "endpoint": "https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev",
                    "region": "us-east-1"
                }
            ],
    ```

- Authentication
  - Auditbull get authenticate with `cognito user` and `amplify auth`
  - Some implemented auth methods are 
    - Google 
    - Teams
    - Slack
    - Auth.sign() (with users email and password) (not register)
  - Authentication is truely based on cognito user. 
  - Authentication used `openID` authentication for `teams slack`
  - Google can be create by amplify with the script `amplify add auth`
  - All amplify functions and data are store in folder `amplify/*`


- Availabel script in amplify
  - ` amplify add auth ` to add auth
  - ` amplify update auth ` to update auth
  - ` amplify add api ` to create api either rest or graphql
  - ` amplify push ` to push the latest code of amplify  on cloud amplify
  - ` amplify pull ` to pull code of latest amplify from  colud amplify to local
  
## Working with Cognioto
[Amazon Cognito](https://aws.amazon.com/cognito/) lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect.

As above metion on authentication:
- As we created two env for amplify, we have two cogniot user pool
  - staging
  - dev

- Cognito used OpenID connection for authentication
- Cognito groups users based on `roles` and `openID`
- Setting up `OpenID`
    - On user pools, navigate to identify providers
    - Click on OpenID Connect
    - Filled all required filed on the openID connect form with select appropriate provider.

## AdminQuries 
Admin queries gives all the data that required admin authentication such as user list. 
Setting up admin queries
- `ampliy add auth`
  - choose amplify admin queires
  - create guard such as admin/user
  - Follow this [Docs](https://docs.amplify.aws/cli/auth/admin/)

### How to user admin queries
```
    const requestInfo = {
       queryStringParameters: {
            groupname: "Editors",
            limit: limit,
            token: nextToken
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };
 const res = await API.post('AdminQueries', '/listUsersInGroup', requestInfo);
```

### Adding custom function on admin queries
- Go to amplify/* 
- Get into amplify/backedn/function/Admin......./src
- You can see there files
  - app.js (main entry point)
  - cognitoActions.js (collection of actions)
  - index.js (entry point)
- Finally add related `Action` on `PolicyDocument` on AdminQureis...... outside of src on same folder

## Graphql API Amplify
- API, Application Progarm Interface.
- [Amplify CLI's GraphQL API](https://docs.amplify.aws/cli/graphql/overview/) category makes it easy for you to create a new GraphQL API backed by a database. Just define a GraphQL schema and Amplify CLI will automatically transform the schema into a fully functioning GraphQL API powered by AWS AppSync, Amazon DynamoDB, and more.
- Adding graphql api 
```
    amplify add api
```
- Follow the bleow instruction [Docs](https://docs.amplify.aws/cli/graphql/overview/)
- Schema 
  ```
    type System @model @auth(rules: [{ allow: public }]) {
        id: ID!
        name: String
        status: String
        owner: AWSJSON
        type: String
        description: String
        vendor_provided: Boolean
        customer_facing_info_system: Boolean
        location: AWSJSON
        risk: AWSJSON
        data_classification: AWSJSON
        compliance: AWSJSON
        Vendors: Vendors @hasOne
    }
  ```

## Using React Query with aws amplify
[React Query](https://react-query.tanstack.com/overview) is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

- useQuery
- useMutation

### Uses of use Mutation
```
    <!-- functions -->
    const createSystem = async (payload: ISytemPayload) => {
        const createSystemMutation = `
            mutation CreateSystem {
                    createSystem(input: {
                        name: "${payload.name}", 
                        status: "${payload.status}", 
                        type: "${payload.type}", 
                        description: "${payload.description}", 
                    }) {
                        id
                        name
                    }
            }
        `;
        return API.graphql(graphqlOperation(createSystemMutation));
    };

    const { isLoading, mutate } = useMutation(createSystem /* function */, {
        mutationKey: 'createSystem', (name for key)
        onSuccess: (res) => {
            /*
                success 
            */
            console.log('res', res)
        },
        onError: (error: any) => {
            /*
            Return error message 
            */
        },
    });

    mutate(values);
```

## Amplify as Severless Backend
- Amplify is connect with dynamodb and cogniot by default. 
- Authentication has already be define on above sections.
  
### Working with backend

- GraphQL API has been used in AuditBull
- Intitial steps to create graphql api 
  - `amplify add api ` then choose graphql (follow the steps [docs](https://docs.amplify.aws/cli/graphql/overview/))
  - create shcema by code 
    - go to  `ab/amplify/backend/api/<api_name>/schema.grapgql`
    - create a sechma as you want.
    - then push to cloud `amplify push`
  - create shcema by GUI
    - go to ampliy admin cms
    - navigate to data
      - create your shema then save and publish
    - pull amplify into local
  - To test the graphql on playgrond, Get into `AWS AppSync`
    -  choose the API based on environment
    -  Then Click on run query
    -  You get a screen with playground of graphql. 
- Can create lambda funcation
  - TDDR
- Using S3 for image storage
  - add s3 in amplify, follow docs [docs](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/)
  ``` amplify add storage ```
  - `amplify push` after successfully creation of storage
  - Upload files [Upload Docs](https://docs.amplify.aws/lib/storage/upload/q/platform/js/)
  ```
  const result = await Storage.put("test.txt", "Hello");
  ```
  -Admin Qureis for fetching user list and other cognito user based APIS [AdminQuries](#adminquries)
### PS: If Newly created api has CORS Error, Please follow the below steps
- Go to `API Gateway`

# Commit Rule
On audit bull, we have two way to commit data
- checks all the lint errors by husky
- [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
  - syntax
  ```
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
  ```
  - example
  ```
    feat: add new feature
    fix: fix bug
    docs: update docs
    style: fix style
    refactor: refactor code
    test: add tests
    chore: update package.json
    revert: revert to a commit
    ci: run CI
    perf: improve performance

    git commit -m "features: add new feature"
  ```

  # Reference
  - [Amplify](https://docs.amplify.aws/)
  - [Amplify CLI](https://docs.amplify.aws/cli/)\
  - [Amplify Libraries](https://docs.amplify.aws/lib/q/platform/js/)
  - [Amplify Integration](https://docs.amplify.aws/start/q/integration/react/)
  - [React Query](https://react-query.tanstack.com/overview)
  - [Material UI](https://mui.com/)
  - [React Data Grid MUI](https://mui.com/x/react-data-grid/)
  - [Next js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Lodash](https://lodash.com/docs/4.17.15)