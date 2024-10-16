import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function useAuth() {
  const request = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return { request };
}
export default useAuth;
