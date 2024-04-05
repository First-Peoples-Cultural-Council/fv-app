resource "aws_cloudfront_origin_access_identity" "this" {
  comment = var.application_name
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Managed by Terraform"
  default_root_object = var.default_root_index_file
  aliases             = local.has_domain ? local.cloudfront_aliases : []

  dynamic "logging_config" {
    for_each = for_dynamic_blocks
    content{
      bucket          = aws_s3_bucket.logs[0].bucket_domain_name
      prefix          = "cnd/"
      include_cookies = true
    }
  }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET", "OPTIONS"]
    cached_methods         = ["HEAD", "GET"]
    target_origin_id       = aws_s3_bucket.website.bucket_regional_domain_name
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600  # 1h
    max_ttl                = 86400 # 1d

    forwarded_values {
      query_string = false
      headers      = ["Origin"]
      cookies {
        forward = "none"
      }
    }
  }

  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.website.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  dynamic "viewer_certificate" {
    for_each = local.has_domain ? [] : [0]
    content {
      cloudfront_default_certificate = true
    }
  }

  dynamic "viewer_certificate" {
    for_each = local.has_domain ? [0] : []
    content {
      acm_certificate_arn = aws_acm_certificate.this[0].arn
      ssl_support_method  = "sni-only"
    }
  }

  tags = var.tags

  depends_on = [
    aws_s3_bucket.website,
    aws_s3_bucket.logs,
    aws_acm_certificate.this,
  ]
}
