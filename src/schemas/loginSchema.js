import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email().required("please enter your email"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ).required("please enter your password"),
})