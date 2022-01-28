#!/usr/bin/env bash

set -o allexport
[[ -f config/main.env ]] && source main.env
set +o allexport

echo 'Please enter your GOStack Password: (same password as your gandi v5 account) '
read -sr  OS_PASSWORD_INPUT
export OS_PASSWORD="$OS_PASSWORD_INPUT"
