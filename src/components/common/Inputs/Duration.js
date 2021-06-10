import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;
  return (
    <InputContainer label={label} error={error} size={size}>
      <input
        ref={ref}
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </InputContainer>
  );
});
export default MyTextField;


// import React from "react";
// import 'rc-time-picker/assets/index.css';
// import '../../../assets/css/duration.css';
// import InputContainer from "./InputContainer";
// import TimePicker from 'rc-time-picker';
// import moment from 'moment';

// const MyTextField = React.forwardRef((props, ref) => {
//   const { label, name, placeholder, multiline, rows, error, handleChange, size } = props;

//   const handleValueChange = (value) => {
//     console.log("duration name", moment(value).format('HH:mm'));
//     const estimatedTime = moment(value).format('HH:mm')
//     handleChange(estimatedTime)
//   }
//   return (
//     <InputContainer label={label} error={error} size={size}>
//       <div>
//         <TimePicker showSecond={false} ref={ref}
//           type="text"
//           class="form-control"
//           name={name}
//           placeholder={placeholder}
//           {...props}
//           onChange={handleValueChange}
//         />
//       </div>
//       {/* <input
//         ref={ref}
//         type="text"
//         class="form-control"
//         name={name}
//         placeholder={placeholder}
//         {...props}
//       /> */}
//     </InputContainer>
//   );
// });
// export default MyTextField;
