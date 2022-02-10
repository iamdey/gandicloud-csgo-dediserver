#!/usr/bin/env bash

set -o allexport
[[ -f config/openstack.env ]] && source config/openstack.env
set +o allexport

if [ -z ${OS_PASSWORD} ]; then
  echo 'Please enter your GOStack Password: (same password as your gandi v5 account) '
  read -sr  OS_PASSWORD_INPUT
  export OS_PASSWORD="$OS_PASSWORD_INPUT"
fi
