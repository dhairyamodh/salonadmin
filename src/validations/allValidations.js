import { yupMobile, yupPassword } from "../helpers/regex";
import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  mobile: yupMobile(),
  password: yupPassword(),
});
