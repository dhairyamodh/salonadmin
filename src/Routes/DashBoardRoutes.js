import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector } from "react-redux";

import LeftSideBar from "../components/LeftSideBar/index";
import TopBar from "../components/TopBar";
import Salons from "../pages/Salons";

import SalonsBranch from "../pages/SalonsBranch";

import Users from "../pages/Users/index";
import AddUsers from "../pages/Users/Addusers";
import ManageThemes from "../pages/Settings/Themes";
import ManageSubScriptions from "../pages/Settings/Subscriptions";

import Currencies from "../pages/Settings/Currencies";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import Bookings from "../pages/Bookings";

import Customers from "../pages/Customers";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";

import Offers from "../pages/Offers";
import Deals from "../pages/Deals";

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
          <ProtectedRoute
            roles={[superadmin]}
            path="/salons"
            component={Salons}
          />
          <ProtectedRoute
            roles={[superadmin, salonadmin]}
            path="/branches"
            component={SalonsBranch}
          />

          <ProtectedRoute
            roles={[superadmin, salonadmin, branchadmin]}
            path="/employees"
            component={Users}
          />

          <ProtectedRoute
            roles={[superadmin, salonadmin]}
            path="/adduser"
            component={AddUsers}
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
            roles={[superadmin]}
            path="/currency"
            component={Currencies}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/categories"
            component={Categories}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/services"
            component={Services}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/offers"
            component={Offers}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/deals"
            component={Deals}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/bookings"
            component={Bookings}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/customers"
            component={Customers}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/expenses"
            component={Expenses}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/reports/:reportType"
            component={Reports}
          />

          {/* <ProtectedRoute
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
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DashBoardRoutes;
