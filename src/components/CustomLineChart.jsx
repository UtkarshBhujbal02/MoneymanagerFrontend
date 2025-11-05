import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const point = payload[0].payload;
        return (
            <div className="p-2 bg-white rounded border shadow text-xs">
                <div><strong>{point.month}</strong></div>
                <div>
                    <span>Total: </span>
                    <span className="text-purple-700 font-bold">₹{point.totalAmount.toLocaleString()}</span>
                </div>
                <div>
                    <span>Details:</span><br/>
                    {point.items.map((item, idx) => (
                        <span key={idx}>{item.categoryName}: ₹{item.amount}{idx !== point.items.length-1 ? ', ':''}</span>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data }) => {
    if (!Array.isArray(data) || !data.length) return <div>No data</div>;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{top: 24, right: 24, left: 0, bottom: 24}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="totalAmount" stroke="#7C3AED" strokeWidth={3} dot={true} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
