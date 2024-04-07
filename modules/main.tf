locals {
  has_domain          = var.domain != ""
  local_env_name      = var.env_name == "prod" ? "" : "${var.env_name}."
  domain              = "${local.local_env_name}${var.domain}"
  subdomains          = [for s in var.subdomains : var.env_name == "prod" ? "${s}${local.domain}" :"${s}.${local.domain}" ]
  cloudfront_aliases  = concat([local.domain], local.subdomains)
  application_name    = "${local.local_env_name}${var.application_name}"
  for_dynamic_blocks  = var.env_name == "prod" ? [var.env_name] : []
  resource_idenfifier = var.env_name == "prod" ? "" : var.env_name
}
