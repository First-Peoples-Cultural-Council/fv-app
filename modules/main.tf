resource "aws_s3_bucket" "fv-apps" {
  bucket = "fv-app-build-files"

  tags = {
    Name        = "fv-app-build-files"
    Environment = "Prod"
  }
}

resource "aws_s3_bucket_acl" "fv-apps_acl" {
  bucket = aws_s3_bucket.fv-apps.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "fv-apps_versioning" {
  bucket = aws_s3_bucket.fv-apps.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "fv-apps_versioning-bucket-config" {
  # Must have bucket versioning enabled first
  depends_on = [aws_s3_bucket_versioning.fv-apps_versioning]

  bucket = aws_s3_bucket.fv-apps.id

  rule {
    id = "config"

    filter {
      prefix = "config/"
    }

    noncurrent_version_expiration {
      noncurrent_days = 90
    }

    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }

    noncurrent_version_transition {
      noncurrent_days = 60
      storage_class   = "GLACIER"
    }

    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "fv-apps_encryption" {
  bucket = aws_s3_bucket.fv-apps.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "fv-apps_website-config" {
  bucket = aws_s3_bucket.fv-apps.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "fv-apps_bucket-policy" {
  bucket = aws_s3_bucket.fv-apps.id
  policy = data.aws_iam_policy_document.allow_access.json
}


data "aws_iam_policy_document" "allow_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["${data.aws_caller_identity.current.account_id}"]
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.fv-apps.arn,
      "${aws_s3_bucket.fv-apps.arn}/*", 
    ]
  }
}