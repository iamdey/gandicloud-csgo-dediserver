# gandicloud-csgo-dediserver

Start a csgo dedicated server on a GandiCloud vps (openstack) server.

This project is based on gandicloud vps
https://docs.gandi.net/fr/vps/vps_api/index.html. It manage the server using
[openstack api](https://docs.gandi.net/fr/vps/vps_api/index.html). Internally it
uses [linuxgsm](https://linuxgsm.com/servers/csgoserver/) to install and manage
the csgo server.

_(Other alternatives to linuxgsm looks very good to like
[docker based csgo-sever-launcher](https://github.com/crazy-max/csgo-server-launcher).
More details on
[valve's wiki](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers))_

**⚠️ Running the `bin/create-gandi-vm.sh` script will use your Gandi account and
use your prepaid account to pay the server.**

## Usage

[pre-requisite] install `openstackclient` cf.
https://docs.gandi.net/fr/vps/vps_api/index.html [pre-requisite] create a `.env`
file based on `.env.example`

Run the following commands:

```bash
source bin/read-config.sh
bin/create-gandi-vm.sh
bin/install-server.sh
```

_Those scripts are still pretty raw (and I'm a frontend developper) it's
obviously needs improvements._

After reading the config, you'll be able to execute common openstack commands
e.g. `openstack server list`

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

- [ ] post-install script: copy csgo-server configuration
- [ ] better configuration
- [ ] web based app to manage the whole server
- [ ] better csgo server configuration:
      [gamemode, switch to short match](https://developer.valvesoftware.com/wiki/CS:GO_Game_Mode_Commands),
      motd, rcon …
