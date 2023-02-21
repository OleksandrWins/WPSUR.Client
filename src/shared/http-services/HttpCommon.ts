import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
});

export const UnauthorizedHeader = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});
