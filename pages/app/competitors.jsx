import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import Spinner from "../../components/common/spinner";
import products_dummy from "../../samples/products.json";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class Competitor {
   id;
   name;
   marketShare;
}
const competitors_dummy = [
   {
      id: 1,
      name: "Competitor (ME)",
      marketShare: 230000,
   },
   {
      id: 2,
      name: "First Competitor",
      marketShare: 230000,
   },
   {
      id: 3,
      name: "Second Competitor",
      marketShare: 90125,
   },
   {
      id: 4,
      name: "Third Competitor",
      marketShare: 110500,
   },
];

const Competitors = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
   const [lookupProducts, setLookupProducts] = useState(
      products_dummy.slice(1, 3)
   );
   let productsFieldArrPush;
   const generalizeProductsPush = (productsPush) => {
      productsFieldArrPush = productsPush;
   };

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col gap-7 md:w-2/3 bg-white p-12 relative'>
                     <div>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <div className='flex gap-12 justify-between'>
                        <h3 className='text-[2.52rem] text-yellow-green'>
                           Market potential
                        </h3>
                        <div className='flex flex-col'>
                           <label>Products</label>
                           <select
                              className='min-w-[200px] p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              value={0}
                              onChange={(e) => {
                                 productsFieldArrPush(
                                    products_dummy.find(
                                       (prod) => prod.id === e.target.value
                                    )
                                 );
                                 setLookupProducts((prevValue) =>
                                    prevValue.filter(
                                       (prod) => prod.id !== e.target.value
                                    )
                                 );
                              }}>
                              <option value={0}></option>
                              {lookupProducts.map((product, index) => (
                                 <option key={index} value={product.id}>
                                    {product.name}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <Formik
                        initialValues={{
                           products: products_dummy.filter(
                              (prod) =>
                                 !lookupProducts.some(
                                    (lookupProd) => lookupProd.id === prod.id
                                 )
                           ),
                        }}
                        validationSchema={Yup.object({
                           products: Yup.object({
                              competitors: Yup.array(
                                 Yup.object({
                                    id: Yup.string().required("required"),
                                    name: Yup.string().required("required"),
                                    marketShare: Yup.number()
                                       .required("required")
                                       .min(
                                          1,
                                          "Market share must be greater than 0"
                                       ),
                                 })
                              )
                                 .required("Must provide at least one goal !")
                                 .min(1, "Must provide at least one goal !"),
                           }),
                        })}
                        onSubmit={(values) => {
                           console.log(values);
                        }}
                        validateOnMount>
                        {({ values, isSubmitting, isValid }) => {
                           return (
                              <Form>
                                 <FieldArray name='products'>
                                    {({ push, remove, form }) => {
                                       generalizeProductsPush(push);
                                       return (
                                          <div className='flex flex-col gap-10'>
                                             {!values.products?.length && (
                                                <p>
                                                   You have no Products yet !
                                                </p>
                                             )}
                                             {!!values.products.length &&
                                                values.products.map(
                                                   (product, productIndex) => (
                                                      <div
                                                         key={productIndex}
                                                         className='border shadow p-5'>
                                                         <div className='flex justify-end'>
                                                            <FontAwesomeIcon
                                                               onClick={() => {
                                                                  setLookupProducts(
                                                                     (
                                                                        prevValue
                                                                     ) => [
                                                                        ...prevValue,
                                                                        product,
                                                                     ]
                                                                  );
                                                                  remove(
                                                                     productIndex
                                                                  );
                                                               }}
                                                               className='w-9 cursor-pointer text-rose-200 hover:text-rose-500'
                                                               icon={faEyeSlash}
                                                            />
                                                         </div>
                                                         <FieldArray
                                                            name={`products.${productIndex}.competitors`}>
                                                            {({
                                                               remove,
                                                               push,
                                                               form,
                                                            }) => (
                                                               <>
                                                                  <ul className='flex flex-col gap-5 mb-10'>
                                                                     {!!product
                                                                        .competitors
                                                                        ?.length &&
                                                                        product.competitors.map(
                                                                           (
                                                                              comp,
                                                                              compIndex
                                                                           ) => (
                                                                              <li
                                                                                 key={
                                                                                    compIndex
                                                                                 }
                                                                                 className='flex flex-col gap-3 border-b border-gray-400 pb-7 spacedout'>
                                                                                 {compIndex !==
                                                                                 0 ? (
                                                                                    <div>
                                                                                       Competitor{" "}
                                                                                       {
                                                                                          compIndex
                                                                                       }
                                                                                    </div>
                                                                                 ) : null}
                                                                                 <div>
                                                                                    <Field
                                                                                       type='text'
                                                                                       className={
                                                                                          compIndex ===
                                                                                          0
                                                                                             ? "hidden"
                                                                                             : "w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none"
                                                                                       }
                                                                                       name={`products.${productIndex}.competitors.${compIndex}.name`}
                                                                                    />
                                                                                    <ErrorMessage
                                                                                       name={`products.${productIndex}.competitors.${compIndex}.name`}>
                                                                                       {(
                                                                                          msg
                                                                                       ) => (
                                                                                          <div className='text-lg text-rose-500'>
                                                                                             {
                                                                                                msg
                                                                                             }
                                                                                          </div>
                                                                                       )}
                                                                                    </ErrorMessage>
                                                                                 </div>
                                                                                 <div>
                                                                                    {compIndex ===
                                                                                    0 ? (
                                                                                       <span>
                                                                                          My
                                                                                       </span>
                                                                                    ) : null}{" "}
                                                                                    Market
                                                                                    share
                                                                                 </div>
                                                                                 <div className='flex flex-wrap'>
                                                                                    <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                                                                                       $
                                                                                    </span>
                                                                                    <Field
                                                                                       type='number'
                                                                                       className='grow comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                       name={`competitors.${compIndex}.marketShare`}
                                                                                    />
                                                                                    <ErrorMessage
                                                                                       name={`competitors.${compIndex}.marketShare`}>
                                                                                       {(
                                                                                          msg
                                                                                       ) => (
                                                                                          <div className='w-full text-lg text-rose-500'>
                                                                                             {
                                                                                                msg
                                                                                             }
                                                                                          </div>
                                                                                       )}
                                                                                    </ErrorMessage>
                                                                                 </div>
                                                                              </li>
                                                                           )
                                                                        )}
                                                                  </ul>
                                                                  <div className='flex justify-between items-center'>
                                                                     <div className='flex gap-3'>
                                                                        <button
                                                                           type='submit'
                                                                           className={
                                                                              isSubmitting ||
                                                                              !isValid
                                                                                 ? "btn-rev btn-disabled"
                                                                                 : "btn-rev"
                                                                           }
                                                                           disabled={
                                                                              isSubmitting ||
                                                                              !isValid
                                                                           }>
                                                                           Generate
                                                                        </button>
                                                                        <a
                                                                           href='/ebos'
                                                                           className='btn text-black-eerie hover:text-blue-ncs'>
                                                                           <strong>
                                                                              Back
                                                                              To
                                                                              Dashboard
                                                                           </strong>
                                                                        </a>
                                                                     </div>
                                                                     {isSubmitting && (
                                                                        <Spinner message='Saving Competitors' />
                                                                     )}
                                                                  </div>
                                                               </>
                                                            )}
                                                         </FieldArray>
                                                      </div>
                                                   )
                                                )}
                                          </div>
                                       );
                                    }}
                                 </FieldArray>
                              </Form>
                           );
                        }}
                     </Formik>
                  </div>
                  <div className='md:w-1/3 pane-right-gradient min-h-screen p-12'>
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
                              height='30'
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
                                          strokeWidth='0'
                                          fill='#ffffff'></rect>
                                       <text
                                          textAnchor='middle'
                                          x='287'
                                          y='229.2'
                                          fontFamily='Arial'
                                          fontSize='12'
                                          stroke='none'
                                          strokeWidth='0'
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
