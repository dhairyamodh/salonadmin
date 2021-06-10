import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const EditCommonAction = ({ onClick }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-disabled">Edit</Tooltip>
      }
    >
      <button type="button" class="btn btn-circle" onClick={() => onClick()}>
        <i class="mdi mdi-square-edit-outline text-primary h4"></i>
      </button>
    </OverlayTrigger>
  );
};

export default EditCommonAction;
