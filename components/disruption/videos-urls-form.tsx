import { useFormik } from "formik";
import { NextPage } from "next";
import { object, string } from "yup";

type Props = {
   toggleEditUrlsModal: () => void;
   formValues: any;
};

const VideosUrlsForm: NextPage<Props> = ({
   formValues,
   toggleEditUrlsModal,
}) => {
   const formik = useFormik({
      initialValues: formValues,
      validationSchema: object({
         staffOnDemand: string().required("required"),
         communityAndCrowd: string().required("required"),
         algorithms: string().required("required"),
         leveragedAssets: string().required("required"),
         Engagement: string().required("required"),
         interface: string().required("required"),
         dashboard: string().required("required"),
         experimentation: string().required("required"),
         socialPlatforms: string().required("required"),
         ecoSystems: string().required("required"),
         autonomy: string().required("required"),
         infoIsPower: string().required("required"),
         OTCR: string().required("required"),
         valueDestruction: string().required("required"),
         customerJourney: string().required("required"),
         digitalPlatforms: string().required("required"),
         buildingCapacity: string().required("required"),
      }),
      onSubmit: (values) => {
         console.log("values");
      },
   });
   return (
      <>
         <h1 className='text-4xl text-gray-800 mb-5'>Edit Video Urls</h1>
         <form
            onSubmit={formik.handleSubmit}
            className='grow overflow-auto pt-10 flex gap-5 flex-wrap'>
            <ul className='grow flex flex-col gap-3 mb-5'>
               <h2 className='mb-2 text-3xl text-gray-600'>Scale</h2>
               <li
                  data-key='Staff on Demand'
                  className='flex gap-2 flex-col p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Staff on Demand</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("staffOnDemand")}
                  />
                  {formik.touched.staffOnDemand &&
                  formik.errors.staffOnDemand ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.staffOnDemand}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Community and Crowd'
                  className='flex gap-2 flex-col p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Community and Crowd
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("communityAndCrowd")}
                  />
                  {formik.touched.communityAndCrowd &&
                  formik.errors.communityAndCrowd ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.communityAndCrowd}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Algorithms'
                  className='flex gap-2 flex-col p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Algorithms</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("algorithms")}
                  />
                  {formik.touched.algorithms && formik.errors.algorithms ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.algorithms}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Leveraged Assets'
                  className='flex gap-2 flex-col p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Leveraged Assets</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("leveragedAssets")}
                  />
                  {formik.touched.leveragedAssets &&
                  formik.errors.leveragedAssets ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.leveragedAssets}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Engagement'
                  className='flex gap-2 flex-col p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Engagement</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("Engagement")}
                  />
                  {formik.touched.Engagement && formik.errors.Engagement ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.Engagement}</>
                     </div>
                  ) : null}
               </li>
            </ul>
            <ul className='grow flex flex-col gap-3 mb-5'>
               <h2 className='mb-2 text-3xl text-gray-600'>Ideas</h2>
               <li
                  data-key='Interface'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Interface</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("interface")}
                  />
                  {formik.touched.interface && formik.errors.interface ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.interface}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Dashboard'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Dashboard</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("dashboard")}
                  />
                  {formik.touched.dashboard && formik.errors.dashboard ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.dashboard}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Experimentation'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Experimentation</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("experimentation")}
                  />
                  {formik.touched.experimentation &&
                  formik.errors.experimentation ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.experimentation}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Autonomy'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Autonomy</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("autonomy")}
                  />
                  {formik.touched.autonomy && formik.errors.autonomy ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.autonomy}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Social Platforms'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  <label>Social Platforms</label>
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("socialPlatforms")}
                  />
                  {formik.touched.socialPlatforms &&
                  formik.errors.socialPlatforms ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.socialPlatforms}</>
                     </div>
                  ) : null}
               </li>
            </ul>
            <ul className='grow flex flex-col gap-3 mb-5'>
               <h2 className='mb-2 text-3xl text-gray-600'>
                  7 Practical & Quick
               </h2>
               <li
                  data-key='Eco Systems'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Eco Systems
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("ecoSystems")}
                  />
                  {formik.touched.ecoSystems && formik.errors.ecoSystems ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.ecoSystems}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Info is Power'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Info is Power
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("infoIsPower")}
                  />
                  {formik.touched.infoIsPower && formik.errors.infoIsPower ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.infoIsPower}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='OTCR'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  OTCR
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("OTCR")}
                  />
                  {formik.touched.OTCR && formik.errors.OTCR ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.OTCR}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Value Destruction'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Value Destruction
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("valueDestruction")}
                  />
                  {formik.touched.valueDestruction &&
                  formik.errors.valueDestruction ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.valueDestruction}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Customer Journey'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Customer Journey
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("customerJourney")}
                  />
                  {formik.touched.customerJourney &&
                  formik.errors.customerJourney ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.customerJourney}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Digital Platforms'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Digital Platforms
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("digitalPlatforms")}
                  />
                  {formik.touched.digitalPlatforms &&
                  formik.errors.digitalPlatforms ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.digitalPlatforms}</>
                     </div>
                  ) : null}
               </li>
               <li
                  data-key='Building Capacity'
                  className='flex flex-col gap-2 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                  Building Capacity
                  <input
                     type='text'
                     className='w-full comp-name p-3 outline-none caret-dark-blue border-none'
                     required
                     {...formik.getFieldProps("buildingCapacity")}
                  />
                  {formik.touched.buildingCapacity &&
                  formik.errors.buildingCapacity ? (
                     <div className='text-rose-400 text-lg'>
                        <>{formik.errors.buildingCapacity}</>
                     </div>
                  ) : null}
               </li>
            </ul>
         </form>
         <div className='flex justify-end gap-3 pt-5'>
            <button
               className='btn-diff bg-gray-100 hover:bg-gray-300'
               onClick={toggleEditUrlsModal}>
               close
            </button>
            <button
               type='submit'
               className={
                  formik.isSubmitting || !formik.isValid
                     ? "btn-rev btn-disabled"
                     : "btn-rev"
               }
               disabled={formik.isSubmitting || !formik.isValid}>
               Save
            </button>
         </div>
      </>
   );
};

export default VideosUrlsForm;
