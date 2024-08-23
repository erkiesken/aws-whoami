#!/usr/bin/env bash

test -d target || cargo build

./target/debug/rust-aws-whoami
