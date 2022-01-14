import { Box, Button, Heading } from 'rebass';

export default function GameServerManager() {
  const ip = 'x.x.x.x';
  const pass = 'fixme';

  return (
    <div>
      <Box mb={4}>
        <Heading>Server</Heading>
        <Box mb={2}>Game status:</Box>
        <Button>Start/Stop</Button> <Button>Restart</Button>
        <p>Connect to the server</p>
        <code>
          connect {ip}; password {pass}
        </code>
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
