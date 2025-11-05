import moment from "moment";

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    //Covert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split(',');

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    //Regex for indain numbering system
    //it handles rhe first three digits , then every two digits
     const lastThree = integerPart.substring(integerPart.length -3);
     const otherNumbers = integerPart.substring(0, integerPart.length -3);

     if(otherNumbers !== ''){
         //Apply comma after every two digits for the 'otherNumbers' part
         const formattedNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
         integerPart = formattedNumbers + ',' + lastThree;
     }else{
         integerPart = lastThree;   //No change if less than 4 digits
     }

     //Combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};




export function prepareIncomeLineChartData(transactions = []) {
    // Group by date
    const grouped = {};

    transactions.forEach(item => {
        const date = item.date; // "2025-07-06"
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
    });

    const result = Object.entries(grouped)
        .sort(([dateA], [dateB]) => (dateA > dateB ? 1 : -1))
        .map(([date, items]) => ({
            date,
            totalAmount: items.reduce((sum, t) => sum + Number(t.amount), 0),
            items,
            month: moment(date).format("Do MMM") // "6th Jul"
        }));

    return result;
}

export function prepareExpenseLineChartData(transactions = []) {
    // Group by date
    const grouped = {};

    transactions.forEach(item => {
        const date = item.date; // "2025-07-06"
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
    });


    const result = Object.entries(grouped)
        .sort(([dateA], [dateB]) => (dateA > dateB ? 1 : -1))
        .map(([date, items]) => ({
            date,
            totalAmount: items.reduce((sum, t) => sum + Number(t.amount), 0),
            items,
            month: moment(date).format("Do MMM") // "6th Jul"
        }));

    return result;
}



