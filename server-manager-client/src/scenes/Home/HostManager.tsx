import * as react from 'react';
import { Box, Button } from 'rebass';
import GameServerManager from './GameServerManeger';

export default function HostManager() {
  return (
    <div>
      <Box mb={4}>
        <Box mb={2}>Host status: </Box>
        <Box>
          <Button>Start/Stop</Button>
        </Box>
      </Box>
      <GameServerManager />
    </div>
  );
}
