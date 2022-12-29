declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly TOKEN: string;
      readonly CLIENT_ID: string;
      readonly GUILD_ID: string;
    }
  }
}

export {};
