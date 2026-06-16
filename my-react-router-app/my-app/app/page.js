"use client"

import { useState } from "react";
import Timeline from "./Timeline"; 
import Functions from "./Functions";

export default function Home() {

  //will be used to rerender information without needing to refresh
  const [refreshKey, setRefreshKey] = useState(0); 
  const handleTimelineUpdated = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  //show function buttons first, then the timeline events
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white text-base pb-8 sm:text-lg relative">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-6 mb-4 underline decoration-indigo-500 drop-shadow-glow">The Chronological History Guide</h1>
      <Functions onTimelineUpdated={handleTimelineUpdated} />
      <Timeline key={refreshKey}/>
    </div>
  ); 
}