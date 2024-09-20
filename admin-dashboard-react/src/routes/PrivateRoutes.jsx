import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.userReducer?.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(location?.state?.from || "/login");
    }
  }, [location?.state?.from, navigate, user]);

  return children;
};

export default PrivateRoute;