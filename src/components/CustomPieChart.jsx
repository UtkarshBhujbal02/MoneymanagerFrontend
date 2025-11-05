import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <div style={{ width: '100%', height: 300, position: 'relative' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={450}
                        label={false}
                        isAnimationActive={false}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                        ))}
                    </Pie>

                    {/* Center stacked label ABOVE amount */}
                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="46%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={18}
                                fontWeight={500}
                                fill="#4A2249"
                                fontFamily="outfit"
                                style={{ pointerEvents: 'none' }}
                            >
                                {label}
                            </text>
                            <text
                                x="50%"
                                y="54%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={30}
                                fontWeight={500}
                                fill="#191825"
                                fontFamily="outfit"
                                style={{ pointerEvents: 'none' }}
                            >
                                {totalAmount}
                            </text>
                        </>
                    )}

                    <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ marginTop: 16 }}
                        iconType="circle"
                        formatter={(val, entry, i) => (
                            <span style={{ color: colors[i % colors.length], fontWeight: 500 }}>{val}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
