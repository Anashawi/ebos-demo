import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";

const Competitors = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col gap-7 md:w-1/2 bg-white p-12 relative'>
                     <div>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <h3 className='text-[2.52rem] text-yellow-green'>
                        Market potential
                     </h3>
                     <div className='flex flex-col gap-3 spacedout border-b border-gray-400 pb-7'>
                        <div>My market share</div>
                        <div className='flex'>
                           <input
                              type='hidden'
                              id='comp-name-0'
                              value='my-share'
                              className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                           <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                              $
                           </span>
                           <input
                              type='text'
                              id='comp-share-0'
                              className='w-full comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col gap-3 border-b border-gray-400 pb-7 spacedout'>
                        <div>Competitor 1</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-1'
                              className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='flex'>
                           <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                              $
                           </span>
                           <input
                              type='text'
                              id='comp-share-1'
                              className='w-full comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col gap-3 border-b border-gray-400 pb-7 spacedout'>
                        <div>Competitor 2</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-2'
                              className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='flex'>
                           <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                              $
                           </span>
                           <input
                              id='comp-share-2'
                              type='text'
                              className='w-full comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col gap-3 border-b border-gray-400 pb-7 spacedout'>
                        <div>Competitor 3</div>
                        <div>
                           <input
                              type='text'
                              id='comp-name-3'
                              className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                        <div>Market share</div>
                        <div className='flex'>
                           <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                              $
                           </span>
                           <input
                              type='text'
                              id='comp-share-3'
                              className='w-full  comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                           />
                        </div>
                     </div>
                     <div className='flex gap-3'>
                        <button id='generate' className='btn-rev'>
                           Generate
                        </button>
                        <a href='/ebos' className='btn text-black-eerie'>
                           <strong>Back To Dashboard</strong>
                        </a>
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
                              height='0'
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
                     <div className='py-3'>
                        <button
                           className='btn text-black-eerie mt-10'
                           data-name='Market potential'
                           id='theSubmitBtn'>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                     {/* 
                     <script type="text/javascript">
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
