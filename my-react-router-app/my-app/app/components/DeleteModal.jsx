"use client"

import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { deleteEvent } from '../api/timelineService';

function DeleteModal({ onClose, onEventDeleted }) {
    const modalRef = useRef();
    const [eventId, setEventId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const closeModal = (e) => {
        if (modalRef.current === e.target) { //if off of modal clicked, close modal
            onClose();
        }
    };

    const handleChange = (e) => {
        setEventId(e.target.value); //updates the eventId
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents form submission reloading page
        if (!eventId) 
            return;
        setIsSubmitting(true); 
        await deleteEvent(eventId); //sends submission information to timelineService
        onEventDeleted ?. (eventId); //allows Timeline.jsx to delete event without needing to refersh
        onClose();
    };

    return(
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end'><X size={30}/></button> {/*cross out button */}
                <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>Delete</h1>

                    {/*form for user to fill out */}       
                    <form onSubmit={handleSubmit}>
                        <p className='text-center'>Type in the card number <br />you want to delete:</p>
                        <input 
                            type='number'
                            min='0'
                            max='2026'
                            step='1'
                            placeholder='Card ID'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md'
                            value={eventId}
                            onChange={handleChange}
                        />
                        <div className='ml-10'>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-gray-300 text-center mt-4 text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white ${isSubmitting ? 'opacity-50' : ''}`}
                            >
                                {isSubmitting ? 'Deleting...' : 'Submit'} {/*completes submission process */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal