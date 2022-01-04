#!/usr/bin/env bash

set -ev

./csgoserver start -console -usercon +game_type 0 +game_mode 1 +mapgroup mg_active +map de_nuke exec compet.cfg
