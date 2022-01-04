#!/usr/bin/env bash

set -ev

# This script is based on https://linuxgsm.com/servers/csgoserver/

echo "Install server on Debian >= 11"
echo ""
echo "  Install dependencies"
echo ""

dpkg --add-architecture i386; sudo apt update; sudo apt install curl wget file tar bzip2 gzip unzip bsdmainutils python3 util-linux ca-certificates binutils bc jq tmux netcat lib32gcc1 lib32stdc++6

echo "  add user"
echo ""

adduser csgoserver
su - csgoserver

echo "  get csgoserver"
wget -O linuxgsm.sh https://linuxgsm.sh && chmod +x linuxgsm.sh && bash linuxgsm.sh csgoserver

echo "  install csgoserver"
./csgoserver install

echo "  /!\\ GSLT configuration is not supported, the server will not be public."
