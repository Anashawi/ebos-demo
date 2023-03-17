import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const Factors = () => {
   const [chartOptions, setChartOptions] = useState(null);
   const [chartData, setChartData] = useState([]);

   const initChartProps = () => {
      // var data = google.visualization.arrayToDataTable([
      //     ['Factor', 'Competitor1',
      //         {
      //             type: 'string',
      //             role: 'style'
      //         },
      //         'Competitor2',
      //         {
      //             type: 'string',
      //             role: 'style'
      //         },
      //         'Competitor3',
      //         {
      //             type: 'string',
      //             role: 'style'
      //         }
      //     ],
      //     ['Price', 2, null, {
      //         v: 1.1,
      //         f: 'poor'
      //     }, null, 1.2, null],
      //     ['Portfolio', 1, null, 3.1, null, 2.2, null],
      //     ['Quality', 2, null, 3.1, null, 3.2, null],
      //     ['Service', 1, null, 1.1, null, 3.2, null],
      //     ['Experience', 3, 'point {opacity: 1;  shape-type: star; fill-color: #a52714; }',
      //         1.1, 'point { opacity:1; shape-type: triangle; fill-color: #a52714; }',
      //         2.2, 'point { opacity: 1; shape-type: square; fill-color: #a52714; }'
      //     ]
      // ]);

      const competitor = [];
      const factor = [
         {
            id: 51,
            user_id: 2,
            name: "price",
            is_idea: 0,
            created_at: "2023-03-06T09:59:42.000000Z",
            updated_at: "2023-03-06T09:59:42.000000Z",
            competitors: [],
         },
         {
            id: 52,
            user_id: 2,
            name: "speed",
            is_idea: 0,
            created_at: "2023-03-06T09:59:42.000000Z",
            updated_at: "2023-03-06T09:59:42.000000Z",
            competitors: [],
         },
         {
            id: 53,
            user_id: 2,
            name: "network",
            is_idea: 0,
            created_at: "2023-03-06T09:59:42.000000Z",
            updated_at: "2023-03-06T09:59:42.000000Z",
            competitors: [],
         },
         {
            id: 54,
            user_id: 2,
            name: "maintenance",
            is_idea: 0,
            created_at: "2023-03-06T09:59:42.000000Z",
            updated_at: "2023-03-06T09:59:42.000000Z",
            competitors: [],
         },
         {
            id: 55,
            user_id: 2,
            name: "test",
            is_idea: 0,
            created_at: "2023-03-06T09:59:42.000000Z",
            updated_at: "2023-03-06T09:59:42.000000Z",
            competitors: [],
         },
      ];
      const factors = [];
      let chart = [];
      const fullChart = [];
      console.log(chart);
      factor.forEach((value, index) => {
         factors.push({ f: value.name, v: index });
         chart = [];
         chart.push(index);
         value.competitors.forEach((v, i) => {
            chart.push(v.pivot.scale);
         });

         fullChart.push(chart);
      });

      // var dt = new google.visualization.DataTable();

      // dt.addColumn("number", "Factor");
      // $.each(competitor, function (key, value) {
      //    dt.addColumn("number", value);
      // });

      // index factor1comp1 factors1comp2 factors1comp3
      // index factors2comp1 factors2comp2 ..etc

      // dt.addRows([
      //     [0, 2, 1.1, 3.2, 1],
      //     [1, 1, 2.1, 2.2, 1.3],
      //     [2, 3, 3.1, 2.2, 2.3],
      //     [3, 1, 3.1, 1.2, 2.3],
      // ]);

      // dt.addRows(fullChart);

      // setChartData(dt);

      setChartOptions({
         title: "Red ocean",
         pointSize: 15,
         tooltip: {
            trigger: "none",
         },
         legend: {
            position: "rigth",
         },
         lineWidth: 1,
         lineDashStyle: [2, 2],
         dataOpacity: 0.8,
         series: {
            0: {
               color: "black",
               pointShape: {
                  type: "star",
                  sides: 5,
                  dent: 0.5,
               },
            },
            1: {
               color: "#FDC61D",
               pointShape: "triangle",
            },
            2: {
               color: "#FDC61D",
               pointShape: "square",
            },
            3: {
               color: "#FDC61D",
               pointShape: "diamond",
            },
            4: {
               color: "#FDC61D",
               pointShape: "circle",
            },
            5: {
               color: "#FDC61D",
               pointShape: "polygon",
            },
         },
         hAxis: {
            textStyle: {
               bold: true,
            },
            allowContainerBoundaryTextCutoff: true,
            gridlines: {
               color: "#333",
            },
            ticks: factors,
         },
         vAxis: {
            ticks: [
               {
                  v: 0,
                  f: "",
               },
               {
                  v: 1,
                  f: "poor",
               },
               {
                  v: 1.5,
                  f: "",
               },
               {
                  v: 2,
                  f: "medium",
               },
               {
                  v: 2.5,
                  f: "",
               },
               {
                  v: 3,
                  f: "excellent",
               },
            ],
            gridlines: {
               color: "#eee",
            },
         },
      });
   };

   useEffect(() => {
      initChartProps();
   }, []);

   return (
      <>
         <div className='split-h'>
            <form action='http://bo.adpadelhouse.com/app/factors' method='post'>
               <input
                  type='hidden'
                  name='_token'
                  value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
               />
               <div className='pane-upper'>
                  <div className='px-12 py-8'>
                     <div className='flex justify-between items-center mb-10'>
                        <div>
                           <strong className='mr-1'>Mustafa Khairy </strong> |
                           <Link href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </Link>
                        </div>
                        <Link href='/' className='logo-pane mb-0'>
                           <h4 className='text-[3rem] text-yellow-green'>
                              20X
                           </h4>
                           <span className='relative -translate-x-[1.2rem]'>
                              revenue BY
                           </span>
                           <div className='w-[110px] h-[33px]'>
                              <Image
                                 width='55'
                                 height='0'
                                 src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                                 alt='CaseInPoint'
                              />
                           </div>
                        </Link>
                     </div>
                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Red ocean canvas
                     </h3>
                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        Add competing points
                     </h3>
                     <p>What do you compete with competitors on?</p>
                     <table className='flex flex-col w-full mt-7'>
                        <colgroup>
                           <col className='col-3/12' />
                           <col className='col-2/12' />
                           <col className='col-2/12' />
                           <col className='col-2/12' />
                           <col className='col-2/12' />
                        </colgroup>
                        <tbody>
                           <tr>
                              <th className='text-nowrap bg-gray-100 text-[700] shadow border-gray-200 border-[1px] w-[330px] p-3 w-full'>
                                 Points
                              </th>
                           </tr>
                        </tbody>
                        <tbody>
                           <tr>
                              <td className='p-3 border-gray-100 border-[1px] w-[330px]'>
                                 <input
                                    type='text'
                                    value='price'
                                    name='factor[]'
                                    className='p-3 bg-gray-100 outline-none caret-dark-blue border-none w-full factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                           <tr>
                              <td className='p-3 border-gray-100 border-[1px] w-[330px]'>
                                 <input
                                    type='text'
                                    value='speed'
                                    name='factor[]'
                                    className='p-3 bg-gray-100 outline-none caret-dark-blue border-none w-full factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                           <tr>
                              <td className='p-3 border-gray-100 border-[1px] w-[330px]'>
                                 <input
                                    type='text'
                                    value='network'
                                    name='factor[]'
                                    className='p-3 bg-gray-100 outline-none caret-dark-blue border-none w-full factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                           <tr>
                              <td className='p-3 border-gray-100 border-[1px] w-[330px]'>
                                 <input
                                    type='text'
                                    value='maintenance'
                                    name='factor[]'
                                    className='p-3 bg-gray-100 outline-none caret-dark-blue border-none w-full factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                           <tr>
                              <td className='p-3 border-gray-100 border-[1px] w-[330px]'>
                                 <input
                                    type='text'
                                    value='test'
                                    name='factor[]'
                                    className='p-3 bg-gray-100 outline-none caret-dark-blue border-none w-full factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     <div className='flex gap-5 py-5'>
                        <button className='btn'>Generate graph</button>
                        <Link href='/ebos' className='btn text-black-eerie'>
                           <strong>Back To Dashboard</strong>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className='pane-lower-gradient'>
                  <div className='page'>
                     <div className='chart-wrapper'>
                        <Chart
                           chartType='LineChart'
                           width='100%'
                           height='400px'
                           data={chartData}
                           options={chartOptions}
                           graphID='LineChart'
                           legendToggle
                        />
                     </div>
                     <div className='py-3'>
                        <button
                           className='btn text-black-eerie'
                           data-name='Red ocean canvas'
                           id=''>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                     {/* modal */}
                     {/* 
                     <div
                        className='fixed inset-0 z-[1030] bg-gray-battleship modal-center modal-overlay backdrop-blur'
                        data-trigger='.openideas'>
                        <div
                           className='fixed inset-0 overflow-hidden outline-none z-[1040px] dr-window'
                           role='dialog'
                           aria-labelledby='modaltitle'
                           tabindex='-1'>
                           <div className='relative w-auto m-6 pointer-events-none flex items-center h-[calc(100vh_-_1.5rem_*_2)] md:max-w-[700px] md:ml-auto md:mr-auto'>
                              <div className='modal-content dr-content'>
                                 <div className='flex items-center justify-between p-3 h-12'>
                                    <div className='modal-title'>
                                       <h2 className='text-[2.8rem]'>Ideas</h2>
                                       <h3 className='mb-6 f6 text-gray-gunmetal mb-5'>
                                          Add your ideas
                                       </h3>
                                    </div>
                                    <button
                                       type='button'
                                       className='modal-close dr-close'
                                       aria-label='Close'></button>
                                 </div>
                                 <div className='relative flex-auto p-3 overflow-auto' id='ideas-app'>
                                    <div className='idea-list'>
                                       <ul className='flex flex-col gap-3 mb-5'>
                                          <li>
                                             <span> some ideas </span>
                                             <button
                                                className='deleteIdea'
                                                data-id='1'
                                                type='button'>
                                                remove
                                             </button>
                                          </li>
                                          <li>
                                             <span> idea 2 </span>
                                             <button
                                                className='deleteIdea'
                                                data-id='2'
                                                type='button'>
                                                remove
                                             </button>
                                          </li>
                                          <li>
                                             <span> idea 3 </span>
                                             <button
                                                className='deleteIdea'
                                                data-id='3'
                                                type='button'>
                                                remove
                                             </button>
                                          </li>
                                       </ul>
                                       <li>
                                          <input
                                             type='text'
                                             className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none newIdea'
                                             placeholder='New idea'
                                          />
                                       </li>
                                    </div>

                                    <div className='mb-6'>
                                       <br />
                                       <button
                                          type='button'
                                          id='saveIdea'
                                          className='add-idea btn-rev'>
                                          Save
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div> */}
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default Factors;
