const PhabletHomepage = ({ nodes }) => {
   return (
      <div className='p-10'>
         <h1 className='text-2xl mb-5'>hello from phablet homepage</h1>
         {nodes.map((node, index) => (
            <div key={index}>{node.text}</div>
         ))}
      </div>
   );
};

export default PhabletHomepage;
