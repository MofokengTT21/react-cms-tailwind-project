import React from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import options from "../utils/ContentfulOptions";

export default function InovatorsCard({ inovator }) {
  return (
    <div className="">
      <img className="h-72 w-80 rounded-[4em] sm:h-72 sm:w-96 lg:h-72  xl:w-[30rem]  2xl:h-80 2xl:w-[38rem] object-cover object-center" src={inovator.images.file.url} alt={inovator.images.title} loading="lazy" />
      <div className="pt-4 relative sm:-mt-2 2xl:mt-2">
        <h3 className="text-lg font-normal text-gray-900">{inovator.name}</h3>

        <div className="text-gray-600 text-justify pt-1 pr-0 w-80 lg:min-w-fit">{documentToReactComponents(inovator.description, options)}</div>
        <div className="mt-4 w-80 lg:w-fit">
          <a href={inovator.link}  className=" text-purple-600 font-semibold hover:underline text-base xl:text-base" target="_blank" 
    rel="noopener noreferrer">
            Visit us
          </a>
        </div>
        <div className="absolute w-20 pt-3 top-0 right-0">
            <img src={inovator.logo.fields.file.url}   />
        </div>
      </div>
    </div>
  );
}
