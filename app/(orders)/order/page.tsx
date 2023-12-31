export default function Placed(){
      return (
  
        <section className="h-screen py-12 bg-gray-100 sm:py-16 lg:py-20">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
            </div>
            <div className="max-w-md mx-auto mt-8 md:mt-12">
              <div className="bg-white shadow-lg rounded-3xl">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      <li className="flex flex-col py-6 space-y-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="relative shrink-0">
                          <span className="absolute flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border rounded-full shadow top-1 left-1 sm:-top-2 sm:-right-2">1</span>
                          <img className="object-cover w-24 h-24 max-w-full rounded-lg" src="https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=60" alt="" />
                        </div>
                        <div className="relative flex flex-col justify-between flex-1">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">Nike Air Max 2019</p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p>
                            </div>
                            <div className="flex items-end justify-between mt-4 sm:mt-0 sm:items-start sm:justify-end">
                              <p className="w-20 text-base font-semibold text-gray-900 shrink-0 sm:order-2 sm:ml-8 sm:text-right">$1259.00</p>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button type="button" className="flex p-2 text-center text-gray-500 transition-all duration-200 ease-in-out rounded focus:shadow hover:text-gray-900">
                              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="flex flex-col py-6 space-y-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="relative shrink-0">
                          <span className="absolute flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border rounded-full shadow top-1 left-1 sm:-top-2 sm:-right-2">1</span>
                          <img className="object-cover w-24 h-24 max-w-full rounded-lg" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60" alt="" />
                        </div>
                        <div className="relative flex flex-col justify-between flex-1">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">Nike Air Max 2019</p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p>
                            </div>
                            <div className="flex items-end justify-between mt-4 sm:mt-0 sm:items-start sm:justify-end">
                              <p className="w-20 text-base font-semibold text-gray-900 shrink-0 sm:order-2 sm:ml-8 sm:text-right">$1259.00</p>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button type="button" className="flex p-2 text-center text-gray-500 transition-all duration-200 ease-in-out rounded focus:shadow hover:text-gray-900">
                              <svg className="block w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> */}
                  <div className="py-8 mt-6 space-y-3 border-t border-b">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">$2399.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">$8.00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> 2499.00</p>
                  </div>
                  <div className="mt-6 text-center">
                    <button type="button" className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out bg-orange-500 rounded-md group focus:shadow hover:bg-gray-800">
                      Place Order
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-4 transition-all group-hover:ml-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
