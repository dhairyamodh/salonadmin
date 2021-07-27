import React from "react";

const AddCommonAction = ({ onClick, title }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      class="btn btn-gradient-primary waves-effect waves-light"
    >
      <i class="mdi mdi-view-list mr-2"></i> {title}
    </button>
  );
};

export default AddCommonAction;