import Chart from "react-google-charts";
import useCategoryChart from "../AdminHooks/useCategoryChart";
import Loading from "../../../Shared/Loading/Loading";


const TypesofShop = () => {
    const [cateChart, , isLoading] = useCategoryChart();
    if(isLoading){
        return <Loading></Loading>
    }
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