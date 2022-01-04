#!/usr/bin/env bash

IP=

scp host/* root@${IP}:/root/

ssh root@${IP} "/root/install-host.sh"
