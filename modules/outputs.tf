output "website-url" {
  value = local.has_domain ? "https://${var.domain}" : "https://${aws_cloudfront_distribution.this.domain_name}"
}