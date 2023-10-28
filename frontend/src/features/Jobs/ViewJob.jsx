import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const initialState = {
  title: "",
  description: "",
  salary: 0,
  company: "",
  created_at: "",
};

export function ViewJob() {
  const [jobData, setJobData] = useState(initialState);

  const { entities } = useSelector((state) => ({ ...state.jobs }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const job = entities.find((job) => job.id == id);
      setJobData({ ...job });
    }
  }, [id]);

  const FormatDate = ({ date }) => {
    const parseDate = moment(date).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    const result = currentDate == parseDate ? "Today" : parseDate;
    return <span>Posted: {result}</span>;
  };

  return (
    <>
      <div className="container">
        <div className="form-box">
          <Link to={`/`}>Return to Dashboard</Link>
        </div>
        {jobData && (
          <article className="job_depth_view">
            <div className="job_header">
              <h2 className="job_name">{jobData.title}</h2>
            </div>

            <div className="company_name">
              <span>{jobData.company}</span>
            </div>
            <div className="salary_range">
              <span>£ {jobData.salary}</span>
            </div>
            <div className="posting_date">
              <FormatDate date={jobData.created_at}></FormatDate>
            </div>
            <div className="job_description view_job_description">
              <span
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></span>
            </div>
          </article>
        )}
      </div>
    </>
  );
}
