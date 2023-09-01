// constants for signup form fields
const signupFields = [
    {
        labelText: "First Name",
        labelFor: "first_name",
        id: "first_name",
        name: "first_name",
        type: "text",
        autoComplete: "given-name",
        placeholder: "First Name"
    },
    {
        labelText: "Last Name",
        labelFor: "last_name",
        id: "last_name",
        name: "last_name",
        type: "text",
        autoComplete: "family-name",
        placeholder: "Last Name"
    },
    {
        labelText: "Gender",
        labelFor: "gender",
        id: "gender",
        name: "gender",
        type: "select",
        autoComplete: "off",
        placeholder: "Select Gender",
        options: ["Male", "Female", "Other"]
    },
    {
        labelText: "Phone No",
        labelFor: "phone_no",
        id: "phone_no",
        name: "phone_no",
        type: "tel",
        autoComplete: "phone",
        placeholder: "Phone No"
    },
    {
        labelText: "Email",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "text",
        autoComplete: "email",
        placeholder: "Email"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        placeholder: "Password"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm_password",
        id: "confirm_password",
        name: "confirm_password",
        type: "password",
        autoComplete: "confirm_password",
        placeholder: "Confirm Password"
    },
    {
        labelText: "User Type",
        labelFor: "user_type",
        id: "user_type",
        name: "user_type",
        type: "select",
        autoComplete: "off",
        placeholder: "User Type",
        options: ["Client", "Freelancer"]
    }
]

export default signupFields;