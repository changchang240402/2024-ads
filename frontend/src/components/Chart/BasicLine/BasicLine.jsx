// Remove the unused import statement for React
import { LineChart } from '@mui/x-charts/LineChart';
import basicLineConfig from './BasicLineConfig';

const BasicLine = ({ data }) => {
    return (
        <LineChart
            width={basicLineConfig.width}
            height={basicLineConfig.height}
            series={
                data.map(({ label, data }) => ({ label, data }))
            }
            xAxis={[{ scaleType: 'point', data: basicLineConfig.xLabels }]}
            colors={basicLineConfig.colors}
        />
    )
}

export default BasicLine
