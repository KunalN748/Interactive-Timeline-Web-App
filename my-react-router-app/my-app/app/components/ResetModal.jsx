"use client"

import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { resetTimeline } from '../api/timelineService';

function ResetModal({ onClose, onTimelineReset }) {
    const modalRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const closeModal = (e) => {
        if (modalRef.current === e.target) { //if cursor clicked off of modal , close modal
            onClose();
        }
    };

    const handleReset = async () => {
        setIsSubmitting(true); //prevents form submission reloading page
        await resetTimeline(); //sends submission information to timelineService
        onTimelineReset?.(); //allows Timeline.jsx to delete event without needing to refersh
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return(
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end'><X size={30}/></button> {/*cross out button */}
                <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>Reset Timeline</h1>
                    
                    <p className="text-center">Are you sure? </p>
                    {/*choice for user to fill out */}   
                    <div className="flex gap-4">
                        <button 
                            onClick={handleReset}
                            disabled={isSubmitting}
                            className="bg-gray-300 text-center space-x-2 text-gray-950 font-medium px-4 py-1 mt-3 rounded-md cursor-pointer hover:text-white disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Yes'} {/*completes submission process */}
                        </button>
                        <button 
                            onClick={handleCancel}
                            className="bg-gray-300 text-center space-x-2 text-gray-950 font-medium px-4 py-1 mt-3 rounded-md cursor-pointer hover:text-white"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetModal;