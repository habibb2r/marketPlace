import Chart from "react-google-charts";
import useCategoryChart from "../AdminHooks/useCategoryChart";


const TypesofShop = () => {
    const [cateChart, , isLoading] = useCategoryChart();
    console.log(cateChart)
    const data = [
        ["Task", "Hours per Day"],
        ...cateChart.uniqueShopStat.map((item) => item),
      
      ];

      const options = {
        title: "Type of Shop",
      };
    return (
        <div>
            <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
        </div>
    );
};

export default TypesofShop;