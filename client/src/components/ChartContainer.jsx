import React from "react";
import { useState } from "react";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarCharge from "./BarCharge";

const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Montlhy application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarCharge data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartContainer;
