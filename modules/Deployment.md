Purpose of this: This describes the deployment set needed for FV apps.
Contents:
    1. Deployment architecture.
    2. Caveats of Deployment.

Future additions:
    1. Deployment workflows for this repository.


Deployment architecture:
![Alt text](fv-apps-deployment.jpg?raw=true "AWS deployment for FV apps")


Caveats for this Deployment:
1. It is possible to see some 403 post addition of a new subdomain as we renew the SSL cert associated with the Cloudfront distribution. It can last for 2-3 mins post deployment. Refreshing the page once would fix that.