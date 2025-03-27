import { FaCheck } from "react-icons/fa";

function Features({ features = {} }) {  // Default to an empty object if features is null or undefined
    return (
      <div className='mt-6 '>
        <div className='p-5 bg-white rounded-xl border shadow-md'>
          <h2 className='font-medium text-2xl'> Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
            {Object.entries(features).map(([feature, value]) => (
              <div key={feature} className="flex gap-2 items-center"> 
                <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-blue-700"/>
                <h2>{feature}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Features;
  