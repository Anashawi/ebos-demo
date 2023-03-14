import Link from "next/link";

const Factors = () => {
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
                  <div className='page'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <Link href='http://bo.adpadelhouse.com/logout'>
                           logout
                        </Link>
                     </div>

                     <Link href='/' className='logo-pane'>
                        <h4>20X</h4>
                        <span className='rev'>revenue BY</span>
                        <div className='logo'>
                           <img
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>

                     <h3 className='f3 spaced yellow'>Red ocean canvas</h3>

                     <h3 className='f3 spaced weight-normal'>
                        Add competing points
                     </h3>
                     <p>What do you compete with competitors on?</p>

                     <table className='rich w100'>
                        <colgroup>
                           <col className='c-3' />
                           <col className='c-2' />
                           <col className='c-2' />
                           <col className='c-2' />
                           <col className='c-2' />
                        </colgroup>
                        <tbody>
                           <tr>
                              <th className='text-nowrap'>Points</th>
                           </tr>
                        </tbody>
                        <tbody>
                           <tr>
                              <td>
                                 <input
                                    type='text'
                                    value='price'
                                    name='factor[]'
                                    className='text-input w100 factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>

                           <tr>
                              <td>
                                 <input
                                    type='text'
                                    value='speed'
                                    name='factor[]'
                                    className='text-input w100 factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>

                           <tr>
                              <td>
                                 <input
                                    type='text'
                                    value='network'
                                    name='factor[]'
                                    className='text-input w100 factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>

                           <tr>
                              <td>
                                 <input
                                    type='text'
                                    value='maintenance'
                                    name='factor[]'
                                    className='text-input w100 factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>

                           <tr>
                              <td>
                                 <input
                                    type='text'
                                    value='test'
                                    name='factor[]'
                                    className='text-input w100 factor'
                                    placeholder='E.g. price'
                                 />
                              </td>
                           </tr>
                        </tbody>
                     </table>

                     <div className='breath'>
                        <button className='btn'>Generate graph</button>
                        <Link href='/ebos' className='btn'>
                           <strong>Back To Dashboard</strong>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className='pane-lower'>
                  <div className='page'>
                     <div className='chart-wrapper'>
                        <div id='chart3_div' className='chart'>
                           <div
                              id='google-visualization-errors-all-1'
                              className='block pt-[2px]'>
                              <div
                                 id='google-visualization-errors-0'
                                 className='mb-1 text-[0.8em] font-sans'>
                                 <span className='bg-red-700 text-white p-[2px]'>
                                    Not enough columns given to draw the
                                    requested chart.
                                    <span className='font-bold cursor-pointer pl-2 text-black text-right align-top text-[1.1em]'>
                                       ×
                                    </span>
                                 </span>
                              </div>
                           </div>
                           <div className='relative'>
                              <div
                                 dir='ltr'
                                 className='relative w-[1192px] h-[400px]'>
                                 <div className='absolute left-0 top-0 w-full h-full'></div>
                              </div>
                              <div
                                 aria-hidden='true'
                                 className='hidden absolute top-[410px] left-[1202px] whitespace-no-wrap font-sans text-[8px]'>
                                 -._.-*^*-._.-*^*-._.-
                              </div>
                              <div></div>
                           </div>
                        </div>
                     </div>

                     <div className='breath'>
                        <button
                           className='btn  consultant'
                           data-name='Red ocean canvas'
                           id=''>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>

                     <div
                        className='dr-modal-overlay modal-center modal-overlay modal-backdrop'
                        data-trigger='.openideas'>
                        <div
                           className='modal dr-window'
                           role='dialog'
                           aria-labelledby='modaltitle'
                           tabindex='-1'>
                           <div className='modal-dialog'>
                              <div className='modal-content dr-content'>
                                 <div className='modal-header'>
                                    <div className='modal-title '>
                                       <h2 className='f2 '>Ideas</h2>
                                       <h3 className='spaced f6 grey-dark'>
                                          Add your ideas
                                       </h3>
                                    </div>
                                    <button
                                       type='button'
                                       className='modal-close dr-close'
                                       aria-label='Close'></button>
                                 </div>
                                 <div className='modal-body' id='ideas-app'>
                                    <div className='idea-list'>
                                       <ul className='alist'>
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
                                             className='w100 text-input newIdea'
                                             placeholder='New idea'
                                          />
                                       </li>
                                    </div>

                                    <div className='spaced'>
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
                     </div>

                     {/* <script type="text/javascript">



function drawChart() {
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





    competitor = []
    factor = [{"id":51,"user_id":2,"name":"price","is_idea":0,"created_at":"2023-03-06T09:59:42.000000Z","updated_at":"2023-03-06T09:59:42.000000Z","competitors":[]},{"id":52,"user_id":2,"name":"speed","is_idea":0,"created_at":"2023-03-06T09:59:42.000000Z","updated_at":"2023-03-06T09:59:42.000000Z","competitors":[]},{"id":53,"user_id":2,"name":"network","is_idea":0,"created_at":"2023-03-06T09:59:42.000000Z","updated_at":"2023-03-06T09:59:42.000000Z","competitors":[]},{"id":54,"user_id":2,"name":"maintenance","is_idea":0,"created_at":"2023-03-06T09:59:42.000000Z","updated_at":"2023-03-06T09:59:42.000000Z","competitors":[]},{"id":55,"user_id":2,"name":"test","is_idea":0,"created_at":"2023-03-06T09:59:42.000000Z","updated_at":"2023-03-06T09:59:42.000000Z","competitors":[]}]
    var factors = [];
    chart =[];
    fullChart =[];
        console.log(chart);
$.each(factor, function(index, value) {
factors.push({'f': value.name, 'v': index});
chart =[];
chart.push(index);
$.each(value.competitors , function(i,v){
chart.push(v.pivot.scale);
})

fullChart.push(chart)


});



    var dt = new google.visualization.DataTable();

    dt.addColumn('number', 'Factor');
    $.each( competitor, function( key, value ) {
        dt.addColumn('number', value);
    });



// index factor1comp1 factors1comp2 factors1comp3
// index factors2comp1 factors2comp2 ..etc

    // dt.addRows([
    //     [0, 2, 1.1, 3.2, 1],
    //     [1, 1, 2.1, 2.2, 1.3],
    //     [2, 3, 3.1, 2.2, 2.3],
    //     [3, 1, 3.1, 1.2, 2.3],
    // ]);

dt.addRows(fullChart);


    var options = {
        title: 'Red ocean',
        pointSize: 15,
        tooltip: {
            trigger: 'none'
        },
        legend: {
            position: 'rigth'
        },
        lineWidth: 1,
        lineDashStyle: [2, 2],
        dataOpacity: 0.8,
        series: {
            0: {
                color: 'black',
                pointShape: {
                    type: 'star',
                    sides: 5,
                    dent: 0.5
                }
            },
            1: {
                color: '#FDC61D',
                pointShape: 'triangle'
            },
            2: {
                color: '#FDC61D',
                pointShape: 'square'
            },
            3: {
                color: '#FDC61D',
                pointShape: 'diamond'
            },
            4: {
                color: '#FDC61D',
                pointShape: 'circle'
            },
            5: {
                color: '#FDC61D',
                pointShape: 'polygon'
            },
        },
        hAxis: {
            textStyle: {
                bold: true
            },
            allowContainerBoundaryTextCutoff: true,
            gridlines: {
                color: '#333'
            },
            ticks: factors,

        },
        vAxis: {
            ticks: [{
                v: 0,
                f: ''
            }, {
                v: 1,
                f: 'poor'
            }, {
                v: 1.5,
                f: ''
            }, {
                v: 2,
                f: 'medium'
            }, {
                v: 2.5,
                f: ''
            }, {
                v: 3,
                f: 'excellent'
            }],
            gridlines: {
                color: '#eee'
            },

        }
    };

    var chart3 = new google.visualization.LineChart(document.getElementById('chart3_div'));

    chart3.draw(dt, options);
}

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);
</script> */}
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default Factors;
