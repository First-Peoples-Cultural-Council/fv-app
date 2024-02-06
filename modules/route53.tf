resource "aws_route53_record" "zone_record" {
  zone_id = data.aws_route53_zone.fv-apps-hosted-zone.zone_id
  name    = "smalgyax.firstvoicesapp.com"
  type    = "A"
  alias {
    name                   = aws_s3_bucket_website_configuration.fv-apps_website-config.website_endpoint
    zone_id                = data.aws_route53_zone.fv-apps-hosted-zone.zone_id
    evaluate_target_health = false
  }
}

data "aws_route53_zone" "fv-apps-hosted-zone" {
  name         = "firstvoicesapp.com"
  private_zone = false
}