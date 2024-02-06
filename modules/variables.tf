variable "aws_profile" {
  description = "Profile set of your AWS account"
  type        = string
  default     = "default"
}

variable "domain" {
  description = "Set root domain"
  type        = string
  default     = ""
}

variable "file_types" {
  description = "Map from file suffixes, which must begin with a period and contain no periods, to the corresponding Content-Type values."
  type        = map(string)
  default = {
    ".txt"    = "text/plain; charset=utf-8"
    ".html"   = "text/html; charset=utf-8"
    ".htm"    = "text/html; charset=utf-8"
    ".xhtml"  = "application/xhtml+xml"
    ".css"    = "text/css; charset=utf-8"
    ".js"     = "application/javascript"
    ".xml"    = "application/xml"
    ".json"   = "application/json"
    ".jsonld" = "application/ld+json"
    ".gif"    = "image/gif"
    ".jpeg"   = "image/jpeg"
    ".jpg"    = "image/jpeg"
    ".png"    = "image/png"
    ".svg"    = "image/svg+xml"
    ".webp"   = "image/webp"
    ".weba"   = "audio/webm"
    ".webm"   = "video/webm"
    ".3gp"    = "video/3gpp"
    ".3g2"    = "video/3gpp2"
    ".pdf"    = "application/pdf"
    ".swf"    = "application/x-shockwave-flash"
    ".atom"   = "application/atom+xml"
    ".rss"    = "application/rss+xml"
    ".ico"    = "image/vnd.microsoft.icon"
    ".jar"    = "application/java-archive"
    ".ttf"    = "font/ttf"
    ".otf"    = "font/otf"
    ".eot"    = "application/vnd.ms-fontobject"
    ".woff"   = "font/woff"
    ".woff2"  = "font/woff2"
  }
}

variable "default_file_type" {
  description = "The Content-Type value to use for any files that don't match one of the suffixes given in file_types."
  type        = string
  default     = "application/octet-stream"
}

variable "tags" {
  description = "Define tags to set in resources"
  type        = map(string)
  default     = {}
}

variable "default_root_index_file" {
  description = "Default root index file to resources"
  type        = string
  default     = "index.html"
}

variable "subdomains" {
  description = "List contains subdomains"
  type        = list(string)
  default     = []
}

variable "application_name" {
  description = "Define application name to set default resources"
  type        = string
  default     = "default"
}

variable "website_path" {
  description = "Website path to project to uploads files"
  type        = string
  default     = ""
}