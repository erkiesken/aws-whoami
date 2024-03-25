package main

import (
	"context"
	"fmt"
	"log"

	_ "github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sts"
)

func main() {
	fmt.Println("+++ AWS whoami +++")

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	client := sts.NewFromConfig(cfg)

	input := sts.GetCallerIdentityInput{}
	output, err := client.GetCallerIdentity(context.TODO(), &input)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("User ID: %s\n", *output.UserId)
	fmt.Printf("Account: %s\n", *output.Account)
	fmt.Printf("ARN: %s\n", *output.Arn)
}
