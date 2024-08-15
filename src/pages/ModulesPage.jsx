import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import programModules from '../data/ProgramModules';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import options from '../utils/ContentfulOptions';
import ShareButton from '../components/ShareButton';

import logo from '/img/logo.png';
import ujLogo from '/img/uj-logo.png';
import { BsLinkedin, BsWhatsapp } from 'react-icons/bs';

export default function ModulesPage() {
  const { id } = useParams();
  const [programModule, setProgramModule] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { getAllModules } = programModules();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const fetchedModules = await getAllModules(id);
        if (fetchedModules.length > 0) {
          setProgramModule(fetchedModules[0]);
        } else {
          setProgramModule(null);
        }
      } catch (error) {
        console.error("Error fetching program module:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchModule();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="loader"></div>
      </div>
    );
  }
  const formattedDate = new Date(programModule.dateCreated).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <div className='flex gap-2 items-center -mx-2 [@media(max-width:390px)]:px-0  p-3 sm:px-6  '>
        <img className="h-12" src={logo} alt="" />
        <img className="h-16" src={ujLogo} alt="" />
      </div>

      <div className='max-w-[1100px] m-auto'>
        <div className="lg:grid grid-cols-4  mt-6 px-6 w-full mx-auto [@media(max-width:390px)]:px-3 sm:px-8 lg:max-w-[1440px] xl:px-12">
          <div className='col-span-4'>

            <img className=' border rounded-[4rem] h-[29rem] lg:h-[34rem] [@media(max-width:510px)]:h-[75vw] w-full object-cover object-center'
              src={programModule.images.file.url}
              alt={programModule.images.title}
              loading="lazy"
            />
            <div className='lg:hidden flex justify-center -mt-4'>
              {/* Share Button */}
              <div className='-mb-2 w-44'>
                <ShareButton
                  url={window.location.href}
                  title={programModule.name}
                />
              </div>
            </div>

          </div>
          <div className='col-span-3 lg:pr-16'>
            <h1 className="capitalize max-w-sm sm:max-w-xl pt-3 text-2xl text-gray-900 lg:pt-8 sm:text-3xl">{programModule.contentHeading}</h1>
            <p className=' text-gray-400 mt-2 mb-6'>Last updated: {formattedDate}</p>
            <hr />
            <div className='flex items-center gap-6 my-4'>
              <div>
                <img className="rounded-full h-11 w-11 object-cover object-center" src={programModule.authorImg.file.url} alt="" />
              </div>
              <div>
                <p className='font-semibold text-gray-800'>Author</p>
                <p>{programModule.author}</p>
              </div>
            </div>
            <hr />
            <div className='flex sm:gap-6 mt-4'>
              <p className='sm:flex-shrink-0'>TABLE OF CONTENTS</p>
              <div>
                {documentToReactComponents(programModule.tableOfContents, options)}
              </div>
            </div>
            <hr />

            <div className="mt-8 lg:pr-2 text-gray-700 sm:text-lg"> {documentToReactComponents(programModule.pageContent, options)}</div>
          </div>

          <div className='hidden lg:block mt-4'>
            {/* Share Button */}
            <div className='mt-6'>
              <ShareButton
                url={window.location.href}
                title={programModule.name}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className='border mt-64' />
      <div se={{ backgroundImage: `url(./img/modules.png)` }} className="bg-cover">
        <div className=' bg-opacity-0 backdrop-blur-md h-full flex justify-center gap-3 py-14'>
          <a href="https://wa.me/qr/OI26QJNBJSEYF1"><BsWhatsapp style={{ color: `#25d366` }} size={35} /></a>
          <a href="https://www.linkedin.com/in/mofokengtt21"><BsLinkedin style={{ color: `#0a67c2` }} size={35} /></a>
        </div>
      </div>
    </div>
  );
}
