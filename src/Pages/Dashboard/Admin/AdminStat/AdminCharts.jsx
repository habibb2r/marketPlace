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
    ...cateChart.map((item) => item),
  ];
  console.log(data);
  return (
    <div className="h-[450px] mt-5">
        <p className="font-semibold text-center text-xl">Categorial Product Qunatity </p>
      <Chart chartType="ColumnChart" width="100%" height="100%" data={data} />
    </div>
  );
};

export default AdminCharts;
