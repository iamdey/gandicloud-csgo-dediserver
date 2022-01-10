import { Box, Button, Heading } from 'rebass';

export default function GameServerManager() {
  return (
    <div>
      <Box mb={4}>
        <Heading>Server</Heading>
        <Box mb={2}>Game status:</Box>
        <Button>Start/Stop</Button> <Button>Restart</Button>
      </Box>
      <Box mb={4}>
        <Heading>Admin</Heading>
        <Button>Pause/Unpause</Button>
      </Box>
      <Box>
        <Heading>Config</Heading>
      </Box>
    </div>
  );
}
