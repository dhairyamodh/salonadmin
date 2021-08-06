import React from "react";
import AddCommonAction from "../Actions/AddCommonAction";
import DeleteCommonAction from "../Actions/DeleteCommonAction";
import ModalContainer from "../ModalContainer";
import TableHeading from "../SmartTable/TableHeading";
import TableTitle from "../SmartTable/TableTitle";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { WEEKARRAY } from "../../../contants";
import TimeOnly from "../Inputs/TimeOnly";

const Nodata = () => (
  <td colSpan={"8"} className="text-center">
    {"No Data Available"}
  </td>
);

const emptyRow = {
  subExpenseType: "",

  isWorking: false,

  measureUnit: undefined,

  status: true,
};

const headers = [
  { title: "Week Day", key: "dayName" },

  { title: "Is Working", key: "isWorking" },
  { title: "Start Time", key: "startTime" },
  { title: "End Time", key: "endTime" },
];

const EmployeeScheduleModal = ({ open, onClose, data, onSubmit }) => {
  const [order, setOrder] = React.useState("asc");

  console.log("schedulemodal", data);

  const isLoading = useSelector((state) => state.util.spinner);
  const initialValues = {
    employeeSchedule:
      data?.employeeSchedule ||
      WEEKARRAY.map((d, i) => {
        return {
          dayName: d,
          dayIndex: i,
          isWorking: false,
          startTime: "00:00",
          endTime: "00:00",
        };
      }),
  };

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          // setFormErrors();
          // reset();
        }}
        title={`${data?.userName}'s Schedule`}
        // title={`${mode} ${title}`}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            onSubmit({
              employeeSchedule: values.employeeSchedule,
            });
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="employeeSchedule">
                {({ insert, remove, push }) => (
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <label style={styles.paginated}>
                          Total {values.employeeSchedule.length} entries
                        </label>
                      </div>
                      <div class={"table-responsive "}>
                        <table
                          id="datatable"
                          class="table table-bordered dt-responsive nowrap"
                        >
                          <TableHeading
                            data={headers || []}
                            hasActions={false}
                            onRequestSort={() => {}}
                            sortable={false}
                            selectable={false}
                            onSelectAll={(e) => {}}
                            order={order}
                          />
                          <tbody>
                            {values.employeeSchedule.length === 0 && <Nodata />}
                            {values.employeeSchedule.map((item, childindex) => {
                              return (
                                <tr key={childindex}>
                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      name={`employeeSchedule.${childindex}.dayName`}
                                      placeholder="Day Name"
                                      type="text"
                                      disabled
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      name={`employeeSchedule.${childindex}.isWorking`}
                                    >
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                      }) => (
                                        <div class="custom-control custom-switch switch-primary">
                                          <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id={`customSwitchPrimary${childindex}`}
                                            {...field}
                                            checked={field.value}
                                          />
                                          <label
                                            class="custom-control-label"
                                            for={`customSwitchPrimary${childindex}`}
                                          ></label>

                                          {meta.touched && meta.error && (
                                            <div className="error">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      name={`employeeSchedule.${childindex}.startTime`}
                                    >
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: {
                                          touched,
                                          errors,
                                          setFieldValue,
                                        }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                        helpers,
                                      }) => (
                                        <div class="custom-control ">
                                          <TimeOnly
                                            value={field.value}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `employeeSchedule.${childindex}.startTime`,
                                                e
                                              )
                                            }
                                          />
                                          {meta.touched && meta.error && (
                                            <div className="error">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </td>
                                  <td>
                                    <Field
                                      disabled={isLoading}
                                      name={`employeeSchedule.${childindex}.endTime`}
                                    >
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                        helpers,
                                      }) => (
                                        <div class="custom-control ">
                                          <TimeOnly
                                            value={field.value}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `employeeSchedule.${childindex}.endTime`,
                                                e
                                              )
                                            }
                                          />

                                          {meta.touched && meta.error && (
                                            <div className="error">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </td>

                                  {/* <td>
                            <Controller
                              render={({ field }) => <input {...field} />}
                              name={`employeeSchedule.${childindex}.measureUnit`}
                              control={control}
                              defaultValue={item.measureUnit} // make sure to set up defaultValue
                            />
                          </td> */}
                                  {/* {actions?.length > 0 && (
                                    <td
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        height: "100%",
                                      }}
                                    >
                                      {actions.map((Action, index) => {
                                        return (
                                          <div>
                                            <Action
                                              index={index}
                                              key={index}
                                              data={item}
                                            />
                                          </div>
                                        );
                                      })}
                                    </td>
                                  )} */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>

              <div class="form-group mb-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  class="btn btn-gradient-primary waves-effect waves-light"
                >
                  {isLoading && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </div>
  );
};

export default EmployeeScheduleModal;

const styles = {
  paginated: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 1vw",
    maxWidth: "20vw",
  },
  select: {
    margin: "0px 0.5vw",
  },
  searchGroup: {
    maxWidth: "15vw",
  },
};
