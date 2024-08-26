import { useEffect, useState } from 'react'
import AdminScreen from '.'
import { apiUrl } from '../../helpers/url'
import axios from 'axios'
import { toast } from 'react-toastify'
import { config } from '../../helpers/token'

function AdminProducts() {
    const [products, setProducts] = useState(null)
    const [isDelete, setIsDelete] = useState(false)


    const openDelete = () => {
        setIsDelete(!isDelete)
    }

    function fetchProducts() {
        axios.get(`${apiUrl}product/list`)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.body)
                } else {
                    setProducts([])
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Failed to fetch products')
            })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    function deleteProduct(productId) {
        if (config && productId) {
            axios.delete(`${apiUrl}product/${productId}`, config)
                .then(response => {
                    if (response.data.success) {
                        toast.success('Product deleted successfully')
                        fetchProducts()
                        openDelete()
                    } else {
                        toast.error('Failed to delete product')
                    }
                }).catch(() => {
                    toast.error('Failed to delete product')
                })
        } else {
            toast.error('server error')
        }
    }

    return (
        <AdminScreen title={'Client'} footerTxt={'admin-controller'}>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product, key) =>
                            <>
                                <tr key={key} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {key + 1}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {product.description}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        <p onClick={openDelete} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">delete</p>
                                    </td>
                                </tr>
                                {isDelete &&
                                    <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div class="relative p-4 w-full max-w-md max-h-full">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button onClick={openDelete} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                                <div class="p-4 md:p-5 text-center">
                                                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                                    <button onClick={() => deleteProduct(product.id)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                        Yes, I'm sure
                                                    </button>
                                                    <button onClick={openDelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }
                            </>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminScreen>
    )
}

export default AdminProducts
