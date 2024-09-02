import React from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useGetAllShops from '../AdminHooks/useGetAllShops';
import trash from '../../../../assets/admin/png/trash.png'
import ids from '../../../../assets/admin/png/001-id.png'
import stalltype from '../../../../assets/admin/png/003-application.png'
import totalProducts from '../../../../assets/admin/png/002-cubes.png'

const ManageShop = () => {
    const [allshops, refetch, loadShops] = useGetAllShops()
    console.log(allshops)
    return (
        <div>
            <SectionTitle title='Manage Shops'></SectionTitle>
            <div className='grid md:grid-cols-2 gap-5'>
                {allshops?.map(shop => <div className='bg-accent bg-opacity-25 shadow-lg shadow-success py-4 px-3 rounded-lg hover:bg-secondary hover:bg-opacity-25 transition-transform duration-300 ease-in-out hover:scale-[102%]' key={shop}>
                    <div className='flex justify-between gap-5 items-center py-2'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-2xl font-sans font-bold'>{shop.shopName}</h1>
                            <div className='flex items-center gap-2'>
                                <img className='h-[35px]' src={ids} alt="" />
                                <p className='font-semibold'>Shop ID : <span>{shop.shopId}</span></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                           <div className='flex items-center gap-2'>
                            <img className='h-[35px]' src={totalProducts} alt="" />
                             <p className='font-sans font-semibold'>Total Products: <span className='shadow-sm rounded-xl py-2 px-2 shadow-success'>{shop.totalProducts}</span></p>
                           </div>
                           <div className='flex items-center gap-2'>
                            <img className='h-[35px]' src={stalltype} alt="" />
                             <p className='font-sans font-semibold'>Shop Type: <span className='shadow-sm rounded-xl py-2 px-2 shadow-success'>{shop.stallType}</span></p>
                           </div>
                        </div>
                    </div>
                    <div className='flex justify-center bg-success bg-opacity-25 py-2 rounded-md'>
                        <img className='h-[45px]' src={trash} alt="" />
                    </div>
                </div>)}
            </div>

        </div>
    );
};

export default ManageShop;