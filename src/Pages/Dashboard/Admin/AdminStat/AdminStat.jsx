
import { useLocation } from 'react-router-dom';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const AdminStat = () => {
    const location = useLocation()
  const mystate = location.pathname
  console.log(mystate)
    return (
        <div>
            <SectionTitle title='Admin Panel'></SectionTitle>
            
        </div>
    );
};

export default AdminStat;