#!/usr/bin/env bash

if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

echo 'Please enter your GOStack Password: (same password as your gandi v5 account) '
read -sr  OS_PASSWORD_INPUT
export OS_PASSWORD="$OS_PASSWORD_INPUT"
