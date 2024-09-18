import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000;
axios.defaults.headers.common["Platform"] = "web";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
