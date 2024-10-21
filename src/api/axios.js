import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:8000/api";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000;
axios.defaults.headers.common["Platform"] = "web";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
