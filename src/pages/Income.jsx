import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert , setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //fetch income details from the api
    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        }catch (error) {
            console.error('Failed to fetch income details', error);
            toast.error(error.response?.data?.message || 'Failed to fetch income details');
        }finally {
            setLoading(false);
        }
    }

    //fetch categories for income
    const fetchIncomeCategories = async () => {
        try{
            const response =await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if(response.status === 200) {
                console.log('income categories',response.data);
                setCategories(response.data);
            }
        }catch (error) {
            console.log('Failed to fetch income categories', error);
            toast.error(error.response?.data?.message || 'Failed to fetch income categories');
        }
    }

    //Save the income details
    const handleAddIncome = async (income) => {
        const {name,amount,date,icon,categoryId} = income;

        //validation
        if(!name.trim()){
            toast.error("Please enter a valid name");
        }

        if(!amount || isNaN(amount) || Number(amount)<=10){
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!date){
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date>today){
            toast.error("Date cannot be in the future");
            return;
        }

        if(!categoryId){
            toast.error("Please select a category");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if(response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Added income successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        }catch (error) {
            console.log("Error add income", error);
            toast.error(error.response?.data?.message || 'Failed to add income');
        }
    }

    //delete income details
    const deleteIncome = async (id) => {
        try{
            await  axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false,data: null});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        }catch (error) {
            console.log("Error delete income", error);
            toast.error(error.response?.data?.message || 'Failed to delete income');
        }
    }

    const handleDownloadIncomeDetails = () => {
        console.log('Download income details');
    }

    const handleEmailIncomeDetails = () => {
        console.log('Email income details');
    }


    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])
    return (
        <Dashboard activeMenu = "Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">

                        {/*Overview for income with line chart*/}
                        <IncomeOverview transactions={incomeData} onAddIncome={()=> setOpenAddIncomeModal(true)} />


                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id)=>setOpenDeleteAlert({show: true, data:id})}
                        onDownload = {handleDownloadIncomeDetails}
                        onEmail = {handleEmailIncomeDetails}
                    />

                    {/*Add income modal*/}
                    <Modal
                    isOpen={openAddIncomeModal}
                    onClose={()=>setOpenAddIncomeModal(false)}
                    title="Add income">
                        <AddIncomeForm
                            onAddIncome={(income)=> handleAddIncome(income)}
                            categories={categories}/>
                    </Modal>

                    {/*Delete income modal*/}
                    <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=>setOpenDeleteAlert({show: false , data: null})}
                    title="Delete Income">
                        <DeleteAlert content="Are you sure you want to delete this Income?"
                                     onDelete={()=> deleteIncome(openDeleteAlert.data)} />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}
export default Income;