import { useState } from "react";

import {
  titleValidator,
  companyValidator,
  descriptionValidator,
  salaryValidator,
} from "../formValidator";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (form) => {
  const [errors, setErrors] = useState({
    title: {
      dirty: false,
      error: false,
      message: "",
    },
    company: {
      dirty: false,
      error: false,
      message: "",
    },
    description: {
      dirty: false,
      error: false,
      message: "",
    },
    salary: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({
    jobData,
    field,
    errors,
    forceTouchErrors = false,
  }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { title, company, description, salary } = form;

    if (nextErrors.title.dirty && (field ? field === "title" : true)) {
      const titleMessage = titleValidator(title, form);
      nextErrors.title.error = !!titleMessage;
      nextErrors.title.message = titleMessage;
      if (!!titleMessage) isValid = false;
    }

    if (nextErrors.company.dirty && (field ? field === "company" : true)) {
      const companyMessage = companyValidator(company, form);
      nextErrors.company.error = !!companyMessage;
      nextErrors.company.message = companyMessage;
      if (!!companyMessage) isValid = false;
    }

    if (
      nextErrors.description.dirty &&
      (field ? field === "description" : true)
    ) {
      const descriptionMessage = descriptionValidator(description, form);
      nextErrors.description.error = !!descriptionMessage;
      nextErrors.description.message = descriptionMessage;
      if (!!descriptionMessage) isValid = false;
    }

    if (nextErrors.salary.dirty && (field ? field === "salary" : true)) {
      const salaryMessage = salaryValidator(salary, form);
      nextErrors.salary.error = !!salaryMessage;
      nextErrors.salary.message = salaryMessage;
      if (!!salaryMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  return {
    validateForm,
    errors,
  };
};
