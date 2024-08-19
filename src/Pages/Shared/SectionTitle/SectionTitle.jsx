
const SectionTitle = ({title, ico, ict}) => {
    return (
        <div className="text-center py-10 font-semibold md:w-8/12 mx-auto">
            <div className="flex justify-center items-center md:gap-2 divider divider-success">
            <img className='h-[45px] md:h-[50px]' src={ico? ico: ''} alt="" />
            <h1 className="text-2xl md:text-4xl">{title}</h1>
            <img className='h-[45px] md:h-[50px]' src={ict? ict: ''} alt="" />
            </div>
        </div>
    );
};

export default SectionTitle;