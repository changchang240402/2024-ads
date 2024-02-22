import { BarChart } from '@mui/x-charts/BarChart';
import basicChartConfig from './BasicBarConfig';
export default function BasicBar({ data }) {
    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: basicChartConfig.xLabels }]}
            series={
                data.map(item => ({
                    data: item.data,
                    label: item.label
                }))
            }
            width={basicChartConfig.width}
            height={basicChartConfig.height}
            colors={basicChartConfig.colors}
        />
    );
}
