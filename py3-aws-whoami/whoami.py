#!/usr/bin/env python3

import boto3

client = boto3.client('sts')

def whoami():
    response = client.get_caller_identity()
    print('+++ AWS whoami +++')
    print('User ID: %s' % response['UserId'])
    print('Account: %s' % response['Account'])
    print('ARN: %s' % response['Arn'])

if __name__ == '__main__':
    whoami()
