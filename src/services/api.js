const PORT = 3003;
const PRODUCTION_API = "https://procurement-app-back.herokuapp.com/api";
const DEVELOPMENT_API = `http://localhost:${PORT}/api`;

console.log("env", process.env.NODE_ENV);

export const api =
  process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;

//"https://procurement-app-back.herokuapp.com/api";
//`http://localhost:${port}/api`
