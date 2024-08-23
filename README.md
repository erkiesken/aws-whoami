
# AWS whoami

This repository contains a _whoami_ command that checks with AWS STS [GetCallerIdentity](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetCallerIdentity.html) call your current session credentials and corresponding principle user's name and ARN.

This tool is useful to check multi-profile `~/.aws/config` file with differing (SSO) roles, and if they are picked up properly by the SDK credential loaders.

## Usage

Currently there are 4 implementations:
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html)
* Golang with [AWS SDK for Go V2](https://aws.amazon.com/sdk-for-go/) (`github.com/aws/aws-sdk-go-v2`)
* Node.js with [AWS SDK for JavaScript V2](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html) (`aws-sdk`)
* Node.js with [AWS SDK for JavaScript V3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) (`@aws-sdk/*`)
* Python3 with [boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sts.html)
* Rust with [aws-sdk-sts create](https://crates.io/crates/aws-sdk-sts)

To install all needed dependencies and run the tasks you can use [Mise](https://mise.jdx.dev/about.html) tool and run `mise install` and `mise tasks run all`.

Alternatively if you have all the dependencies installed, then you can also use [Taskfile](https://taskfile.dev) tool and run `task all`. To see all options and to run specific case use `task --list`.

Expected output is something like this:

```
## Run with Mise:
# $ mise install
# $ mise tasks run all

## Run with Taskfile:
$ task all

task: [go-whoami] go mod download
task: [go-whoami] go run .

+++ AWS whoami +++
User ID: AROAB2ND8NXUWUT8WOHGK:firstname.lastname
Account: 123456789
ARN: arn:aws:sts::123456789:assumed-role/AWSReservedSSO_ReadonlyAccess_d8cb0248fa/firstname.lastname

task: [node-aws-whoami-v2] test -d node_modules || npm install
task: [node-aws-whoami-v2] npm run whoami

> aws-whoami@1.0.0 whoami
> node --no-warnings whoami.js

+++ AWS whoami +++
Credentials type: EnvironmentCredentials
User ID: AROAB2ND8NXUWUT8WOHGK:firstname.lastname
Account: 123456789
ARN: arn:aws:sts::123456789:assumed-role/AWSReservedSSO_ReadonlyAccess_d8cb0248fa/firstname.lastname

task: [node-aws-whoami-v3] test -d node_modules || npm install
task: [node-aws-whoami-v3] npm run whoami

> aws-whoami@1.0.0 whoami
> node whoami.mjs

+++ AWS whoami +++
Credentials type: @aws-sdk/credential-provider-env
User ID: AROAB2ND8NXUWUT8WOHGK:firstname.lastname
Account: 123456789
ARN: arn:aws:sts::123456789:assumed-role/AWSReservedSSO_ReadonlyAccess_d8cb0248fa/firstname.lastname
```
