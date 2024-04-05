#!/usr/bin/env bash

aws sts get-caller-identity | \
    jq -r '"+++ AWS whoami +++\nUser ID: "+.UserId+"\nAccount: "+.Account+"\nARN: "+.Arn+"\n"'
