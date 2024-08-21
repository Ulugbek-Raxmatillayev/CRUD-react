import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { link } from './link';

function Table() {
  const [isInfo, setIsInfo] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [getCategory, setGetCategory] = useState([])
  const [getProducts, setGetProducts] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const name = useRef('')
  const desc = useRef('')
  const price = useRef('')
  const category = useRef('')

  const addItem = () => {
    const newData = {
      "name": name.current.value,
      "description": desc.current.value,
      "categoryId": category.current.value,
      "price": price.current.value
    }

    axios.post(link + 'product/save', newData)
      .then(res => {
        setGetProducts(res.data.body)
        toast.success("success added ")
      }).catch(err => {
        console.error(err);
        toast.error(err)
      })

    openAddModal()
  }
  const selectItem = (item) => {
    const filter = getProducts.filter((element) => element === item)
    setSelectedItem(filter)
  }

  const deleteItem = () => {
    axios.delete(link + `product/{id}?id=${selectedItem[0].id}`)
      .then(res => {
        setGetProducts(res.data.body)
        toast.success('Successfully')
      }).catch(err => {
        console.error(err);
        toast.error(err)
      })

    openDeleteModal()
  }

  const editItem = () => {
    const editData = {
      "name": name.current.value,
      "description": desc.current.value,
      "categoryId": selectedItem[0].categoryId,
      "price": price.current.value
    }

    axios.put(link + `product/update/${selectedItem[0].id}`, editData)
      .then(res => {
        setGetProducts(res.data.body)
        toast.success('succes')
        console.log(res);
      }).catch(err => {
        console.error(err)
        toast.error('ERROR')
      })

    openEditModal()
  }

  const openInfoModal = () => {
    setIsInfo(!isInfo)
    if (isInfo == false) {
      toast.info('Modal is Open')
    } else {
      toast.info('Modal is Close')
    }
  }

  const openDeleteModal = () => {
    setIsDelete(!isDelete)
    if (isDelete == false) {
      toast.info('Modal is Open')
    } else {
      toast.info('Modal is Close')
    }
  }

  const openAddModal = () => {
    setIsAdd(!isAdd)
    if (isAdd == false) {
      toast.info('Modal is Open')
    } else {
      toast.info('Modal is Close')
    }
  }

  const openEditModal = () => {
    setIsEdit(!isEdit)
    if (isEdit == false) {
      toast.info('Modal is Open')
    } else {
      toast.info('Modal is Close')
    }
  }

  useEffect(() => {

    axios.get(`${link}category/list`)
      .then(res => {
        setGetCategory(res.data.body);
        console.log(res);
      }).catch(err => { console.error(err); })

  }, [])

  useEffect(() => {

    axios.get(`${link}product/list`)
      .then(res => {
        setGetProducts(res.data.body)
      }).catch(err => { console.error(err); })

  }, [getProducts])

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(getProducts);
    } else {
      setFilteredProducts(getProducts.filter(product => product.categoryId === selectedCategory));
    }
  }, [getProducts, selectedCategory]);

  return (
    <div className='text-white'>
      <div className="container mx-auto relative top-20  ">
        <div className='mb-10'>
          <button onClick={() => (openAddModal())} className='px-5 py-2 mx-2 border bg-blue-800'>Add +</button>
        </div>
        <div className="category_btn mb-10">
          <button onClick={() => handleCategoryClick(null)} className='px-5 py-2 mx-2 border bg-blue-800'>All</button>
          {getCategory && getCategory.length > 0 &&
            getCategory.map((item) => {
              return (
                <button key={item.id}
                onClick={() => handleCategoryClick(item.id)} className='px-5 py-2 mx-2 border bg-blue-800'>{item.name}</button>
              )
            })
          }
        </div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Describtion
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredProducts && filteredProducts.length > 0 &&
                filteredProducts.map((item) => (
                  <tr key={item.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.price} so'm</td>
                    <td className="px-6 py-4 text-right flex gap-2">
                      <button onClick={() => (openInfoModal(), selectItem(item))} type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Info</button>
                      <button onClick={() => (openEditModal(), selectItem(item))} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit</button>
                      <button onClick={() => (openDeleteModal(), selectItem(item))} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>

      {isInfo &&
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Info Product
                </h3>
                <button onClick={openInfoModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5 space-y-4">
                {selectedItem && selectedItem.length > 0 &&
                  selectedItem.map((item) => {
                    return (
                      <div className='flex flex-col flex-wrap justify-center  items-start mx-28'>
                        <h3 className='text-yellow-300'><span className='text-green-600'>Kategoriya:  </span>{item.categoryId}</h3>
                        <h3 className='text-yellow-300'><span className='text-green-600'>Produkt id:  </span>{item.id}</h3>
                        <h3 className='text-yellow-300'><span className='text-green-600'>Nomi:  </span>{item.name}</h3>
                        <h3 className='text-yellow-300'><span className='text-green-600'>Tavsifi:  </span>{item.description}</h3>
                        <h3 className='text-yellow-300'><span className='text-green-600'>Narxi:  </span>{item.price} so'm</h3>
                      </div>
                    )
                  })

                }
              </div>
              <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={openInfoModal} data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button onClick={openInfoModal} data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
              </div>
            </div>
          </div>
        </div>
      }

      {isEdit &&
        <div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Product
                </h3>
                <button onClick={openEditModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                  <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input ref={name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                  </div>
                  <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input ref={desc} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                  </div>
                  <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input ref={price} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                  </div>

                </div>
                <button onClick={editItem} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Edit Item
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {isDelete &&
        <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onClick={openDeleteModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
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
                <button onClick={deleteItem} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes, I'm sure
                </button>
                <button onClick={openDeleteModal} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      }

      {isAdd &&
        <div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product
                </h3>
                <button onClick={openAddModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                  <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input ref={name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input ref={price} type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select ref={category} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select category</option>
                      <option value="1">Wer</option>
                      <option value="2">Meva</option>
                      <option value="3">Kiyim</option>
                      <option value="4">Uy jihozlari</option>
                      <option value="6">Oyoq kiyim</option>
                      <option value="7">Sabzavot</option>
                    </select>
                  </div>
                  <div class="col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <input ref={desc} type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description..." />
                  </div>
                </div>
                <button onClick={addItem} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  Add new product
                </button>
              </div>
            </div>
          </div>
        </div>

      }
      <ToastContainer />
    </div>
  )
}

export default Table