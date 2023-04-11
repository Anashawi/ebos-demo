import { NextPage } from "next";

type Props = {
   url: string;
};

const Video: NextPage<Props> = ({ url }) => {
   return (
      <>
         <iframe
            className='w-full grow'
            src={url}
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
      </>
   );
};

export default Video;
