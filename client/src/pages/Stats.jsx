import React from "react";
import { StatsContainer } from "../components";
import ChartContainer from "../components/ChartContainer";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customAxios";
export const loader = async () => {
  try {
    const res = await customFetch("/jobs/stats");
    return res.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  const { defaultStatus, monthlyApplications } = useLoaderData();
  return (
    <div>
      <StatsContainer defaultStatus={defaultStatus} />
      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </div>
  );
};

export default Stats;
