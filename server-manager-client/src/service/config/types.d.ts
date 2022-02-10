export interface ConfigPayload {
  serverName: string;
  ip: string;
  game: {
    rcon: string;
    pass: string;
    port: string;
  };
}
