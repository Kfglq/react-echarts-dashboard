// src/config.ts
const {
  VITE_REACT_API_PROTOCOL: protocol = "http",
  VITE_REACT_API_HOST: host = "localhost",
  VITE_REACT_API_PORT: port = 80,
  VITE_REACT_API_PREFIX: prefix = "",
} = import.meta.env;

const isStandardPort = 
  (protocol === "http" && port === 80) || 
  (protocol === "https" && port === 443);

const api = `${protocol}://${host}${isStandardPort? "" : `:${port}`}${prefix}`;

export default {
  api,
};
