import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state?.userReducer?.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      navigate(location?.state?.from || "/");
    }
  }, [location?.state?.from, navigate, user]);

  return children;
};

export default AdminRoute;
