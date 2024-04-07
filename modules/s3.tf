# Creates bucket policy for the S3 bucket which will host the static website
resource "aws_s3_bucket_policy" "main_bucket_policy" {
  bucket = aws_s3_bucket.website.id         # Must be a unique bucket id for this resource to be deployment agnostic
  policy = data.aws_iam_policy_document.s3_allow_access_from_cf.json
}

# Drafts AWS provided S3 bucket policy which allowed read access to associated S3 buckets
data "aws_iam_policy_document" "s3_allow_access_from_cf" {
  version = "2008-10-17"
  statement {
    sid = "PublicReadForGetBucketObjects"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.this.id}"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]  # Must be a unique bucket arn for this resource to be deployment agnostic
  }
}

# Creates a S3 bucket to collect the logs for static website usage
resource "aws_s3_bucket" "logs" {
  count         = (var.env_name == "prod") ? 1 : 0        # This bucket is only created for production
  bucket        = "${local.application_name}-logs"        # Must be a unique bucket name for this resource to be deployment agnostic
  force_destroy = !local.has_domain

  tags = var.tags
}

# Creates a S3 bucket access control list for the logs bucket
resource "aws_s3_bucket_acl" "acl_logs" {
  count  = (var.env_name == "prod") ? 1 : 0
  bucket = aws_s3_bucket.logs[0].id    # Must be a unique bucket id for this resource to be deployment agnostic
  acl    = "log-delivery-write"

  depends_on = [ aws_s3_bucket_ownership_controls.s3_logs_bucket_acl_ownership ]
}

# Creates a S3 bucket ownwership policy for the logs bucket
resource "aws_s3_bucket_ownership_controls" "s3_logs_bucket_acl_ownership" {
  count  = (var.env_name == "prod") ? 1 : 0
  bucket = aws_s3_bucket.logs[0].id       # Must be a unique bucket id for this resource to be deployment agnostic
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Creates the S3 bucket that hosts the static website
resource "aws_s3_bucket" "website" {
  bucket        = local.application_name     # Must be a unique bucket name for this resource to be deployment agnostic
  force_destroy = !local.has_domain

  tags = var.tags
}

 # Creates a public block policy for the website S3 bucket
resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.website.id    # Must be a unique bucket id for this resource to be deployment agnostic

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

 # Sets up a bucket versioning policy for the website S3 bucket
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.website.id  # Must be a unique bucket id for this resource to be deployment agnostic
  versioning_configuration {
    status = "Enabled"
  }
}

# Creates a S3 bucket access control list for the website bucket
resource "aws_s3_bucket_acl" "acl_website" {
  bucket = aws_s3_bucket.website.id     # Must be a unique bucket id for this resource to be deployment agnostic
  acl    = "private"

   depends_on = [ aws_s3_bucket_ownership_controls.s3_website_bucket_acl_ownership ]
}

# Creates a S3 bucket ownwership policy for the website bucket
resource "aws_s3_bucket_ownership_controls" "s3_website_bucket_acl_ownership" {
  bucket = aws_s3_bucket.website.id      # Must be a unique bucket id for this resource to be deployment agnostic
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Creates a S3 bucket index and error file configuration policy for the static website in the bucket
resource "aws_s3_bucket_website_configuration" "bucket_website_configuration" {
  bucket = aws_s3_bucket.website.bucket    # Must be a unique bucket name for this resource to be deployment agnostic

  index_document {
    suffix = var.default_root_index_file
  }

  error_document {
    key = var.default_root_index_file
  }
}

# Attached the logs bucket to collect event logs for the website bucket
resource "aws_s3_bucket_logging" "logging" {
  count  = (var.env_name == "prod") ? 1 : 0
  bucket = aws_s3_bucket.website.id         # Must be a unique bucket name for this resource to be deployment agnostic

  target_bucket = aws_s3_bucket.logs[0].id
  target_prefix = "access/"
}


# Creates bucket object resource mapping for each file/directory inside the bucket
resource "aws_s3_object" "this" {
  for_each = "${var.website_path}" != "" ? fileset("${var.website_path}", "**") : []

  bucket       = aws_s3_bucket.website.id  # Must be a unique bucket name for this resource to be deployment agnostic
  key          = each.value
  source       = "${var.website_path}/${each.value}"
  etag         = filemd5("${var.website_path}/${each.value}")
  content_type = lookup(var.file_types, regex("\\.[^\\.]+\\z", "${var.website_path}/${each.value}"), var.default_file_type)
}