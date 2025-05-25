import { motion } from 'framer-motion';
import './SectionTitle.css';

const SectionTitle = ({title, ico, ict}) => {
    return (
        <div className="section-title-container">
            <motion.div 
                className="section-title-wrapper"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {ico && (
                    <motion.img 
                        className="section-icon"
                        src={ico}
                        alt=""
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
                
                <motion.h1 
                    className="section-title"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    {title}
                </motion.h1>
                
                {ict && (
                    <motion.img 
                        className="section-icon"
                        src={ict}
                        alt=""
                        whileHover={{ rotate: -360 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default SectionTitle;