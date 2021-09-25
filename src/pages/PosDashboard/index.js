import React from "react";
import { useSelector } from "react-redux";
import LoadingFullPage from "../../components/common/Loading/LoadingFullPage";
import getOrderNeccesaryData from "../../helpers/getOrderNeccesaryData";
import useFullscreenStatus from "../../hooks/useFullscreenStatus";
import BottomPortion from "./BottomPortion";
import CenterPortion from "./CenterPortion/index";

import TopPortion from "./TopPortion";

const PosDashboard = () => {
  const ready = getOrderNeccesaryData();
  const isFullScreen = useSelector((state) => state.util.isFullScreen);
  const ref = React.useRef(null);

  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(
    ref,
    isFullScreen
  );
  return ready ? (
    <div
      ref={ref}
      style={{
        height: "100%",
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TopPortion />
      <CenterPortion />
      <BottomPortion />
      {/* <CenterPortion />

      <BottomPortion /> */}
    </div>
  ) : (
    <LoadingFullPage />
  );
};

export default PosDashboard;
