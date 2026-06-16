"use client"

import { useState } from "react";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import ResetModal from "./components/ResetModal";

function AddPopUp({ onTimelineUpdated }) {

    // Creating the variables for each modal and setting them as false
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    //closes modal and updates parent
    const handleEventAdded = (newEvent) => {
        setShowAddModal(false); 
        onTimelineUpdated();  
    };
    const handleEventDeleted = (eventId) => {
        setShowDeleteModal(false);
        onTimelineUpdated();
    };
    const handleTimelineReset = () => {
        setShowResetModal(false);
        onTimelineUpdated();
    };

    return( //buttons at top of screen: Add, Delete, and Reset
        <div className="flex flex-row items-center gap-6">
            <div>
                <div>
                    <button onClick={() => setShowAddModal(true)} className="bg-indigo-500 text-center space-x-2 text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white">Add</button>
                </div>
                {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onEventAdded={handleEventAdded} />}
            </div>

            <div>
                <div>
                    <button onClick={() => setShowDeleteModal(true)} className="bg-indigo-500 text-center space-x-2 text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white">Delete</button>
                </div>
                {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onEventDeleted={handleEventDeleted} />}
            </div>
            
            <div>
                <div>
                    <button onClick={() => setShowResetModal(true)} className="bg-indigo-500 text-center space-x-2 text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white">Reset</button>
                </div>
                {showResetModal && <ResetModal onClose={() => setShowResetModal(false)} onTimelineReset={handleTimelineReset} />}
            </div>
        </div>
    );
}

export default AddPopUp;