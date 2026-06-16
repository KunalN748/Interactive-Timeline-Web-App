"use client"

import { useState, useEffect } from "react";
import { getAllEvents } from "./api/timelineService";

export default function Timeline(){
  const [timelineElements, setTimelineElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  // fetch timeline data from the backend 
  useEffect(() => { 
    getAllEvents().then((data) => {
      setTimelineElements(data);
    });
  }, []);

  return(
    <div> 
      {timelineElements.map((element) => {
        const colorMap = { //for Tailwind specification
          indigo: "bg-indigo-500",
          blue: "bg-blue-500",
          purple: "bg-purple-500",
          yellow: "bg-yellow-500",
          red: "bg-red-500",
          orange: "bg-orange-500",
        };
         
        const color = colorMap[element.color] || "bg-indigo-500"; //set color as what TimelineEvent has color set as

        //changes what selectedElementId is set as every time its called
        const handleDetailsClick = () => { 
          setSelectedElementId(
            selectedElementId === element.id ? null : element.id 
          );
        };  
        
        return (
          <div key={element.id} className="flex m-4 relative">  
            <div className="hidden items-start w-44 pt-0.5 relative sm:flex">
              <div className = "flex flex-col"> 
                <div className="w-4/5 text-gray-500 pr-5">{element.date}</div> 
                <div className="w-4/5 text-gray-500">Id: {element.id}</div> 
              </div>
              <div className={`${color} w-px h-full translate-x-5 translate-y-10 opacity-30`}></div> {/*vertical line*/}
              <img 
                src={
                  element.icon === "person"
                    ? "/person.svg"
                    : element.icon === "baby"
                    ? "/Baby.svg"
                    : "/death.svg"
                }
                alt="icon"
                className={`${color} w-10 p-1 rounded-lg z-20`} 
              />
              <div className={`${color} h-px w-25 translate-y-5 opacity-30`}></div> {/*horizontal line*/}
            </div>
            <div className="border border-gray-600 rounded-lg px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96"> 
              <div className="text-xl font-medium">{element.title}</div> 
              <div className="text-gray-300 mb-6 sm:mb-8 sm:text-xs"> {element.location} </div>
              
              {/*show long/short desc based on button being clicked */}
              <div className="mb-4 text-left">
                {selectedElementId === element.id
                  ? element.long_desc
                  : element.description}
              </div>
              
              {/*only show tech (keywords) if extended details is not shown */}
              {selectedElementId !== element.id && (
                <div className="flex flex-wrap mb-6 justify-center">
                  {element.tech && element.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-900 rounded-xl px-2 py-1 text-sm m-1">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <button className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white`} onClick={handleDetailsClick}>
                {selectedElementId === element.id ? "Hide Details" : "Show Details"} {/*details button dependent on if clicked on*/}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}