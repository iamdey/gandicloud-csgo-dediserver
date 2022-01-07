#!/usr/bin/env bash

set -o allexport
[[ -f .env ]] && source .env
set +o allexport

echo 'Please enter your GOStack Password: (same password as your gandi v5 account) '
read -sr  OS_PASSWORD_INPUT
export OS_PASSWORD="$OS_PASSWORD_INPUT"
