import React from 'react';
import KeyVal from "./KeyVal.jsx";

const NumberStatsCard = ({ stats }) => {
    if (!stats) return null;
    const {
        totalSales,
        totalRevenue,
        totalDiscountAmount,
        totalTaxAmount,
        totalProfit,
        uniqueCustomerCount,
        salesPersonLeaderboard,
        productSaleLeaderboard,
        serviceSaleLeaderboard
    } = stats;

    return (
        <div className='flex flex-row flex-wrap w-full justify-evenly'>
            <section className='flex flex-col space-y-2 p-2 mx-1 m-2 shadow-lg'>
                <h3 className='p-1 text-xl font-semibold font-serif text-gray-900'>General Statistics</h3>
                <KeyVal ignoreArrays={true} obj={{
                    totalSales,
                    totalRevenue,
                    totalDiscountAmount,
                    totalTaxAmount,
                    totalProfit,
                    uniqueCustomerCount
                }} />
            </section>
            <section className='space-y-2 p-2 mx-1 m-2 shadow-lg'>
                <h4 className='p-1 text-xl font-semibold font-serif text-gray-900'>Sales Person Leaderboard</h4>
                {
                    salesPersonLeaderboard && Object.keys(salesPersonLeaderboard).length !== 0 ?
                        <table>
                            <thead>
                            <tr className='border-b border-b-gray-600'>
                                <th className={'border-r'}>Email</th>
                                <th className={'border-r'}>Sales Count</th>
                                <th className={'border-r'}>Revenue</th>
                                <th className={'border-r'}>Profit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(salesPersonLeaderboard).map(([email, stats]) => (
                                <tr className='border-b border-b-gray-300' key={email}>
                                    <td className={'border-r'}>{email}</td>
                                    <td className={'border-r'}>{stats.salesCount}</td>
                                    <td className={'border-r'}>{stats.revenue}</td>
                                    <td className={'border-r'}>{stats.profit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : <p>No entries</p>
                }
            </section>
            <section className='p-2 mx-1 mb-2 shadow-lg'>
                <h4 className='p-1 text-xl font-semibold font-serif text-gray-900'>Product Sale Leaderboard</h4>
                {
                    productSaleLeaderboard && Object.keys(productSaleLeaderboard).length !== 0 ?
                        <table>
                            <thead>
                            <tr className='border-b border-b-gray-600'>
                                <th className={'border-r'}>Item Name With Code</th>
                                <th className={'border-r'}>Sales Count</th>
                                <th className={'border-r'}>Revenue</th>
                                <th className={'border-r'}>Profit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(productSaleLeaderboard).map(([itemNameWithCode, stats]) => (
                                <tr className='border-b border-b-gray-300' key={itemNameWithCode}>
                                    <td className={'border-r'}>{itemNameWithCode}</td>
                                    <td className={'border-r'}>{stats.salesCount}</td>
                                    <td className={'border-r'}>{stats.revenue}</td>
                                    <td className={'border-r'}>{stats.profit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : <p>No entries</p>
                }
            </section>
            <section className=' p-2 mx-1 mb-2 shadow-lg'>
                <h4 className='p-1 text-xl font-semibold font-serif text-gray-900'>Service Sale Leaderboard</h4>
                {
                    serviceSaleLeaderboard && Object.keys(serviceSaleLeaderboard).length !== 0 ?
                        <table>
                            <thead>
                            <tr className='border-b border-b-gray-600'>
                                <th className={'border-r'}>Item</th>
                                <th className={'border-r'}>Sales Count</th>
                                <th className={'border-r'}>Revenue</th>
                                <th className={'border-r'}>Profit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(serviceSaleLeaderboard).map(([itemNameWithCode, stats]) => (
                                <tr className='border-b border-b-gray-300' key={itemNameWithCode}>
                                    <td className={'border-r'}>{itemNameWithCode}</td>
                                    <td className={'border-r'}>{stats.salesCount}</td>
                                    <td className={'border-r'}>{stats.revenue}</td>
                                    <td className={'border-r'}>{stats.profit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : <p>No entries</p>
                }
            </section>
        </div>
    );
};

export default NumberStatsCard;