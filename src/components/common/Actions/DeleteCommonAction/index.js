import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DeleteCommonAction = ({ onClick }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-disabled">Delete</Tooltip>
      }
    >
      <button type="button" onClick={() => onClick()} class="btn btn-circle">
        <i class="mdi mdi-trash-can-outline text-danger h4"></i>
      </button>
    </OverlayTrigger>
  );
};

export default DeleteCommonAction;
