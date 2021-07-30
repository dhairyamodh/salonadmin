import React from "react";
import DashboardCreator from "./DashboardCreator";
import { useDispatch, useSelector } from "react-redux";
import reportData from "./ReportLayoutData";
import { Card } from "react-bootstrap";
import { getDashboard } from "../../redux/action/dashboardActions";
const Reports = () => {
  const { role, salonId, branchId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.dashboard);

  const CurrentReport = reportData[role];
  const CurrentReportData = CurrentReport?.dashboardData;
  // const dataVariable = CurrentReportData.dataVariable || "data";

  const intialFunction = () => {
    dispatch(
      getDashboard({
        role: role,
        salonId,
        branchId,
      })
    );
  };

  return (
    <div>
      {CurrentReportData ? (
        <DashboardCreator
          reportInfo={CurrentReportData}
          reportData={data}
          initialEffectFunction={() => intialFunction()}
        />
      ) : (
        <Card>
          <Card.Body>No Data Avaialble</Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Reports;
