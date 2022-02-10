import * as React from 'react';
import { useQuery } from 'react-query';
import { Heading } from 'rebass';
import { getConfig } from '../service/config/query';
import { ConfigPayload } from '../service/config/types';

export default function Header() {
  const { data: config } = useQuery<ConfigPayload>('config', getConfig);
  return (
    <header>
      <Heading as="h1" mb={4}>
        Manage {config?.serverName || 'CSGO'} server
      </Heading>
    </header>
  );
}
