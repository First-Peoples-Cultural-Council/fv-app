# Fetches the DNS zone for the purchased registered domain
data "aws_route53_zone" "this" {
  count = local.has_domain ? 1 : 0

  name = "${var.domain}."
}

# Creates a Route53 record for the base domain 
resource "aws_route53_record" "website" {
  count = local.has_domain ? 1 : 0

  name    = local.domain     # Must be unique identifier in a hosted zone
  type    = "A"
  zone_id = data.aws_route53_zone.this[0].zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
  }

  depends_on = [
    aws_cloudfront_distribution.this
  ]
}

# Creates a Route53 record for each of the associated language's subdomain  
resource "aws_route53_record" "subdomain" {
  for_each = toset(local.subdomains)   # Must be unique identifier across deployments in a hosted zone

  name    = each.key
  type    = "CNAME"
  zone_id = data.aws_route53_zone.this[0].zone_id
  ttl     = 300

  records = ["${aws_cloudfront_distribution.this.domain_name}"]
}

# Creates a Route53 record mapping with the public certificate domain validation 
resource "aws_route53_record" "cert_validation" {
  provider = aws.ca-central-1

  for_each = local.has_domain ? {
    for dvo in aws_acm_certificate.this[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value                    # Must be unique record within a record
      type   = dvo.resource_record_type
    }
  } : {}

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.this[0].zone_id
}