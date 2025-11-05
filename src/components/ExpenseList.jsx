import TransactionInfoCard from "./TransactionInfoCard.jsx"; // reuse for expenses
import {Download, Mail, Trash2} from "lucide-react"; // icons as needed

const ExpenseList = ({
                         transactions = [],
                         onDelete = () => {},
                         onDownload = () => {},
                         onEmail = () => {},
                     }) => {
    return (
        <div className="card mt-8">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold">All Expenses</h5>
                {/*<div className="flex gap-3">*/}
                {/*    <button className="add-btn" onClick={onDownload}>*/}
                {/*        <Download size={16}/> Download*/}
                {/*    </button>*/}
                {/*    <button className="add-btn" onClick={onEmail}>*/}
                {/*        <Mail size={16}/> Email*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
            {transactions.length === 0 ? (
                <p className="text-gray-500">No expenses found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {transactions.map((expense) => (
                        <TransactionInfoCard
                            key={expense.id}
                            title={expense.name}
                            icon={expense.icon}
                            date={expense.date}
                            amount={expense.amount}
                            type="expense"
                            category={expense.categoryName}
                            onDelete={() => onDelete(expense.id)}
                            // You might want to pass hideDeletebtn={false} depending on your design
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
