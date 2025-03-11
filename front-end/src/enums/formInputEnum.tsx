export const formInputEnum = {
  EMAIL: {
    inputTitle: "Email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
  },
  NAME: {
    inputTitle: "Name",
    rules: {
      required: "Name is required",
      minLength: {
        value: 3,
        message: "Name must be at least 3 characters long",
      },
    },
  },
  PASSWORD: {
    inputTitle: "Password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
      pattern: {
        value: /[A-Za-z]/,
        message: "Password must contain at least one letter",
      },
      validate: {
        hasNumber: (value: string) =>
          /\d/.test(value) || "Password must contain at least one number",
        hasSpecialChar: (value: string) =>
          /[@$!%*?&]/.test(value) ||
          "Password must contain at least one special character (@$!%*?&)",
      },
    },
  },
};
