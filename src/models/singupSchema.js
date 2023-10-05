import * as Yup from "yup"
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

export const signupSchema = Yup.object({
  name: Yup.string().min(3).max(30).required("please enter your name"),
  username: Yup.string().min(3).required("please enter your username"),
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ).required("please enter your password"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "password must be matched").required("please enter your password"),
})