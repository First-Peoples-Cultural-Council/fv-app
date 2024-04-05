locals {
  has_domain         = var.domain != ""
  subdomains         = [for s in var.subdomains : "${s}.${local.local_env_name}${var.domain}"]
  cloudfront_aliases = concat([var.domain], local.subdomains)
  local_env_name     = var.env_name == "prod" ? "" : "${var.env_name}."
  for_dynamic_blocks = var.env_name == "prod" ? [] : [local.local_env_name]
}
