import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ViewCommonAction = ({ onClick }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-disabled">View</Tooltip>}
    >
      <button type="button" class="btn btn-circle" onClick={() => onClick()}>
        <i class="mdi mdi-eye-outline text-warning h4"></i>
      </button>
    </OverlayTrigger>
  );
};

export default ViewCommonAction;
