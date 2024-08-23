// Forked from:
//   https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/rustv1/examples/sts/src/bin/get-caller-identity.rs
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

use aws_sdk_sts::{config::Region, Client, Error};

// Displays the STS AssumeRole Arn.
async fn get_caller_identity(client: &Client) -> Result<(), Error> {
    let response = client.get_caller_identity().send().await?;

    println!("+++ AWS whoami +++");

    println!(
        "UserID: {}",
        response.user_id().unwrap_or_default()
    );
    println!(
        "Account: {}",
        response.account().unwrap_or_default()
    );
    println!(
        "ARN: {}",
        response.arn().unwrap_or_default()
    );

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let shared_config = aws_config::from_env().region(Region::new("eu-west-1")).load().await;
    let client = Client::new(&shared_config);
    get_caller_identity(&client).await
}
