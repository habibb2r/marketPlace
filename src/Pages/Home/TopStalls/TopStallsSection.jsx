import andr from '../../../assets/for title/andriod.png'
import weba from '../../../assets/for title/www.png'
const TopStallsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-10 lg:gap-5 pt-5">
      <div className="lg:w-2/6 flex flex-col justify-center items-center gap-4">
        <div className="mockup-phone shadow-xl shadow-success">
          <div className="camera"></div>
          <div className="display">
            <iframe
              src="https://habibb2r-marketplace.netlify.app"
              className="w-[450] h-[600px] rounded-2xl"
              frameBorder="1"
              title="Webpage Display"
            ></iframe>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2'>
            <img className='h-[50px]' src={andr} alt="" />
            <p className='font-semibold text-xl'>Android Application</p>
        </div>
      </div>
     <div className="lg:w-4/6 flex flex-col justify-center gap-4">
     <div className="mockup-browser bg-success border-2 border-accent shadow-xl shadow-secondary">
        <div className="mockup-browser-toolbar py-2 ">
          <div className="input">https://habibb2r-marketplace.netlify.app/</div>
        </div>
        <div className="bg-base-200 flex justify-center px-4 pt-12 pb-5">
          <iframe
            src="https://habibb2r-marketplace.netlify.app/"
            className="w-full h-[500px] rounded-md"
            frameBorder="0"
            title="Webpage Display"
          ></iframe>
        </div>
      </div>
      <div className='flex justify-center items-center gap-2'>
            <img className='h-[50px]' src={weba} alt="" />
            <p className='font-semibold text-xl'>Web Application</p>
        </div>
     </div>
    </div>
  );
};

export default TopStallsSection;
