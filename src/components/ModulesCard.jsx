import React from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import options from "../utils/ContentfulOptions";

export default function ModulesCard({ programModule }) {
  return (
    <div className="">
      <img className="h-72 w-80 rounded-[4em] sm:h-72 sm:w-96 lg:h-72  xl:w-[30rem]  2xl:h-80 2xl:w-[38rem] object-cover object-center" src={programModule.images.file.url} alt={programModule.images.title} loading="lazy" />
      <div className="pt-4 sm:-mt-2 2xl:mt-2">
        <h3 className="font-semibold text-lg text-gray-800">{programModule.name}</h3>

        <div className="text-gray-600 pt-1 pr-0 w-80 lg:min-w-fit">{documentToReactComponents(programModule.description, options)}</div>
        <div className="mt-4 w-80 lg:w-fit">
          <Link to={`/module/${programModule.id}`} className="underline   font-semibold text-purple-600 hover:text-purple-500 text-base xl:text-base">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}