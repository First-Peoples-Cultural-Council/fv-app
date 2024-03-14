output "website-url" {
  value = local.has_domain ? "https://${var.domain}" : "https://${aws_cloudfront_distribution.this.domain_name}"
}

output "bucket_logs" {
  value = aws_s3_bucket.logs.id
}

output "bucket_website" {
  value = aws_s3_bucket.website.id
}

output "cdn-url" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "distribution-id" {
  value = aws_cloudfront_distribution.this.id
}