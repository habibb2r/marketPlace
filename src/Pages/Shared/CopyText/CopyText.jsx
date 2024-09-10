import React from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CopyText = ({ text }) => {
    const copyToClipboard = (text) => {
        const tempElement = document.createElement('textarea');
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
        toast.success('Card Number Copied', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
      };
    return (
        <div className='flex justify-center items-center gap-2 mx-auto py-2'>
          <div className='border px-2 py-2 rounded-lg'
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
          <button className='btn btn-success' onClick={() => copyToClipboard(text)}>Copy</button>
          <ToastContainer/>
        </div>
      );
};

export default CopyText;