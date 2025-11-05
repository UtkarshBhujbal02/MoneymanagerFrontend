import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // Fetch expenses
    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch expense details');
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories (for expense)
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch expense categories');
        }
    };

    // Add expense
    const handleAddExpense = async (expense) => {
        // Validation logic (mirror your income logic)
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, expense);
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Added expense successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add expense');
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete expense');
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                    />
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense">
                        <AddExpenseForm
                            onAddExpense={handleAddExpense}
                            categories={categories}
                        />
                    </Modal>
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense">
                        <DeleteAlert content="Are you sure you want to delete this expense?"
                                     onDelete={() => deleteExpense(openDeleteAlert.data)} />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};

export default Expense;
