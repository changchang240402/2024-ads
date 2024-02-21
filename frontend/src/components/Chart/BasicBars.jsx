import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }]}
            width={500}
            height={300}
        />
    );
}
