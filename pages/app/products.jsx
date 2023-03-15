import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import IdeasModal from "../../components/app/ideas-modal";
import useToggler from "../../components/hooks/useToggler";

class ProductFuture {
   year = 2023;
   level = 55;
   sales = 75;
}

class Product {
   id = 0;
   name = "Product Example";
   futures = [new ProductFuture()];
}

const Products = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useToggler();
   const [product, setProduct] = useState(new Product());
   const [chartOptions, setChartOptions] = useState(null);
   const [chartData, setChartData] = useState([]);

   useEffect(() => {
      // const dt = new google.visualization.DataTable();

      // dt.addColumn("string", "Product");
      // dt.addColumn("number", "Year");
      // dt.addColumn("number", "Level");
      // dt.addColumn("string", "Color");
      // dt.addColumn("number", "Sales");

      // const rows = product.futures
      //    .sort((a, b) => {
      //       if (a.year < b.year) return -1;
      //       return 1;
      //    })
      //    .map((n, i) => {
      //       return ["", i + 1, parseInt(n.level), "blue", parseInt(n.sales)];
      //    });
      // dt.addRows(rows);

      const ticks = product.futures.map((n, i) => {
         return {
            v: i + 1,
            f: n.year.toString(),
         };
      });

      setChartOptions({
         title: "Product future",
         legend: {
            position: "top",
         },
         tooltip: {
            trigger: "none",
         },
         hAxis: {
            textStyle: {
               bold: true,
            },
            allowContainerBoundaryTextCutoff: false,
            gridlines: {
               color: "#eee",
            },
            baseline: 0,
            maxValue: 4,
            ticks: ticks,
         },
         vAxis: {
            baseline: 0,
            maxValue: 4,
            ticks: [
               {
                  v: 1,
                  f: "Settler",
               },
               {
                  v: 2,
                  f: "Migrate",
               },
               {
                  v: 3,
                  f: "Poineer",
               },
            ],
            gridlines: {
               color: "#eee",
            },
         },
         bubble: {
            textStyle: {
               fontSize: 11,
            },
         },
         chartArea: {
            left: 50,
            top: 0,
            width: "100%",
            height: "90%",
         },
      });
   }, []);

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md:w-1/2 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Pioneer, Migrator, Settler
                     </h3>
                     <div id='products-app'>
                        <ul className='flex gap-3 mb-12'>
                           <select className='grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                              <option value='2' p-id='2'>
                                 Contingent Workforce
                              </option>
                              <option value='3' p-id='3' selected='selected'>
                                 Consulting Offering
                              </option>
                           </select>
                           <button className='p-2 text-black-eerie deleteProduct'>
                              <FontAwesomeIcon
                                 className='w-6 h-auto text-gray-300 hover:text-rose-800'
                                 icon={faTrash}
                              />
                           </button>
                        </ul>
                        <div className='flex justify-end'>
                           <a
                              id='addNewProduct'
                              className='btn blue-gradient text-black-eerie'>
                              <b>+</b> Add new product
                           </a>
                        </div>
                        <br />
                        <div className='flex flex-col gap-7'>
                           <div className='flex flex-col gap-3 border-b border-gray-300 pb-7 spacedout'>
                              <div>
                                 <label>Product name</label>
                                 <input
                                    type='text'
                                    className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    name='product-name'
                                 />
                              </div>
                           </div>
                           <div className='flex flex-col gap-3 border-b border-gray-300 pb-7 spacedout'>
                              <div>
                                 <label>Present</label>
                                 <input
                                    id='first_date'
                                    type='text'
                                    className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    placeholder='year'
                                    name='present-year'
                                 />
                              </div>
                              <div></div>
                              <div className='flex flex-wrap gap-4'>
                                 <div className='flex gap-2'>
                                    <input
                                       name='present-level'
                                       type='radio'
                                       value='1'
                                    />
                                    <label className='rbreath'>Settler</label>
                                 </div>
                                 <div className='flex gap-2'>
                                    <input
                                       name='present-level'
                                       type='radio'
                                       value='2'
                                    />
                                    <label className='rbreath'>Migrator</label>
                                 </div>
                                 <div className='flex gap-2'>
                                    <input
                                       name='present-level'
                                       type='radio'
                                       value='3'
                                    />
                                    <label className='rbreath'>Pioneer</label>
                                 </div>
                              </div>
                              <div>
                                 <label>Sales (%)</label>
                                 <input
                                    name='present-sales'
                                    type='range'
                                    min='0'
                                    max='100'
                                    list='salesmarks'
                                    className='w-full accent-blue-true'
                                    step='10'
                                 />
                                 <datalist id='salesmarks' className='dl-100'>
                                    <option value='0' label='0%'></option>
                                    <option value='10'></option>
                                    <option value='20'></option>
                                    <option value='30'></option>
                                    <option value='40'></option>
                                    <option value='50' label='50%'></option>
                                    <option value='60'></option>
                                    <option value='70'></option>
                                    <option value='80'></option>
                                    <option value='90'></option>
                                    <option value='100' label='100%'></option>
                                 </datalist>
                              </div>
                           </div>
                           <div className='flex flex-col gap-3 border-b border-gray-300 pb-7 spacedout'>
                              <div>Future 1</div>
                              <div>
                                 <input
                                    name='future-one-year'
                                    type='text'
                                    className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    placeholder='year'
                                 />
                              </div>
                              <div></div>
                              <div className='flex flex-wrap gap-4'>
                                 <div className='flex gap-2'>
                                    <input
                                       name='future-one-level'
                                       type='radio'
                                       value='1'
                                    />
                                    <label className='rbreath'>Settler</label>
                                 </div>
                                 <div className='flex gap-2'>
                                    <input
                                       name='future-one-level'
                                       type='radio'
                                       value='2'
                                    />
                                    <label className='rbreath'>Migrator</label>
                                 </div>
                                 <div className='flex gap-2'>
                                    <input
                                       name='future-one-level'
                                       type='radio'
                                       value='3'
                                    />
                                    <label className='rbreath'>Pioneer</label>
                                 </div>
                              </div>
                              <div>
                                 <label>Sales (%)</label>
                                 <input
                                    name='future-one-sales'
                                    type='range'
                                    min='0'
                                    max='100'
                                    list='salesmarks'
                                    className='w-full accent-blue-true'
                                    step='10'
                                 />
                                 <datalist id='salesmarks' className='dl-100'>
                                    <option value='0' label='0%'></option>
                                    <option value='10'></option>
                                    <option value='20'></option>
                                    <option value='30'></option>
                                    <option value='40'></option>
                                    <option value='50' label='50%'></option>
                                    <option value='60'></option>
                                    <option value='70'></option>
                                    <option value='80'></option>
                                    <option value='90'></option>
                                    <option value='100' label='100%'></option>
                                 </datalist>
                              </div>
                           </div>
                           <div className='flex flex-col gap-3 border-b border-gray-300 pb-7 spacedout'>
                              <div>Future 2</div>
                              <div>
                                 <input
                                    name='future-two-year'
                                    type='text'
                                    className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    placeholder='year'
                                 />
                              </div>
                              <div></div>
                              <div className='flex flex-wrap gap-4'>
                                 <div className='flex gap-2'>
                                    <input
                                       name='future-two-level'
                                       type='radio'
                                       value='1'
                                    />
                                    <label className='rbreath'>Settler</label>
                                 </div>

                                 <div className='flex gap-2'>
                                    <input
                                       name='future-two-level'
                                       type='radio'
                                       value='2'
                                    />
                                    <label className='rbreath'>Migrator</label>
                                 </div>
                                 <div className='flex gap-2'>
                                    <input
                                       name='future-two-level'
                                       type='radio'
                                       value='3'
                                    />
                                    <label className='rbreath'>Pioneer</label>
                                 </div>
                              </div>
                              <div>
                                 <label>Sales (%)</label>
                                 <input
                                    name='future-two-sales'
                                    type='range'
                                    min='0'
                                    max='100'
                                    list='salesmarks'
                                    className='w-full accent-blue-true'
                                    step='10'
                                 />
                                 <datalist id='salesmarks' className='dl-100'>
                                    <option value='0' label='0%'></option>
                                    <option value='10'></option>
                                    <option value='20'></option>
                                    <option value='30'></option>
                                    <option value='40'></option>
                                    <option value='50' label='50%'></option>
                                    <option value='60'></option>
                                    <option value='70'></option>
                                    <option value='80'></option>
                                    <option value='90'></option>
                                    <option value='100' label='100%'></option>
                                 </datalist>
                              </div>
                           </div>
                           <div id='addProduct' className='flex gap-3 mt-10'>
                              <button
                                 id='create-product'
                                 className='btn-rev'
                                 type='button'>
                                 Add and generate
                              </button>
                              <a href='/ebos' className='btn text-black-eerie'>
                                 <strong>Back To Dashboard</strong>
                              </a>
                           </div>
                           <div
                              id='updateProduct'
                              className='hidden flex gap-3 mt-10'>
                              <button
                                 id='updateButton'
                                 className='btn-rev'
                                 type='button'>
                                 Save and generate
                              </button>
                              <a href='/ebos' className='btn text-black-eerie'>
                                 <strong>Back To Dashboard</strong>
                              </a>
                           </div>
                        </div>
                        {/* function drawChart(product) {
        var dt = new google
            .visualization
            .DataTable();

        dt.addColumn('string', 'Product');
        dt.addColumn('number', 'Year');
        dt.addColumn('number', 'Level');
        dt.addColumn('string', 'Color');
        dt.addColumn('number', 'Sales');

        const rows = product.futures.sort((a,b) => {
            if (a.year < b.year) return -1;
            return 1;
        }).map((n, i) => {
            return [
                '', i + 1, parseInt(n.level), 'blue', parseInt(n.sales)
            ]
        });
        dt.addRows(rows);

        const ticks = product.futures.map((n, i) => {
            return {

        v: i + 1,
                f: n.year.toString()

            }
        });

        var options = {
        title: 'Product future',
            legend: {
        position: 'top'
            },
            tooltip: {
        trigger: 'none'
            },
            hAxis: {
        textStyle: {
        bold: true
                },
                allowContainerBoundaryTextCutoff: false,
                gridlines: {
        color: '#eee'
                },
                baseline: 0,
                maxValue: 4,
                ticks: ticks,
            },
            vAxis: {
        baseline: 0,
                maxValue: 4,
                ticks: [{
        v: 1,
                    f: 'Settler'
                }, {
        v: 2,
                    f: 'Migrate'
                }, {
        v: 3,
                    f: 'Poineer'
                }],
                gridlines: {
        color: '#eee'
                }
            },
            bubble: {
        textStyle: {
        fontSize: 11
                }
            },
            chartArea: {
        left: 50,
                top: 0,
                width: '100%',
                height: '90%'
            }
        };

        var chart = new google.visualization.BubbleChart(document.getElementById('thechart'));
        chart.draw(dt, options);
    }

    google.charts.load('current', {
        'packages': ['corechart']
    }); */}
                     </div>
                  </div>
                  <div className='md:w-1/2 pane-right-gradient min-h-screen p-12'>
                     <div className=''>
                        <button
                           type='button'
                           className='btn text-black-eerie'
                           onClick={toggleIdeasModal}>
                           My ideas
                        </button>
                     </div>
                     <Link href='/' className='logo-pane'>
                        <h4 className='text-[3rem] text-white'>20X</h4>
                        <span className='relative -translate-x-[1.2rem]'>
                           revenue BY
                        </span>
                        <div className='w-[110px] h-[33px]'>
                           <Image
                              width='55'
                              height='20'
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>
                     <div className='chart-wrapper'>
                        <Chart
                           chartType='BubbleChart'
                           width='100%'
                           height='400px'
                           data={chartData}
                           options={chartOptions}
                           legendToggle
                        />
                     </div>
                     <div className='breath'>
                        <button
                           className='btn text-black-eerie'
                           data-name='Pioneer, Migrate, Settler'
                           id='theSubmitBtn'>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Products;
