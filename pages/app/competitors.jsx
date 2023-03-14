import Link from "next/link";

const Competitors = () => {
   return (
      <>
         <div className='split '>
            <div className='page '>
               <div className='row'>
                  <div className='md-6 pane-left'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='f3 spaced yellow'>Market potential</h3>

                     <div className='grid g-3 spacedout bthin spaced'>
                        <div>My market share</div>
                        <div className='input-prefix'>
                           <input
                              type='hidden'
                              id='comp-name-0'
                              value='my-share'
                              className='w100 comp-name text-input'
                           />

                           <span className='prefix'>$</span>
                           <input
                              type='text'
                              id='comp-share-0'
                              className='w100 comp-share text-input'
                           />
                        </div>
                     </div>

                     <div className='grid g-3 bthin spaced spacedout'>
                        <div>Competitor 1</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-1'
                              className='w100 comp-name text-input'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='input-prefix'>
                           <span className='prefix'>$</span>
                           <input
                              type='text'
                              id='comp-share-1'
                              className='w100 comp-share text-input'
                           />
                        </div>
                     </div>

                     <div className='grid g-3 bthin spaced spacedout'>
                        <div>Competitor 2</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-2'
                              className='w100 comp-name text-input'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='input-prefix'>
                           <span className='prefix'>$</span>
                           <input
                              id='comp-share-2'
                              type='text'
                              className='w100 comp-share text-input'
                           />
                        </div>
                     </div>
                     <div className='grid g-3 bthin spaced spacedout'>
                        <div>Competitor 3</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-3'
                              className='w100 comp-name text-input'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='input-prefix'>
                           <span className='prefix'>$</span>
                           <input
                              type='text'
                              id='comp-share-3'
                              className='w100  comp-share text-input'
                           />
                        </div>
                     </div>

                     <div>
                        <button id='generate' className='btn-rev'>
                           Generate
                        </button>
                        <a href='/ebos' className='btn'>
                           <strong>Back To Dashboard</strong>
                        </a>
                     </div>
                  </div>
                  <div className='md-6 pane-right'>
                     <div className=''>
                        <button type='button' className='btn openideas'>
                           My ideas
                        </button>
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

                     <div className='chart-wrapper'>
                        <div id='thechart' className='chart'>
                           <div className='relative'>
                              <div
                                 dir='ltr'
                                 className='relative w-[524px] h-[400px]'>
                                 <div
                                    aria-label='A chart.'
                                    className='absolute left-0 top-0 w-full h-full'>
                                    <svg
                                       width='524'
                                       height='400'
                                       aria-label='A chart.'
                                       className='overflow-hidden'>
                                       <defs id='_ABSTRACT_RENDERER_ID_0'></defs>
                                       <rect
                                          x='0'
                                          y='0'
                                          width='524'
                                          height='400'
                                          stroke='none'
                                          stroke-width='0'
                                          fill='#ffffff'></rect>
                                       <text
                                          text-anchor='middle'
                                          x='287'
                                          y='229.2'
                                          font-family='Arial'
                                          font-size='12'
                                          stroke='none'
                                          stroke-width='0'
                                          fill='#000000'>
                                          No data
                                       </text>
                                       <g></g>
                                    </svg>
                                    <div
                                       aria-label='A tabular representation of the data in the chart.'
                                       className='absolute left-[-10000px] top-auto w-px h-px overflow-hidden'>
                                       <table>
                                          <thead>
                                             <tr>
                                                <th>Competitor</th>
                                                <th>Market share</th>
                                             </tr>
                                          </thead>
                                          <tbody></tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 aria-hidden='true'
                                 className='hidden absolute top-[410px]
                                 left-[534px] whitespace-no-wrap text-xs font-sans'>
                                 No data
                              </div>
                              <div></div>
                           </div>
                        </div>
                     </div>

                     <div className='breath'>
                        <button
                           className='btn consultant'
                           data-name='Market potential'
                           id='theSubmitBtn'>
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
function drawChart(data) {
var dt = new google.visualization.DataTable();


dt.addColumn('string', 'Competitor');
dt.addColumn('number', 'Market share');



dt.addRows(data);
var options = {
    title:'',
    legend: {position: 'left', alignment: 'end'},
    tooltip: {trigger: 'none'},

    bubble: {
        textStyle: {
            fontSize: 11
        }
    },
    chartArea:{left:50,top:50,width:'100%',height:'90%'}
};

var chart = new google.visualization.PieChart(document.getElementById('thechart'));
chart.draw(dt, options);
}

google.charts.load('current', {'packages': ['corechart']});
//  google.charts.setOnLoadCallback(drawChart);
</script> */}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Competitors;
