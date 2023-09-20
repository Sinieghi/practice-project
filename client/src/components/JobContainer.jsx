import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageBntContainer from "./pageBntContainer";
const JobContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPage } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPage > 1 && <PageBntContainer />}
    </Wrapper>
  );
};

export default JobContainer;
