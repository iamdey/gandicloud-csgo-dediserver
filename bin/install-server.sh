#!/usr/bin/env bash

if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ -z ${IP} ]; then
  echo "  IP of the server not set. Please install it and fill it in .env"
  exit 1
fi

set -ev

scp -p host/* debian@${IP}:/home/debian/

ssh debian@${IP} "/home/debian/install-host.sh"
