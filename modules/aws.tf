data "aws_caller_identity" "current" {}


provider "aws" {
  region  = "ca-central-1"
}

provider "aws" {
  region  = "ca-central-1"
   alias  = "ca-central-1"
}