import { Modal, Button } from "react-bootstrap";
import React from "react";
import ModalContainer from "../ModalContainer";
// import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "../Inputs";
import { useFormik, Formik, Form, } from 'formik';
import * as Yup from 'yup';

const CommonAddModal = ({
  open,
  onClose,
  title,
  onSubmit: propsSubmit,
  size,
  data,
  mode,
  formData,
  defaultValues,
}) => {
  const formref = React.useRef()
  // const methods = useForm({
  //   defaultValues: defaultValues,
  // });
  const [validationSchema, setValidationSchema] = React.useState({})
  const [formDefaultValues, setformDefaultValues] = React.useState()

  let validate = Yup.object().shape({
    ...validationSchema,
  });

  // const formik = useFormik({
  //   initialValues: {
  //     ...formDefaultValues
  //   },
  //   validationSchema: validationSchema ? validate : undefined,
  //   onSubmit: values => {
  //     // consoole(JSON.stringify(values, null, 2));

  //   },
  // });
  // const {
  //   values, handleChange, touched, errors, resetForm

  // } = formik;
  const isLoading = useSelector((state) => state.util.spinner);


  React.useEffect(() => {
    let schemaObj = {}
    formData.forEach(element => {
      if (element.type != 'none') {
        if (element.required) {
          schemaObj = {
            ...schemaObj,
            [element.name]: Yup.string().required(`${element.label} is required`)
          }
        }
        if (element.rules) {
          schemaObj = {
            ...schemaObj,
            [element.name]: element.rules
          }
        }
      }

    });
    if (Object.keys(schemaObj).length > 0) {
      setValidationSchema(schemaObj)
    }
  }, [formData])
  React.useEffect(() => {
    if (data) {
      console.log('form ref', formref)
      setformDefaultValues(data)
      formref.current && formref.current.setValues(data)
    }
  }, [data])
  // console.log('input error', errors)


  return (
    open && (
      <ModalContainer
        size={size}
        open={open}
        onClose={() => {
          onClose();
          formref.current && formref.current.resetForm();
        }}
        title={`${mode} ${title}`}
      >
        <Formik
          innerRef={formref}
          initialValues={{ ...formDefaultValues }}
          validationSchema={validationSchema ? validate : undefined}

          onSubmit={(values, { setSubmitting }) => {
            console.log('submit', values)
            propsSubmit(values)
          }}

        >
          {({ values, handleChange, touched, errors, resetForm }) => (
            <Form>
              {console.log('formerror', errors)}

              <div class="row">
                {formData.map((item, index) => {
                  const MyInput = React.memo(Inputs[item.type]);

                  return (
                    mode !== item?.hideAt && (
                      <MyInput
                        {...item}
                        key={index}
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        defaultValue={data ? data[item.name] : ""}
                        // error={errors[item.name]}
                        error={touched[item.name] && Boolean(errors[item.name]) ? errors[item.name] : undefined}
                        mode={mode}
                        onChange={(e) => { console.log('onChange', e); handleChange(e) }}
                        value={values[item.name]}
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
            </Form>
          )}
        </Formik>
      </ModalContainer>
    )
  );
};

export default CommonAddModal;



// import { Modal, Button } from "react-bootstrap";
// import React from "react";
// import ModalContainer from "../ModalContainer";
// import { useForm, Controller, FormProvider } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import * as Inputs from "../Inputs";

// const CommonAddModal = ({
//   open,
//   onClose,
//   title,
//   onSubmit,
//   size,
//   data,
//   mode,
//   formData,
//   defaultValues,
// }) => {
//   const methods = useForm({
//     defaultValues: defaultValues,
//   });
//   const {
//     register,
//     handleSubmit,
//     watch,
//     errors,
//     control,
//     formState,
//     reset,
//     setValue,
//   } = methods;
//   const isLoading = useSelector((state) => state.util.spinner);
//   const [formErrors, setFormErrors] = React.useState({});
//   const dispatch = useDispatch();

//   // console.log("error", errors);
//   React.useEffect(() => {
//     setFormErrors(formState.errors);
//   }, [formState]);

//   return (
//     open && (
//       <ModalContainer
//         size={size}
//         open={open}
//         onClose={() => {
//           onClose();
//           setFormErrors();
//           reset();
//         }}
//         title={`${mode} ${title}`}
//       >
//         <FormProvider {...methods}>
//           <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
//             <div class="row">
//               {formData.map((item, index) => {
//                 const MyInput = Inputs[item.type];

//                 return (
//                   mode !== item?.hideAt && (
//                     <MyInput
//                       {...item}
//                       key={index}
//                       name={item.name}
//                       label={item.label}
//                       placeholder={item.placeholder}
//                       defaultValue={data ? data[item.name] : ""}
//                       ref={register(item.rules)}
//                       error={formErrors[item.name]?.message}
//                       mode={mode}
//                       handleChange={(value) => {
//                         console.log('handleChange', item.name, value);
//                         setValue(item.name, value, { shouldValidate: false, shouldDirty: true })
//                       }}
//                     />
//                   )
//                 );
//               })}
//             </div>
//             <div class="form-group mb-0">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 class="btn btn-gradient-primary waves-effect waves-light"
//               >
//                 {isLoading && (
//                   <span
//                     class="spinner-border spinner-border-sm"
//                     role="status"
//                     aria-hidden="true"
//                   ></span>
//                 )}
//                 Submit
//               </button>
//               <button
//                 type="reset"
//                 class="btn btn-gradient-danger waves-effect ml-3"
//                 onClick={() => onClose()}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </FormProvider>
//       </ModalContainer>
//     )
//   );
// };

// export default CommonAddModal;
