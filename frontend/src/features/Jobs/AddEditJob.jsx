import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob, updateJob } from "../../services/jobSlice";
import { useLoginFormValidator } from "../../validator/hooks/useFormValidator";
import clsx from "clsx";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  salary: 0,
  company: "",
};

export function AddEditJob() {
  const dispatch = useDispatch();

  const [jobData, setJobData] = useState(initialState);

  const { entities, error } = useSelector((state) => ({ ...state.jobs }));

  const { errors, validateForm } = useLoginFormValidator(jobData);
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, salary, company } = jobData;

  useEffect(() => {
    if (id) {
      const job = entities.find((job) => job.id == id);
      setJobData({ ...job });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({
      jobData,
      errors,
      forceTouchErrors: true,
    });
    if (isValid) {
      if (!id) {
        dispatch(createJob({ jobData, navigate }));
      } else {
        delete jobData.created_at;
        dispatch(updateJob({ id, jobData, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleClear = () => {
    setJobData({ title: "", description: "", salary: 0, company: "" });
  };

  return (
    <>
      <div className="container">
        <div className="form-box">
          <Link to={`/`}>Return to Dashboard</Link>
          <h1>{id ? "Edit job" : "Create job"}</h1>
          <form id="contact" onSubmit={handleSubmit}>
            <fieldset>
              <input
                className={clsx(
                  "formField",
                  errors.title.dirty && errors.title.error && "formFieldError"
                )}
                id="title"
                type="text"
                value={title || ""}
                name="title"
                placeholder="Enter job title"
                onChange={onInputChange}
                tabIndex="1"
              />
              {errors.title.dirty && errors.title.error ? (
                <p className="formFieldErrorMessage">{errors.title.message}</p>
              ) : null}
            </fieldset>
            <fieldset>
              <textarea
                className={clsx(
                  "formField",
                  errors.description.dirty &&
                    errors.description.error &&
                    "formFieldError"
                )}
                id="description"
                value={description}
                name="description"
                placeholder="Enter job description"
                onChange={onInputChange}
                tabIndex="2"
              ></textarea>
              {errors.description.dirty && errors.description.error ? (
                <p className="formFieldErrorMessage">
                  {errors.description.message}
                </p>
              ) : null}
            </fieldset>
            <fieldset>
              <input
                className={clsx(
                  "formField",
                  errors.company.dirty &&
                    errors.company.error &&
                    "formFieldError"
                )}
                id="company"
                type="text"
                value={company}
                name="company"
                placeholder="Enter company name"
                onChange={onInputChange}
                tabIndex="3"
              />
              {errors.company.dirty && errors.company.error ? (
                <p className="formFieldErrorMessage">
                  {errors.company.message}
                </p>
              ) : null}
            </fieldset>
            <fieldset>
              <input
                id="salary"
                type="number"
                value={salary}
                name="salary"
                placeholder="Enter salary"
                tabIndex="4"
                onChange={onInputChange}
              />
              {errors.salary.dirty && errors.salary.error ? (
                <p className="formFieldErrorMessage">{errors.salary.message}</p>
              ) : null}
            </fieldset>

            <fieldset>
              <button id="contact-submit" className="button" type="submit">
                {" "}
                Save{" "}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
