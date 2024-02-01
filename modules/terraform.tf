terraform {
    backend "s3" {
        encrypt = true
        bucket  = ""
        dynamodb_table = ""
        key = ""
        region = ""
    }
}

provider "aws" {
  region = ""
}
