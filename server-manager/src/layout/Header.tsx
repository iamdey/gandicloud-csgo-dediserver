import React from 'react';
import { Heading } from 'rebass';

export default function Header() {
  return (
    <header>
      <Heading as="h1" mb={4}>
        Manage CSGO server
      </Heading>
    </header>
  );
}
