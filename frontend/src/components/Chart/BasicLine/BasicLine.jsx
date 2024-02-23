// Remove the unused import statement for React
import { LineChart } from '@mui/x-charts/LineChart';
import basicLineConfig from './BasicLineConfig';

const BasicLine = ({ data, xLabels }) => {
    return (
        <LineChart
            width={basicLineConfig.width}
            height={basicLineConfig.height}
            series={
                data.map(({ label, data }) => ({ label, data }))
            }
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            colors={basicLineConfig.colors}
        />
    )
}

export default BasicLine
