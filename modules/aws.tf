data "aws_caller_identity" "current" {}


provider "aws" {
  region  = "ca-central-1"
  profile = var.aws_profile
  alias   = "ca-central-1"
}