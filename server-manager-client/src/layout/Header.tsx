import * as React from 'react';
import { useQuery } from 'react-query';
import { Heading } from 'rebass';

interface Config {
  serverName: string;
}

export default function Header() {
  const { data: config } = useQuery<Config>('config', async () => {
    const response = await fetch('/api/config');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  return (
    <header>
      <Heading as="h1" mb={4}>
        Manage {config?.serverName || 'CSGO'} server
      </Heading>
    </header>
  );
}
