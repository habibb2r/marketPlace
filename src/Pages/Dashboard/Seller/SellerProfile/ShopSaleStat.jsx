
import { Chart } from "react-google-charts";




const ShopSaleStat = () => {
    const data = [
        ["Days", "Sales"],
        ["2013", 1000],
        ["2014", 1170],
        ["2015", 660],
        ["2016", 1030],
      ];
      
      const options = {
        chart: {
          title: "Company Performance",
          subtitle: "Sales and Expenses over the Years",
        },
      };
    return (
        <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
        
            

    );
};

export default ShopSaleStat;