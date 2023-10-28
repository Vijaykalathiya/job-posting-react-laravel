import React, { useEffect, useState } from "react";
import { deleteJob, fetchJobs } from "../../services/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

library.add({
  faTrash,
  faEdit,
});

export function JobList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entities, loading } = useSelector((state) => ({ ...state.jobs }));

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteJob({ id }));
  };

  const LongText = ({ content, limit }) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = (e) => {
      e.stopPropagation();
      setShowAll(true);
    };
    const showLess = (e) => {
      e.stopPropagation();
      setShowAll(false);
    };

    if (content.length <= limit) {
      // there is nothing more to show
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: content }}></span>
        </>
      );
    }
    if (showAll) {
      // We show the extended text and a link to reduce it
      const toShow = content.substring(0, 500) + "...";
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: toShow }}></span>
          <a onClick={(e) => showLess(e)}>Read less</a>
        </>
      );
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = content.substring(0, limit) + "...";
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: toShow }}></span>
        <a onClick={(e) => showMore(e)}>Read more</a>
      </>
    );
  };

  const FormatDate = ({ date }) => {
    const parseDate = moment(date).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    const result = currentDate == parseDate ? "Today" : parseDate;
    return <span>Posted: {result}</span>;
  };

  const navigateToPage = (e, type, id) => {
    e.stopPropagation();
    if (type === "view-page") {
      navigate(`/view/${id}`);
    } else if (type == "edit-page") {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <div className="container">
      <div className="job_count">
        <span>
          {entities.length} {entities.length > 1 ? "jobs" : "job"}
        </span>
        <span>
          <Link to={`/add`}>
            <button className="button" type="button">
              {" "}
              Create Job{" "}
            </button>
          </Link>
        </span>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <div className="job_lists">
            {entities.length &&
              entities.map((job, i) => (
                <article
                  className="card_content"
                  key={i}
                  onClick={(e) => navigateToPage(e, "view-page", job.id)}
                >
                  <div className="job_header">
                    <h2 className="job_name">
                      <Link>{job.title} </Link>
                    </h2>
                    <div className="actions">
                      <FontAwesomeIcon
                        icon="edit"
                        className="edit_job"
                        onClick={(e) => navigateToPage(e, "edit-page", job.id)}
                      />
                      <FontAwesomeIcon
                        icon="trash"
                        onClick={(e) => handleDelete(e, job.id)}
                      />
                    </div>
                  </div>

                  <div className="company_name">
                    <span>{job.company}</span>
                  </div>
                  <div className="salary_range">
                    <span>£ {job.salary}</span>
                  </div>
                  <div className="posting_date">
                    <FormatDate date={job.created_at}></FormatDate>
                  </div>
                  <div className="job_description">
                    <LongText content={job.description} limit={200} />
                  </div>
                </article>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
