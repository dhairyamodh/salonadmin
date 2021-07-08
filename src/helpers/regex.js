import * as Yup from 'yup';

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
export const pinCodeRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;

export const yupPincode = (message) => {
    return Yup.string().matches(pinCodeRegex, message)
}


export const yupEmail = (message) => {
    return Yup.string().matches(emailRegex, message)
}

export const yupMobile = (message) => {
    return Yup.string().matches(mobileRegex, message)
}
export const yupBoolean = (message) => {
    return Yup.boolean().required(`${message} is required` || 'Required')
}

export const yupArray = (message) => {
    return Yup.mixed().required(`${message} is required` || 'Required')
    // return Yup.required(`${message} is required` || 'Required')
}