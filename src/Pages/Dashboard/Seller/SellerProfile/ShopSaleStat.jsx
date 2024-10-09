
import { Chart } from "react-google-charts";

const ShopSaleStat = () => {
    const data = [
        ["Days", "Sales"],
        ["June", 1000],
        ["July", 1170],
        ["Auguest", 660],
        ["September", 1030],
      ];
      
      const options = {
        chart: {
          title: "Stall Performance",
          subtitle: "Sales over the Monthes",
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