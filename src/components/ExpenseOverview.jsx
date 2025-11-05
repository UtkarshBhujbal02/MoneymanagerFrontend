import {useEffect, useState} from "react";
import {prepareExpenseLineChartData} from "../util/util.js"; // Write this function like prepareIncomeLineChartData!
import CustomLineChart from "./CustomLineChart.jsx";
import {Plus} from "lucide-react";

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions ?? []);
        setChartData(result);
        return () => {};
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending over time and analyze your expense trends.
                    </p>
                </div>
                <button className="add-btn flex items-center gap-2" onClick={onAddExpense}>
                    <Plus size={15} className="text-lg" /> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview;
