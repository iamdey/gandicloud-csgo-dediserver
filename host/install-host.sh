#!/usr/bin/env bash

set -ev

# This script is based on https://linuxgsm.com/servers/csgoserver/

echo "Install server on Debian >= 11"
echo ""
echo "  Install dependencies"
echo ""

sudo dpkg --add-architecture i386
sudo apt update
sudo apt install curl wget file tar bzip2 gzip unzip bsdmainutils python3 util-linux ca-certificates binutils bc jq tmux netcat lib32gcc-s1 lib32stdc++6 libsdl2-2.0-0:i386

echo "  Install as a service"
echo ""

sudo cp templates/csgoserver.service /etc/systemd/system/
sudo systemctl daemon-reload
systemctl enable csgoserver

echo "  add user"
echo ""

sudo useradd csgoserver
sudo su - csgoserver

echo "  get csgoserver"
wget -O linuxgsm.sh https://linuxgsm.sh && chmod +x linuxgsm.sh && bash linuxgsm.sh csgoserver

echo "  install csgoserver"
# Installing server on the default conf 1CPU 2Ghz - 2Go RAM is slow
# even over scalled, verifying files is slow
./csgoserver install

echo "  /!\\ GSLT configuration is not supported, it must be set manually."
