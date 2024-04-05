# Please do not change the contents of this file

terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version  = "~> 5.0"
        }
    }

    backend "s3" {
        encrypt = true # must always be encrypted
        bucket  = "fpcc-tf-state-ca-central-1" # state bucket name - non sensitive
        dynamodb_table = "fpcc-tf-state-lock-ca-central-1" # state lock table name - non sensitive
        key = "FirstVoices/fv-apps/fvapps_terraform-preprod.tfstate" # # state bucket's item's name - non sensitive
        region = "ca-central-1"
    }
}
