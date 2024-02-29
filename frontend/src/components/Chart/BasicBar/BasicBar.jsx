import { BarChart } from '@mui/x-charts/BarChart';
export default function BasicBar({ data, config, xLabels, type }) {
    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: xLabels }]}
            series={
                data.map(item => ({
                    data: item.data,
                    stack: type,
                    label: item.label
                }))
            }
            width={config.width}
            height={config.height}
            colors={config.colors}
        />
    );
}
