import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

const ShareButton = ({ url, title }) => (
  <div className="bg-purple-600 p-2 lg:p-8 rounded-xl lg:rounded-[4rem] mt-6 w-full max-w-sm mx-auto">
    <h3 className="text-2xl font-bold mb-4 text-white hidden lg:block">Share this page</h3>
    
    <div className="flex lg:flex-col gap-4 justify-center">
      <FacebookShareButton url={url} quote={title} className="flex items-center gap-2  hover:transform hover:scale-105">
        <div className='bg-white rounded-lg p-1 lg:p-2 lg:rounded-xl'>
        <FaFacebookF style={{ color: '#1877F2', width: '20px', height: '20px' }} />
        </div>
        <span className="text-gray-100 hidden lg:block">Facebook</span>
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} className="flex items-center gap-2 hover:transform hover:scale-105">
        <div className='bg-white rounded-lg p-1 lg:p-2 lg:rounded-xl'>
        <FaXTwitter style={{ color: 'black', width: '20px', height: '20px' }} />
        </div>
        <span className="text-gray-100 hidden lg:block">X/Twitter</span>
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} className="flex items-center gap-2 hover:transform hover:scale-105">
      <div className='bg-white rounded-lg p-1 lg:p-2 lg:rounded-xl'>
      <FaLinkedinIn style={{ color: '#0077B5', width: '20px', height: '20px' }} />
      </div>
        
        <span className="text-gray-100 hidden lg:block">LinkedIn</span>
      </LinkedinShareButton>

      <WhatsappShareButton url={url} title={title} className="flex items-center gap-2 hover:transform hover:scale-105">
      <div className='bg-white rounded-lg p-1 lg:p-2 lg:rounded-xl'>
      <FaWhatsapp style={{ color: '#25D366', width: '20px', height: '20px' }} />
      </div>
        
        <span className="text-gray-100 hidden lg:block">WhatsApp</span>
      </WhatsappShareButton>
    </div>
  </div>
);

export default ShareButton;
