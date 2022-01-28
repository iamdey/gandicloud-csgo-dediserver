import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Box, Button } from 'rebass';
import Spinner from '../../components/Spinner';
// import GameServerManager from './GameServerManeger';

interface HostState {
  state: 'alive' | 'offline';
}
function HostStatusIcon({ hostState }: { hostState?: HostState }) {
  switch (hostState?.state) {
    case 'alive':
      return <>🟢 Active</>;
    case 'offline':
      return <>🟥 Offline</>;
    default:
      return null;
  }
}

function getButtonText({ hostState }: { hostState?: HostState }) {
  switch (hostState?.state) {
    case 'alive':
      return 'Stop';
    case 'offline':
      return 'Start';
    default:
      return 'Start / Stop';
  }
}
type ChangingState = 'none' | 'starting' | 'stoping';

export default function HostManager() {
  const [changingState, setChangingState] =
    React.useState<ChangingState>('none');
  const { data: hostState } = useQuery<HostState>('hostState', async () => {
    const response = await fetch('/api/host/state');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const { mutateAsync: mutate } = useMutation<
    { message: 'OK' },
    any,
    'boot' | 'shutdown'
  >(
    // @ts-ignore pbm with `useMutation` polymorph declaration?
    async (action) => {
      const response = await fetch('/api/host/state', {
        method: 'post',
        body: JSON.stringify({ action }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  );

  React.useEffect(() => {
    if (
      (hostState?.state === 'offline' && changingState === 'stoping') ||
      (hostState?.state === 'alive' && changingState === 'starting')
    ) {
      setChangingState('none');
    }
  }, [hostState, changingState, setChangingState]);

  async function toggleStartHost() {
    if (changingState !== 'none') {
      return;
    }

    const action = hostState?.state === 'alive' ? 'shutdown' : 'boot';
    try {
      const nextChangingState = action === 'boot' ? 'starting' : 'stoping';
      setChangingState(nextChangingState);
      const res = await mutate(action);

      console.log({ res });
    } catch (err) {
      console.error({ err });
      setChangingState('none');
    }
  }

  return (
    <div>
      <Box mb={4}>
        <Box mb={2}>
          Host status: <HostStatusIcon hostState={hostState} />
        </Box>
        <Box>
          <Button
            variant="primary"
            onClick={toggleStartHost}
            disabled={hostState === undefined || changingState !== 'none'}
          >
            {changingState !== 'none' && (
              <>
                <Spinner />{' '}
              </>
            )}
            {getButtonText({ hostState })}
          </Button>
        </Box>
      </Box>
      {/* <GameServerManager /> */}
    </div>
  );
}
