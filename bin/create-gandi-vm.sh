#!/usr/bin/env bash

set -e

echo "Gandi vm creation"
echo ""
echo "  You need to create a V-R1 vps server."
echo "  This can be done manually, please visit https://admin.gandi.net/gostack/billing/account"
echo "  Then the server will be managed via openstack client."
echo ""
echo "  Once done, fill the configuration in config/clouds.yaml by copying config/clouds.yaml.template"
echo ""
echo "  [pre-requisite] openstack installation check"

if ! command -v openstack &> /dev/null
then
    echo ""
    echo "ERROR: openstack could not be found; please install and restart"
    echo ""
    echo "install using pip: `pip3 install openstackclient` cf. https://docs.gandi.net/fr/vps/vps_api/index.html"
    exit 1
fi

echo "  [pre-requisite] openstack configuration check"
if [[  ! -f "config/clouds.yaml" ]]; then
  echo ""
  echo "ERROR: file config/clouds.yaml is missing; please create and restart"
  exit 1
fi
