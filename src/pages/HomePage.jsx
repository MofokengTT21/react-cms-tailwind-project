
import React from 'react';
import { useEffect, useState } from 'react';

import logo from '/img/logo.png';
import ujLogo from '/img/uj-logo.png';
// Import Icons
import { BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { CiSquareCheck } from "react-icons/ci";
import { PiIdentificationCardThin } from "react-icons/pi";
// Import Components
import Slideshow from '../components/Slideshow';
import ModulesCard from '../components/ModulesCard';
import InovatorsCard from '../components/InovatorsCard';
// Import Contentful Data
import inovatorsInvolved from '../data/InovatorsInvolved';
import programModule from '../data/ProgramModules';
import homePageContent from '../data/HomePageContent';
// Contentful Rich text renderer
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import options from '../utils/ContentfulOptions';


export default function HomePage() {
    const [homePage, setHomePageContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [inovators, setInovators] = useState([]);
    const [programModules, setAllModules] = useState([]);

    const { getHomePageContent } = homePageContent();
    const { getInovators } = inovatorsInvolved();
    const { getAllModules } = programModule();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const homePageResponse = await getHomePageContent();
                if (homePageResponse.length > 0) {
                    setHomePageContent(homePageResponse[0]);
                }

                const inovatorsResponse = await getInovators();
                setInovators(inovatorsResponse);

                const modulesResponse = await getAllModules();
                setAllModules(modulesResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }

            // Load the LikeBtn script
            const script = document.createElement('script');
            script.src = "//w.likebtn.com/js/w/widget.js";
            script.async = true;
            script.onload = () => {
                if (typeof LikeBtn !== 'undefined') {
                    LikeBtn.init();
                }
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="loader"></div>
            </div>
        );
    }
    const formattedDate = new Date(homePage.closingDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });


    return (
        <div>
            {/* Like Button */}


            {/* Header */}
            <div className="relative grid lg:grid-cols-2 2xl:grid-cols-3 ">
                <div className="px-6 [@media(max-width:390px)]:px-3 py-12 sm:px-8 mx-auto xl:px-12 xl:py-20 sm:mx-0  md:mx-auto lg:max-w-full">
                    <div className="xl:max-w-full">
                        <div className='flex gap-2 items-center'>
                            <img className="h-12 -ml-5 -mt-5" src={logo} alt="" />
                            <img className="h-16 -mt-5" src={ujLogo} alt="" />
                        </div>
                        <div className="mt-7 lg:hidden">
                            <Slideshow />
                        </div>
                        <h1 className="capitalize mt-5 text-2xl font-normal text-gray-900 xl:mt-8 sm:text-3xl xl:mb-5 xl:text-4xl">
                            {homePage.heading}. <span className="text-purple-600">Together, We Reinventing</span>.
                        </h1>
                        <div className="mt-3 text-gray-700 sm:text-lg">
                            {documentToReactComponents(homePage.description, options)}
                            <p className='text-purple-600 mb-2'> Graduates from all universities are welcome to apply. </p>
                        </div>

                        <div className="">

                            <a className="btn btn-primary mt-6" href={homePage.applyLink?.content?.[0]?.content?.[0]?.value} target="_blank" rel="noopener noreferrer">Apply</a><span className='text-green-500 font-semibold ml-4 tracking-wide'>Closing date: {formattedDate}</span>
                        </div>
                    </div>
                </div>
                <div className="hidden relative lg:block 2xl:col-span-2">
                    <Slideshow />
                </div>
                <hr className='w-full absolute lg:block lg:w-[56rem] shadow-sm bottom-0' />
            </div>

            {/* Inventors Card */}
            <div className="w-full mx-auto  py-6">
                <h2 className="text-xl font-semibold tracking-wide text-gray-800 [@media(max-width:390px)]:px-3 px-7 sm:px-8 xl:px-12">Join Visionary Leaders</h2>
                <div className="mt-6  overflow-x-auto hide-scrollbr snap-x">
                    <div className="flex gap-x-4 [@media(max-width:390px)]:gap-x-3 xl:gap-x-6">
                        <div className='[@media(max-width:390px)]:pl-0 pl-2 sm:pl-4 xl:pl-6'></div>
                        {inovators.map(inovator => (
                            <InovatorsCard key={inovator.id} inovator={inovator} />
                        ))}
                        <div className='[@media(max-width:390px)]:pl-[2px] pl-3 sm:pl-4 xl:pl-6'></div>
                    </div>
                </div>
            </div>

            {/* Modules Card */}
            <div className='w-full mx-auto'>
                <h2 className='text-xl font-semibold tracking-wide text-gray-800 [@media(max-width:390px)]:px-3 px-7 sm:px-8 xl:px-12'>Modules</h2>
                <div className='mt-6 overflow-x-auto hide-scrollbr snap-x'>
                    <div className='flex gap-x-4 [@media(max-width:390px)]:gap-x-3 xl:gap-x-6'>
                        <div className='[@media(max-width:390px)]:pl-0 pl-2 sm:pl-4 xl:pl-6'></div>
                        {programModules.map(programModule => (
                            <ModulesCard key={programModule.id} programModule={programModule} />
                        ))}
                        <div className='[@media(max-width:390px)]:pl-[2px] pl-3 sm:pl-4 xl:pl-6'></div>
                    </div>
                </div>
            </div>

            {/* Work */}
            <div className="lg:grid grid-cols-3 mt-9 px-6 w-full mx-auto [@media(max-width:390px)]:px-3 sm:px-8 lg:max-w-[1440px] xl:px-12">
                <div className='col-span-2'>
                    <h1 className="capitalize text-2xl text-gray-900 xl:mt-2 sm:text-3xl xl:mb-3 xl:text-4xl">{homePage.workHeading}</h1>
                    <div className="mt-3 lg:pr-2 text-gray-700 sm:text-lg"> {documentToReactComponents(homePage.workDescription, options)}</div>
                </div>

                <div className='mt-9 sm:flex items-start lg:block lg:mt-0'>
                    <hr className='mb-4 lg:hidden ' />
                    {/* Apply if: */}
                    <div className='flex items-center space-x-2'>
                        <CiSquareCheck size={70} />
                        <div>
                            <h3 className="capitalize mt-2 text-xl text-gray-900 xl:mt-2">Eligible to apply if:</h3>
                            <div className='text-sm pl-5'>
                                {documentToReactComponents(homePage.applyIf, options)}
                            </div>
                        </div>
                    </div>
                    {/* Requirements */}
                    <div className='flex items-center space-x-2'>
                        <PiIdentificationCardThin size={69} />
                        <div>
                            <h3 className="capitalize mt-2 text-xl text-gray-900 xl:mt-2">Requirements:</h3>
                            <div className='text-sm pl-5'>

                                {documentToReactComponents(homePage.requirements, options)}

                            </div>
                        </div>
                    </div>
                </div>

                {/* if successful */}
                <hr className='my-6 col-span-3' />
                <div className='col-span-2'>
                    <p className='text-xs lg:col-span-2'>{homePage.ifSuccessful}</p>
                </div>
                <hr className='mt-6 col-span-3' />

            </div>

            {/* Location */}
            <div className="mt-9  px-6 w-full mx-auto [@media(max-width:390px)]:px-3 sm:px-8 lg:max-w-[1440px] xl:px-12">
                <div className='col-span-2'>
                    <h2 className="capitalize text-2xl text-gray-900 xl:mt-2 sm:text-3xl xl:mb-3 xl:text-2xl">Where you'll be</h2>
                    <p className="mt-3 lg:pr-2 text-gray-700">{homePage.location}</p>
                </div>
                <div className='mt-5 overflow-hidden relative h-0 pb-[83%] sm:pb-[60%] md:pb-[53%] xl:pb-[45%] rounded-[4em]'>
                    <iframe className='absolute transform scale-[] left-0 top-0 h-[102%] -mt-1 -ml-1 w-[102%] lg:h-[101.5%] lg:w-[101%] border-0 object-cover object-center' src={homePage.locationLink?.content?.[0]?.content?.[0]?.value} width="600" height="450" allowFullScreen="90" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Internship Location"></iframe>
                </div>
                <div className="pt-10 relative sm:-mt-2 2xl:mt-2">
                    <h2 className="capitalize text-2xl text-gray-900 xl:mt-2 sm:text-3xl xl:mb-3 xl:text-2xl">Neighborhood highlights</h2>
                    <div className='mt-2'>
                        {documentToReactComponents(homePage.neighborhoodHighlights, options)}
                    </div>
                </div>
            </div>
            <hr className='border mt-32 lg:mt-52' />
            <div se={{ backgroundImage: `url(./img/modules.png)` }} className="bg-cover">

                <div className=' bg-opacity-0 backdrop-blur-md h-full flex justify-center gap-3 py-14'>
                    <a href="https://wa.me/qr/OI26QJNBJSEYF1"><BsWhatsapp style={{ color: `#25d366` }} size={35} /></a>
                    <a href="https://www.linkedin.com/in/mofokengtt21"><BsLinkedin style={{ color: `#0a67c2` }} size={35} /></a>
                </div>
            </div>
        </div >
    );
}