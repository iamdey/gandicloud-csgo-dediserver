#!/usr/bin/env bash

set -e

FLAVOR="1069bcb0-c1e0-40cd-abb9-b1bad020ddcb" # V-R2
IMAGE="1b82f155-164e-433c-b7aa-b8b351a3409a" # Debian 11 Bullseye
VOLUME_SIZE=50 # Size in GB (csgo server files: 30Go - 2022-01-06)

# TODO: refactor in .env or config
HOSTNAME="CSGO-server"

echo "Gandi vm creation"
echo ""
echo "  You need to create a V-R1 vps server."
echo "  This can be done manually, please visit https://admin.gandi.net/gostack/billing/account"
echo "  Then the server will be managed via openstack client."
echo ""
echo "  Once done, fill the configuration in .env by copying .env.example"
echo ""
echo "  [pre-requisite] openstack installation check"

if [ ! command -v openstack &> /dev/null ]; then
    echo ""
    echo "ERROR: openstack could not be found; please install and restart"
    echo ""
    echo "install using pip: `pip3 install openstackclient` cf. https://docs.gandi.net/fr/vps/vps_api/index.html"
    exit 1
fi

source bin/read-config.sh

echo "  [pre-requisite] openstack configuration check"
if [ -z ${OS_PASSWORD+x} ]; then
  echo "  Openstack configuration is not set. Please run: source bin/read-config.sh"
  exit 1
fi


echo ""
echo "  The next command will display images available via openstack and confirm it's well configured"
echo ""

openstack image list

echo ""
echo "  Server creation"
echo ""

set -v

openstack server create --flavor ${FLAVOR} --image ${IMAGE} --boot-from-volume ${VOLUME_SIZE} --network public --key-name "${SSH_PUB_KEY_NAME}" ${HOSTNAME}

openstack server list

set +v

echo ""
echo "  Wait for your server to be active."
echo "  Then run:"
echo "  bin/install-server.sh"
