import React, {useEffect, useState} from "react";
import {getRequest} from "../utils/apiHandler.js";
import StatsCard from "./StatsCard.jsx";
import FormTitle from "./FormTitle.jsx";
import NumberStatsCard from "./NumberStatsCard.jsx";
import DateRangePicker from "./DateRangePicker.jsx";



export default function ({token, logoutFn, showNotification}) {
    const [addedProducts, setAddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);
    const [addedSales, setAddedSales] = useState([]);
    const [saleToday, setSaleToday] = useState(null);
    const [sale7Days, setSale7Days] = useState({sales: 0, revenue: 0, profit: 0, loss: 0, customers: 0});
    const [saleThisMonth, setSaleThisMonth] = useState({sales: 0, revenue: 0, profit: 0, loss: 0, customers: 0});
    const dateNow = new Date();
    const [startDate, setStartDate] = useState(new Date(dateNow.getFullYear(), dateNow.getMonth() - 5, dateNow.getDate(), 23, 59, 59));
    const [endDate, setEndDate] = useState(dateNow);

    async function getData(endpoint, callback, errorMessage) {
        const response = await getRequest(endpoint, {}, {token: `${token}`});
        if (response.status === 200) callback(response.data);
        else if (response.status === 401) logoutFn();
        else {
            showNotification("error", errorMessage + ": " + response.message);
            console.log(response, response.status, response.message);
        }
    }

    useEffect(() => {
        getData('get-products', data => setAddedProducts(data.products), 'fetch products');
        getData('get-services', data => setAddedServices(data.services), 'fetch services');
        getData('get-sales', data => setAddedSales(data.sales), 'fetch sales');

        getData(`get-sale-stats`, data => setSaleToday(data), 'fetch sale stats');

    }, []);

    function get_sale_stats_data() {
        getData(`get-sale-stats?startDate=${startDate}&endDate=${endDate}`, data => setSaleToday(data), 'fetch sale stats');
    }

    return (
        <div className='flex flex-col space-y-2 w-full'>
            <div className='flex flex-col space-y-1 p-1 mt-2 sm:mx-10'>
                <FormTitle text={"Total Stats"} />
                <div className='flex flex-wrap  justify-center'>
                    <StatsCard title={"Added Products"} arr={addedProducts} link={'/products'} bg={'bg-violet-400'} bgDark={'bg-violet-500'}/>
                    <StatsCard title={"Added Services"} arr={addedServices} link={'/services'} bg={'bg-red-400'} bgDark={'bg-red-500'}/>
                    <StatsCard title={"Added Sales"} arr={addedSales} link={'/sales'} bg={'bg-green-400'} bgDark={'bg-green-500'} />
                </div>
            </div>

            <div className='flex flex-col space-y-1 p-1 mt-2 sm:mx-10'>
                <FormTitle text={"Sale Stats"} />
                <div className='flex flex-wrap  justify-center'>
                    <DateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} submitCallBack={get_sale_stats_data} />
                    <NumberStatsCard stats={saleToday} />
                </div>
            </div>
        </div>
    )
}