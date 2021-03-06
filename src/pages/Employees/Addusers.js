import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalons } from "../../redux/action/salonActions";
import { getAllBranches } from "../../redux/action/branchActions";
import { createUser } from "../../redux/action/employeeActions";
import { showSnackBar } from "../../redux/action/snackActions";
import { mobileRegex, emailRegex } from "../../helpers/regex";
import getErrorMessage from "../../helpers/getErrorMessage";
import TableTitle from "../../components/common/SmartTable/TableTitle";
import { getAllUserGrpups } from "../../redux/action/userGroupActions";

const AddModal = ({ open, onClose, title }) => {
  const { register, watch, errors, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const {
    salons,
    branches,

    allUserGroup: salonUserGroup,
  } = useSelector((state) => state.all);

  const { role, salonId, branchId } = useSelector((state) => state.user);
  const [currRoles, setCurrRoles] = React.useState("salonadmin");
  const [currRes, setCurrRes] = React.useState();
  const [currBranch, setCurBranch] = React.useState(branchId || "all");
  const isSuperAdmin = role === "superadmin";
  const isSalonAdmin = role === "salonadmin";

  const currSalonId = salonId !== "all" ? salonId : currRes;

  const SalonAdminOption = () => (
    <div class="form-group col-md-6">
      <label>Salon</label>
      <select
        name="salonId"
        class="form-control"
        onChange={(e) => {
          setCurrRes(e.target.value);
          setValue("salonId", e.target.value);
        }}
        required
        value={currRes}
        ref={register}
      >
        {salons.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.name}
            </option>
          );
        })}
      </select>
    </div>
  );

  const BranchAdminOption = () => (
    <div class="form-group col-md-6">
      <label>Branches</label>
      <select
        name="branchId"
        class="form-control"
        onChange={(e) => {
          setCurBranch(e.target.value);
          setValue("branchId", e.target.value);
        }}
        value={currBranch}
        required
        ref={register}
      >
        {branches.length === 0 && (
          <option value="" disabled selected>
            No Branches
          </option>
        )}
        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const RoleOption = () => (
    <div class="form-group col-md-6">
      <label>Role</label>
      <select
        name="role"
        class="form-control"
        onChange={(e) => {
          setCurrRoles(e.target.value);
          setValue("role", e.target.value);
        }}
        required
        value={currRoles}
        ref={register}
      >
        {/* {role == "superadmin " && ( */}
        {role === "superadmin" && (
          <option value="salonadmin">Salon Admin</option>
        )}
        {/* )} */}
        <option value="employee">Employee</option>
      </select>
    </div>
  );

  const onSubmit = (data) => {
    if (data.password !== data.repassword) {
      return dispatch(showSnackBar("Passwords do not match", "error"));
    }
    dispatch(
      createUser(
        {
          ...data,
          ...(salonId !== "all" && salonId && { salonId: salonId }),
          ...(isSalonAdmin && { role: "employee" }),
        },
        () => {
          reset();
        }
      )
    );
  };
  React.useEffect(() => {
    role === "superadmin" && dispatch(getAllSalons("all"));
  }, [role]);

  React.useEffect(() => {
    dispatch(getAllBranches(currSalonId, "true"));
    dispatch(getAllUserGrpups(currSalonId, undefined));
  }, [currSalonId]);
  React.useEffect(() => {
    dispatch(getAllBranches(currSalonId, "true"));
  }, []);

  return (
    <div class="page-content-tab">
      <div class="row mt-2">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <TableTitle title="Add Employee" />
              <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Employee Name</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="userName"
                      placeholder="Type a name"
                      ref={register}
                    />
                  </div>

                  <div class="form-group col-md-3">
                    <label>Employee Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="userMobile"
                      placeholder="Mobile Number"
                      ref={register({
                        pattern: {
                          value: mobileRegex,
                          message: "Invalid mobile number",
                        },
                      })}
                    />
                    {errors.userMobile && (
                      <div class="form-text-error">
                        {errors.userMobile.message || "Invalid mobile number"}
                      </div>
                    )}
                  </div>

                  <div class="form-group col-md-3">
                    <label>Employee Group</label>
                    <select
                      name="status"
                      ref={register}
                      class="form-control"
                    // required
                    >
                      <option value={""} selected>
                        {"Common"}
                      </option>
                      {salonUserGroup.map((group, index) => {
                        return (
                          <option value={group._id}>{group.groupName}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Password</label>
                    <div class="row">
                      <div class="col-md-6">
                        <input
                          type="password"
                          name="password"
                          id="pass2"
                          class="form-control"
                          required
                          placeholder="Password"
                          ref={register}
                        />
                      </div>
                      <div class="col-md-6">
                        <input
                          type="password"
                          class="form-control"
                          name="repassword"
                          required
                          data-parsley-equalto="#pass2"
                          placeholder="Re-Type Password"
                          ref={register}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Status</label>
                    <select
                      name="status"
                      ref={register}
                      class="form-control"
                      required
                    >
                      <option value={true}>Active</option>
                      <option value={true}>Inactive</option>
                    </select>
                  </div>
                  {isSuperAdmin && <RoleOption />}

                  {salonId === "all" && <SalonAdminOption />}
                  {["superadmin"].includes(currRoles) && (
                    <>
                      <BranchAdminOption />
                    </>
                  )}
                  {/* {["branchadmin", "branchuser"].includes(watchRole) &&
                      watchRestaurant && (
                        <>
                          <SalonAdminOption />
                          {watchRestaurant && <BranchAdminOption />}
                        </>
                      )} */}
                </div>
                <div class="form-group mb-0">
                  <button
                    type="submit"
                    class="btn btn-gradient-primary waves-effect waves-light"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
