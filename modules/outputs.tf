#Returns the accessible URL of the deployed static website
output "website-url" {
  value = local.has_domain ? "https://${local.domain}" : "https://${aws_cloudfront_distribution.this.domain_name}"
}