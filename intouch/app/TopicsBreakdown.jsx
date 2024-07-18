import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, ChartDataLabels);

function TopicsBreakdown({ id, activeKey }) {
  const [topicBreakDownData, setTopicBreakDownData] = useState([{
    intent_score : 0.75,
    score : "high",
    name : "abc",
    mutual : true  
    },
    {
    intent_score : 0.75,
    score : "high",
    name : "abc",
    mutual : true  
    },
    {
    intent_score : 0.75,
    score : "high",
    name : "abc",
    mutual : true  
    },
    {
    intent_score : 0.75,
    score : "high",
    name : "abc",
    mutual : false  
    },
    {
    intent_score : 0.75,
    score : "high",
    name : "abc",
    mutual : false  
    }
]);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "",
      data: [],
      backgroundColor: "#11A7D9",
      borderWidth: 1,
    }],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
    //   const response = await apiclient.get(`/lead-activity/topics/${id}`);
    //   setTopicBreakDownData(response.data.topics);
      const newAspectRatio = topicBreakDownData.map((data) => {
        if (data.score.toLowerCase() === "low") {
          return 4;
        } else if (data.score.toLowerCase() === "medium") {
          return 6;
        } else {
          return 8;
        }
      });
      setChartData({
        labels: topicBreakDownData.map((data) => data.name),
        datasets: [{
          label: topicBreakDownData.map((data) => data.score),
          data: newAspectRatio,
          borderWidth: 1,
          borderRadius: 4,
          backgroundColor: topicBreakDownData.map((data) => {
            return data.mutual === true ? "#11A7D9" : "#73D4F4";
          }),
        }],
      });
    } catch (error) {
      console.error(error);
      apiErrorHandling(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = (isMutual) => {
    const filteredData = topicBreakDownData.filter((data) => data.mutual === isMutual);
    const newAspectRatio = filteredData.map((data) => {
      if (data.score.toLowerCase() === "low") {
        return 4;
      } else if (data.score.toLowerCase() === "medium") {
        return 6;
      } else {
        return 8;
      }
    });
    setChartData({
      labels: filteredData.map((data) => data.name),
      datasets: [{
        label: filteredData.map((data) => data.score),
        data: newAspectRatio,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: filteredData.map((data) => {
          return data.mutual === true ? "#11A7D9" : "#73D4F4";
        }),
      }],
    });
  };

  const resetData = () => {
    const newAspectRatio = topicBreakDownData.map((data) => {
      if (data.score.toLowerCase() === "low") {
        return 4;
      } else if (data.score.toLowerCase() === "medium") {
        return 6;
      } else {
        return 8;
      }
    });
    setChartData({
      labels: topicBreakDownData.map((data) => data.name),
      datasets: [{
        label: topicBreakDownData.map((data) => data.score),
        data: newAspectRatio,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: topicBreakDownData.map((data) => {
          return data.mutual === true ? "#11A7D9" : "#73D4F4";
        }),
      }],
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [activeKey, id]);

  useEffect(() => {
    if (currentFilter === "true") {
      filterData(true);
    } else if (currentFilter === "false") {
      filterData(false);
    } else {
      resetData();
    }
  }, [currentFilter]);

  const getContainerStyle = () => ({
    width: "100%",
    padding: "10px",
  });

  const getChartWidth = () => {
    const length = chartData.labels.length;
    return length <= 10 ? "100%" : `${length * 50}px`;
  };


  return (
    <>
      <div style={getContainerStyle()}>
        <div style={{ display: "inline-block", width: getChartWidth() }}>
          <Bar
            data={chartData}
            height={300}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                datalabels: {
                  display: false,
                  offset: 20,
                  formatter: (labels) => labels.join("\n"),
                  color: "#ffffff",
                  align: "center",
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: {} },
                },
                y: {
                  beginAtZero: true,
                  max: 8,
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="topic-filter">
        <div className="topic-filter-inner-container">
          <span>Labels</span>
          <button
            onClick={() => setCurrentFilter(currentFilter === "true" ? null : "true")}
            className="filter-button1"
          >
            <span className="button-label">Mutual topics of Interest</span>
          </button>
          <button
            onClick={() => setCurrentFilter(currentFilter === "false" ? null : "false")}
            className="filter-button2"
          >
            <span className="button-label">Buyer's unique topics of Interest</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default TopicsBreakdown;
