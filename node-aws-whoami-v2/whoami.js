
const AWS = require("aws-sdk");
const chain = new AWS.CredentialProviderChain();

function getCredsType(creds) {
    const types = [
		"EnvironmentCredentials",
		"SsoCredentials",
		"SharedIniFileCredentials",
		"ECSCredentials",
		"ProcessCredentials",
		"TokenFileWebIdentityCredentials",
		"EC2MetadataCredentials",
    ];

    for (const type of types) {
        if (creds instanceof AWS[type]) {
            return type;
        }
    }
    return "Unknown";
}

chain.resolve((err, creds) => {
    console.log("+++ AWS whoami +++");

	if (err) {
		console.error("Failed to get credentials:", err);
        process.exit(1);
	}
	console.log(`Credentials type: ${getCredsType(creds)}`);

    const sts = new AWS.STS();
    sts.getCallerIdentity({}, (err, response) => {
        if (err) {
            console.error("Failed to get identity:", err);
			process.exit(1);
        }
		console.log(`User ID: ${response.UserId}`);
		console.log(`Account: ${response.Account}`);
		console.log(`ARN: ${response.Arn}`);
    });
});
