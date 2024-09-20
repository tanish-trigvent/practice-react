import axios from 'axios';

function useAuth() {
  const request = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return { request };
}
export default useAuth;
