import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ScheduleAction = ({ onClick }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-disabled">Schedule</Tooltip>}
    >
      <button type="button" onClick={() => onClick()} class="btn btn-circle">
        <i class="mdi mdi-calendar-text-outline text-warning h4"></i>
      </button>
    </OverlayTrigger>
  );
};

export default ScheduleAction;
