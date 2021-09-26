import React from "react";
import { Redirect, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector } from "react-redux";

import LeftSideBar from "../components/LeftSideBar/index";
import TopBar from "../components/TopBar";
import Salons from "../pages/Salons";

import SalonsBranch from "../pages/SalonsBranch";

import Employees from "../pages/Employees/index";
import AddUsers from "../pages/Employees/Addusers";
import ManageThemes from "../pages/Settings/Themes";
import ManageSubScriptions from "../pages/Settings/Subscriptions";

import Currencies from "../pages/Settings/Currencies";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import Bookings from "../pages/Bookings/index";

import Customers from "../pages/Customers";
import Users from "../pages/Users";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";

import Offers from "../pages/Offers";
import Deals from "../pages/Deals";
import PosDashboard from "../pages/PosDashboard";
import Chairs from "../pages/Chairs";

import DashBoard from "../pages/DashBoard";
import CustomerView from "../pages/CustomerView";

const DashBoardRoutes = () => {
  const role = useSelector((state) => state.user.role);

  const isBranchAdmin = role === "branchadmin";
  const isEmployee = role === "employee";

  const superadmin = "superadmin";
  const salonadmin = "salonadmin";
  const branchadmin = "branchadmin";
  const employee = "employee";
  const screenmanager = "screenmanager";
  const isScreenManager = role === screenmanager;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar isScreenManager={isScreenManager} />
      <div className="data-container" style={{ height: "100%" }}>
        {!isScreenManager && <LeftSideBar />}
        <div
          class="dashboard-container"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          {isEmployee && <Redirect to="/bookings" />}

          <ProtectedRoute
            exact
            roles={[screenmanager]}
            path="/"
            component={CustomerView}
          />
          <ProtectedRoute
            exact
            roles={[salonadmin]}
            path="/"
            component={DashBoard}
          />
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
            component={Employees}
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
            roles={[salonadmin, employee]}
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
            path="/users"
            component={Users}
          />
          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/expenses"
            component={Expenses}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/chairs"
            component={Chairs}
          />

          <ProtectedRoute
            roles={[salonadmin, branchadmin]}
            path="/reports/:reportType"
            component={Reports}
          />
          <ProtectedRoute
            roles={[salonadmin, employee]}
            path="/pos"
            component={PosDashboard}
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
