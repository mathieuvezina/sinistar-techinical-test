interface Config {
  GOOGLE_MAPS_KEY_API: string;
}

const config: Config = {
  GOOGLE_MAPS_KEY_API: process.env.REACT_APP_GOOGLE_API_MAPS_KEY ?? "",
};

export default config;
