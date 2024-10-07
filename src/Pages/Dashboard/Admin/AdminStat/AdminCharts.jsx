import Chart from "react-google-charts";
import useCategoryChart from "../AdminHooks/useCategoryChart";
import Loading from "../../../Shared/Loading/Loading";

const AdminCharts = () => {
  const [cateChart, , isLoading] = useCategoryChart();

  if (isLoading) {
    return <Loading></Loading>;
  }

  const data = [
    ["Category", "Total Products", { role: "style" }],
    ...cateChart.catechart.map((item) => item),
  ];
  const options = {
    title: "Categorial Product Qunatity",
  };
  console.log(data);
  return (
    <div className="h-[450px] mt-5">
      <Chart chartType="ColumnChart" width="100%" height="100%" data={data} options={options} />
    </div>
  );
};

export default AdminCharts;
