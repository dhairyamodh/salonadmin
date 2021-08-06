import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "../Inputs";

const CommonActionModal = ({
  open,
  onClose,
  title,
  onSubmit,

  data,
  mode,
  restaurants,
  formData,
  defaultValues,
}) => {
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    setValue,
    getValues,
  } = methods;

  // console.log("methods", methods);
  const isLoading = useSelector((state) => state.util.spinner);
  const [formErrors, setFormErrors] = React.useState({});

  const [fileFields, setFileFields] = React.useState();
  const [otherFields, setOtherFields] = React.useState({});

  // const dispatch = useDispatch();

  // console.log("error", errors);
  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);
  const handleFileFieldChange = (name, file) => {
    console.log("upcomin", file);
    setFileFields({
      [name]: file,
    });
  };

  const localSubmit = (values) => {
    onSubmit({ ...data, ...values, ...fileFields, ...otherFields });
  };

  const handleOtherChange = ({ name, value }) => {
    console.log("handleOtherChange", name, value);
    setOtherFields({
      ...otherFields,
      [name]: value,
    });
  };
  return (
    open && (
      <ModalContainer
        open={open}
        onClose={() => {
          onClose();
          setFormErrors();
          reset();
        }}
        title={`${mode} ${title}`}
      >
        <FormProvider {...methods}>
          <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
            <div class="row">
              {formData.map((item, index) => {
                const MyInput = Inputs[item.type];

                return (
                  mode !== item?.hideAt && (
                    <MyInput
                      {...item}
                      key={index}
                      name={item.name}
                      label={item.label}
                      placeholder={item.placeholder}
                      defaultValue={data ? data[item.name] : ""}
                      ref={register(item.rules)}
                      error={formErrors[item.name]?.message}
                      mode={mode}
                      handleFileFieldChange={handleFileFieldChange}
                      handleOtherChange={handleOtherChange}
                      disabled={
                        item.disabled ||
                        (item?.disabledCondition &&
                          item?.disabledCondition({ mode }))
                      }
                    />
                  )
                );
              })}
            </div>
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
              <button
                type="reset"
                class="btn btn-gradient-danger waves-effect ml-3"
                onClick={() => onClose()}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </ModalContainer>
    )
  );
};

export default CommonActionModal;

// //with new formik

// import { Modal, Button } from "react-bootstrap";
// import React from "react";
// import ModalContainer from "../ModalContainer";

// import { useDispatch, useSelector } from "react-redux";
// import * as Inputs from "../oldInputs";
// import { useFormik, Form, Formik } from "formik";
// import * as Yup from "yup";
// const CommonActionModal = ({
//   open,
//   onClose,
//   title,
//   onSubmit: propsSubmit,
//   size,
//   data,
//   mode,
//   formData,
//   defaultValues,
// }) => {
//   const formikRef = React.useRef();

//   const [validationSchema, setValidationSchema] = React.useState({});
//   const [fileFields, setFileFields] = React.useState();
//   let validate = Yup.object().shape({
//     ...validationSchema,
//   });

//   // const formik = useFormik({
//   //   initialValues: {},
//   //   validationSchema: validationSchema ? validate : undefined,
//   //   onSubmit: (values) => {
//   //     propsSubmit({ ...values, ...fileFields });
//   //   },
//   // });
//   // const { values, handleChange, formState, touched, errors, resetForm } =
//   //   formik;
//   const isLoading = useSelector((state) => state.util.spinner);

//   React.useEffect(() => {
//     if (formikRef.current) {
//       if (data) {
//         formikRef.current.setValues({
//           ...defaultValues,
//           ...data,
//         });
//       } else if (defaultValues) {
//         formikRef.current.setValues(defaultValues);
//       }
//     }
//   }, [data, defaultValues, open]);

//   React.useEffect(() => {
//     let schemaObj = {};
//     formData.forEach((element) => {
//       if (element.type != "none") {
//         if (element.required) {
//           schemaObj = {
//             ...schemaObj,
//             [element.name]: Yup.string().required(
//               `${element.label} is required`
//             ),
//           };
//         }
//         if (element.rules) {
//           schemaObj = {
//             ...schemaObj,
//             [element.name]: element.rules,
//           };
//         }
//       }
//     });
//     if (Object.keys(schemaObj).length > 0) {
//       setValidationSchema(schemaObj);
//     }
//   }, [formData]);

//   const handleFileFieldChange = (name, file) => {
//     setFileFields({
//       [name]: file,
//     });
//   };

//   const RenderComponent = (props) => {
//     const {
//       values,
//       handleChange,
//       formState,
//       touched,
//       errors,
//       resetForm,
//       handleFileFieldChange,
//       isLoading,
//     } = props;
//     console.log("errors", errors);
//     return (
//       <div class="row">
//         {formData.map((item, index) => {
//           const MyInput = Inputs[item.type];

//           return (
//             mode !== item?.hideAt && (
//               <MyInput
//                 {...item}
//                 key={index}
//                 name={item.name}
//                 label={item.label}
//                 placeholder={item.placeholder}
//                 defaultValue={data ? data[item.name] : ""}
//                 error={
//                   touched[item.name] && Boolean(errors[item.name])
//                     ? errors[item.name]
//                     : undefined
//                 }
//                 mode={mode}
//                 onChange={handleChange}
//                 value={values[item.name]}
//                 handleFileFieldChange={handleFileFieldChange}
//               />
//             )
//           );
//         })}
//         <div class="form-group mb-0">
//           <button
//             type="submit"
//             disabled={isLoading}
//             class="btn btn-gradient-primary waves-effect waves-light"
//           >
//             {isLoading && (
//               <span
//                 class="spinner-border spinner-border-sm"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//             )}
//             Submit
//           </button>
//           <button
//             type="reset"
//             class="btn btn-gradient-danger waves-effect ml-3"
//             onClick={() => onClose()}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <ModalContainer
//       size={size}
//       open={open}
//       onClose={() => {
//         formikRef.current.resetForm();

//         onClose();
//       }}
//       title={`${mode} ${title}`}
//     >
//       <Formik
//         innerRef={formikRef}
//         initialValues={{}}
//         validationSchema={validationSchema ? validate : undefined}
//         onSubmit={(values, actions) => {
//           console.log("submit", values, actions);
//           propsSubmit({ ...values, ...fileFields });
//         }}
//         // validateOnChange
//       >
//         {(props) => (
//           <Form class="form-parsley">
//             <RenderComponent
//               {...props}
//               handleFileFieldChange={(e) => handleFileFieldChange(e)}
//               isLoading={isLoading}
//             />
//           </Form>
//         )}
//       </Formik>
//     </ModalContainer>
//   );
// };

// export default CommonActionModal;

// // import { Modal, Button } from "react-bootstrap";
// // import React from "react";
// // import ModalContainer from "../ModalContainer";
// // // import { useForm, Controller, FormProvider } from "react-hook-form";
// // import { useDispatch, useSelector } from "react-redux";
// // import * as Inputs from "../Inputs";
// // import { useFormik, Formik, Form } from "formik";
// // import * as Yup from "yup";

// // const CommonAddModal = ({
// //   open,
// //   onClose,
// //   title,
// //   onSubmit: propsSubmit,
// //   size,
// //   data,
// //   mode,
// //   formData,
// //   defaultValues,
// // }) => {
// //   const formref = React.useRef();
// //   // const methods = useForm({
// //   //   defaultValues: defaultValues,
// //   // });
// //   const [validationSchema, setValidationSchema] = React.useState({});
// //   const [formDefaultValues, setformDefaultValues] = React.useState();
// //   const [fileFields, setFileFields] = React.useState();

// // let validate = Yup.object().shape({
// //   ...validationSchema,
// // });

// //   const formik = useFormik({
// //     initialValues: {
// //       ...formDefaultValues,
// //     },
// //     validationSchema: validationSchema ? validate : undefined,
// //     onSubmit: (values) => {
// //       console(JSON.stringify(values, null, 2));
// //     },
// //   });
// //   const { values, handleChange, touched, errors, resetForm, onSubmit } = formik;
// //   const isLoading = useSelector((state) => state.util.spinner);

// //   // React.useEffect(() => {
// //   //   let schemaObj = {};
// //   //   formData.forEach((element) => {
// //   //     if (element.type != "none") {
// //   //       if (element.required) {
// //   //         schemaObj = {
// //   //           ...schemaObj,
// //   //           [element.name]: Yup.string().required(
// //   //             `${element.label} is required`
// //   //           ),
// //   //         };
// //   //       }
// //   //       if (element.rules) {
// //   //         schemaObj = {
// //   //           ...schemaObj,
// //   //           [element.name]: element.rules,
// //   //         };
// //   //       }
// //   //     }
// //   //   });
// //   //   if (Object.keys(schemaObj).length > 0) {
// //   //     setValidationSchema(schemaObj);
// //   //   }
// //   // }, [formData]);
// //   // React.useEffect(() => {
// //   //   if (data) {
// //   //     // console.log("form ref", formref);
// //   //     setformDefaultValues(data);
// //   //     // formref.current && formref.current.setValues(data);
// //   //   }
// //   // }, [data]);
// //   // // console.log('input error', errors)

// // const handleFileFieldChange = (name, file) => {
// //   setFileFields({
// //     [name]: file,
// //   });
// // };
// //   return (
// //     open && (
// //       <ModalContainer
// //         size={size}
// //         open={open}
// //         onClose={() => {
// //           onClose();
// //           formref.current && formref.current.resetForm();
// //         }}
// //         title={`${mode} ${title}`}
// //       >
// //         <form onSubmit={onSubmit}>
// //           <div class="row">
// //             {formData.map((item, index) => {
// //               const MyInput = React.memo(Inputs[item.type]);

// //               return (
// //                 mode !== item?.hideAt && (
// //                   <MyInput
// //                     {...item}
// //                     key={index}
// //                     name={item.name}
// //                     label={item.label}
// //                     placeholder={item.placeholder}
// //                     defaultValue={data ? data[item.name] : ""}
// //                     // error={errors[item.name]}
// //                     error={
// //                        Boolean(errors[item.name])
// //                         ? errors[item.name]
// //                         : undefined
// //                     }
// //                     mode={mode}
// //                     onChange={formik.handleChange}
// //                     value={values[item.name]}
// //                     // handleFileChange={(name, file) =>
// //                     //   handleFileFieldChange(name, file)
// //                     // }
// //                   />
// //                 )
// //               );
// //             })}
// //           </div>
// //           <div class="form-group mb-0">
// //             <button
// //               type="submit"
// //               disabled={isLoading}
// //               class="btn btn-gradient-primary waves-effect waves-light"
// //             >
// //               {isLoading && (
// //                 <span
// //                   class="spinner-border spinner-border-sm"
// //                   role="status"
// //                   aria-hidden="true"
// //                 ></span>
// //               )}
// //               Submit
// //             </button>
// //             <button
// //               type="reset"
// //               class="btn btn-gradient-danger waves-effect ml-3"
// //               onClick={() => onClose()}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </ModalContainer>
// //     )
// //   );
// // };

// // export default CommonAddModal;

// // import { Modal, Button } from "react-bootstrap";
// // import React from "react";
// // import ModalContainer from "../ModalContainer";
// // import { useForm, Controller, FormProvider } from "react-hook-form";
// // import { useDispatch, useSelector } from "react-redux";
// // import * as Inputs from "../Inputs";

// // const CommonAddModal = ({
// //   open,
// //   onClose,
// //   title,
// //   onSubmit,
// //   size,
// //   data,
// //   mode,
// //   formData,
// //   defaultValues,
// // }) => {
// //   const methods = useForm({
// //     defaultValues: defaultValues,
// //   });
// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     errors,
// //     control,
// //     formState,
// //     reset,
// //     setValue,
// //   } = methods;
// //   const isLoading = useSelector((state) => state.util.spinner);
// //   const [formErrors, setFormErrors] = React.useState({});
// //   const dispatch = useDispatch();

// //   // console.log("error", errors);
// //   React.useEffect(() => {
// //     setFormErrors(formState.errors);
// //   }, [formState]);

// //   return (
// //     open && (
// //       <ModalContainer
// //         size={size}
// //         open={open}
// //         onClose={() => {
// //           onClose();
// //           setFormErrors();
// //           reset();
// //         }}
// //         title={`${mode} ${title}`}
// //       >
// //         <FormProvider {...methods}>
// //           <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
// //             <div class="row">
// //               {formData.map((item, index) => {
// //                 const MyInput = Inputs[item.type];

// //                 return (
// //                   mode !== item?.hideAt && (
// //                     <MyInput
// //                       {...item}
// //                       key={index}
// //                       name={item.name}
// //                       label={item.label}
// //                       placeholder={item.placeholder}
// //                       defaultValue={data ? data[item.name] : ""}
// //                       ref={register(item.rules)}
// //                       error={formErrors[item.name]?.message}
// //                       mode={mode}
// //                       onChan
// //                       handleChange={(value) => {
// //                         console.log("handleChange", item.name, value);
// //                         setValue(item.name, value, {
// //                           shouldValidate: false,
// //                           shouldDirty: true,
// //                         });
// //                       }}
// //                     />
// //                   )
// //                 );
// //               })}
// //             </div>
// //             <div class="form-group mb-0">
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 class="btn btn-gradient-primary waves-effect waves-light"
// //               >
// //                 {isLoading && (
// //                   <span
// //                     class="spinner-border spinner-border-sm"
// //                     role="status"
// //                     aria-hidden="true"
// //                   ></span>
// //                 )}
// //                 Submit
// //               </button>
// //               <button
// //                 type="reset"
// //                 class="btn btn-gradient-danger waves-effect ml-3"
// //                 onClick={() => onClose()}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </FormProvider>
// //       </ModalContainer>
// //     )
// //   );
// // };

// // export default CommonAddModal;
