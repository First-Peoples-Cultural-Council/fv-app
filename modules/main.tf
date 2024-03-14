locals {
  has_domain         = var.domain != ""
  subdomains         = [for s in var.subdomains : "${s}.${var.domain}"]
  cloudfront_aliases = concat([var.domain], local.subdomains)
}
