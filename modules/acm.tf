# Creates a public certificate to be attached to the app service domain.
resource "aws_acm_certificate" "this" {
  count = local.has_domain ? 1 : 0

  provider = aws.us-east-1                  # Certificates to be mapped to Cloudfront must be in us-east-1

  domain_name               = local.domain  # Must be unique identifier across deployments
  validation_method         = "DNS"
  subject_alternative_names = local.subdomains

  lifecycle {
    create_before_destroy = true
  }
}

# Adds certificate validation for each associated subdomains
resource "aws_acm_certificate_validation" "this" {
  count = local.has_domain ? 1 : 0

  provider = aws.us-east-1           # Certificate validations to be mapped to Cloudfront must be in us-east-1

  certificate_arn         = aws_acm_certificate.this[0].arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn] # Must be unique identifier across deployments
}