import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

function providerLogger() {
    // remember last logging module name
    let last = "";
    return {
        debug: (str) => last = str,
        getProvider: () => last,
    };
}

async function whoami() {
    const logger = providerLogger();
    const client = new STSClient({
        credentials: fromNodeProviderChain({ logger }),
    });
    const command = new GetCallerIdentityCommand({});
    const response = await client.send(command);
    console.log("+++ AWS whoami +++");
    console.log(`Credentials type: ${logger.getProvider()}`);
    console.log(`User ID: ${response.UserId}`);
    console.log(`Account: ${response.Account}`);
    console.log(`ARN: ${response.Arn}`);
};

await whoami();
