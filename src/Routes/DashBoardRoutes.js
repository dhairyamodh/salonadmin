import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ManageBranches from "../pages/Branches/ManageBranches";
import ManageItemCategories from "../pages/ItemCategories/ManageCategories";
import ManageServices from "../pages/Items/ManageServices";
import ManageHotKeys from "../pages/HotKeys/ManageHotKeys";
import Currency from "../pages/Currency/index";
// import ManageCategoryTypes from "../pages/CategoryTypes/index";
import ManageExpense from "../pages/Expense/index";

import AddSalon from "../pages/Restaurant/ManageSalon";
import ManageSubScriptions from "../pages/Subscriptions/ManageSubscriptions";
import ManageThemes from "../pages/Themes/ManageThemes";
import ManageUsers from "../pages/Users/ManageUsers";
import AddModal from "../pages/Users/ManageUsers/AddModal";
import { useSelector } from "react-redux";
import OrderDashboard from "../pages/OrderDashboard";

import LeftSideBar from "../components/LeftSideBar/index";
import TopBar from "../components/TopBar";
import DashBoard from "../pages/DashBoard";
import Reports from "../pages/Reports";
import ManageExpenseTypes from "../pages/ExpenseTypes";

import OrderHistory from "../pages/OrderHistory";

import ExpiredSubscription from "../pages/ExpiredSubscription";
import Printers from "../pages/Printers";

const DashBoardRoutes = () => {
  const role = useSelector((state) => state.user.role);

  const isBranchAdmin = role === "branchadmin";
  const isBranchUser = role === "branchuser";

  const superadmin = "superadmin";
  const salonadmin = "salonadmin";
  const branchadmin = "branchadmin";
  const branchuser = "branchuser";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <div className="data-container" style={{ height: "100%" }}>
        <LeftSideBar />

        <div
          class="dashboard-container"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          {isBranchUser && <Route exact path="/" component={OrderDashboard} />}
          <ProtectedRoute
            exact
            roles={[branchadmin, branchuser]}
            path="/order"
            component={OrderDashboard}
          />
          <ProtectedRoute
            exact
            roles={[superadmin, branchadmin, salonadmin]}
            path="/"
            component={DashBoard}
          />
          <ProtectedRoute
            roles={[superadmin]}
            path="/salons"
            component={AddSalon}
          />

          <ProtectedRoute
            roles={[superadmin, salonadmin]}
            path="/branches"
            component={ManageBranches}
          />

          <ProtectedRoute
            roles={[superadmin, salonadmin, branchadmin]}
            path="/employees"
            component={ManageUsers}
          />

          <ProtectedRoute
            roles={[superadmin, salonadmin]}
            path="/adduser"
            component={AddModal}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/managethemes"
            component={ManageThemes}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/managesubscriptions"
            component={ManageSubScriptions}
          />

          <ProtectedRoute
            roles={[salonadmin, superadmin, branchadmin]}
            path="/categories"
            component={ManageItemCategories}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/services"
            component={ManageServices}
          />


          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/managehotkeys"
            component={ManageHotKeys}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/currency"
            component={Currency}
          />
          <ProtectedRoute
            roles={[superadmin]}
            path="/manageexpensetypes"
            component={ManageExpenseTypes}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin, branchuser]}
            path="/manageexpense"
            component={ManageExpense}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/orderhistory"
            component={OrderHistory}
          />

          <ProtectedRoute
            roles={[branchadmin, branchuser]}
            path="/manageprinters"
            component={Printers}
          />
          {/* 
          <ProtectedRoute
            roles={[superadmin]}
            path="/managecategorytypes"
            component={ManageCategoryTypes}
          /> */}

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/reports/:reportType"
            component={Reports}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardRoutes;
