export const titleValidator = (title) => {
  if (!title) {
    return "Title is required";
  }
  return "";
};

export const companyValidator = (company) => {
  if (!company) {
    return "Company Name is required";
  }
  return "";
};

export const descriptionValidator = (description) => {
  if (!description) {
    return "Job Description is required";
  }
  return "";
};

export const salaryValidator = (salary) => {
  if (salary < 0) {
    return "Salary can not be negative";
  }
  return "";
};
