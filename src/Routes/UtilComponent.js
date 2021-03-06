import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToastContainer from "../components/common/ToastContainer";
import { useHistory } from "react-router";
import SiteAlert from "../components/common/SiteAlert";
import { showWarningAlert } from "../redux/action/alertActions";
const UtilComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isExpired = useSelector((state) => state.user.hasSubscriptionExpired);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isExpired && isLogged) {
      history.push("/expired");
    }
  }, [isExpired, isLogged]);

  window.alert = (data) => dispatch(showWarningAlert(data));
  return (
    <React.Fragment>
      <ToastContainer />
      <SiteAlert />
    </React.Fragment>
  );
};

export default UtilComponent;
