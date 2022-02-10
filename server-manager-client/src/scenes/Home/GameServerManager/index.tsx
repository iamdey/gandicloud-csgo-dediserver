import { Box, Button, Heading } from 'rebass';
import { ConfigPayload } from '../../../service/config/types';

interface Props {
  config: ConfigPayload;
}
export default function GameServerManager({ config }: Props) {
  return (
    <div>
      <Box mb={4}>
        <Heading>Server</Heading>
        {/* <Box mb={2}>Game status:</Box>
        <Button>Start/Stop</Button> <Button>Restart</Button> */}
        <p>Connect to the server</p>
        <code>
          connect {config.ip}:{config.game.port}; password {config.game.pass}
        </code>
      </Box>
      {/* <Box mb={4}>
        <Heading>Admin</Heading>
        <Button>Pause/Unpause</Button>
      </Box>
      <Box>
        <Heading>Config</Heading>
      </Box> */}
    </div>
  );
}
