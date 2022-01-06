# gandicloud-csgo-dediserver

Start a csgo dedicated server on a GandiCloud vps (openstack) server.

This project is based on gandicloud vps https://docs.gandi.net/fr/vps/vps_api/index.html.  
Internally it uses [linuxgsm](https://linuxgsm.com/servers/csgoserver/) to install and manage the csgo server.

**⚠️ Running the `bin/create-gandi-vm.sh` script will use your Gandi account and use your prepaid account to pay the server.**

## Usage

[pre-requisite] install `openstackclient` cf. https://docs.gandi.net/fr/vps/vps_api/index.html  
[pre-requisite] create a `.env` file based on `.env.example`

Run the following commands:

```bash
source bin/read-config.sh
bin/create-gandi-vm.sh
bin/install-server.sh
```

_Those scripts are still pretty raw (and I'm a frontend developper) it's obviously needs improvements._

After reading the config, you'll be able to execute common openstack commands e.g. `openstack server list`

## Manage the gandicloud server

```
openstack server start CSGO-server
openstack server stop CSGO-server
```

## Manage CSGO server

Connect:

```bash
ssh root@${IP}
```

When connected:

```bash
./start.sh
```

## TODO

* better configuration
* web based app to manage the whole server 
* better csgo server configuration: gamemode, motd, rcon …
