"use client"

import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { createEvent } from '../api/timelineService';

function AddModal({ onClose, onEventAdded }) {
    const modalRef = useRef();
    const [formData, setFormData] = useState({ //stores user input for new event before sending to backend
        title: '',
        location: '',
        icon: '',
        color: '',
        tech: '',
        date: '',
        description: '',
        long_desc: '',
        buttonText: 'Details'
    });
    const [isSubmitting, setIsSubmitting] = useState(false); //tracks if form is being submitted

    const closeModal = (e) => { //if cursor hits anywhere outside modal close it
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); //updates the corresponding field in formData
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //stops refreshing of page when form is submitted
        setIsSubmitting(true);

        const techArray = formData.tech.split(',').map(item => item.trim()).filter(item => item !== ''); //creates an array from the diff tech keywords
        
        const eventData = { ...formData, tech: techArray }; //override tech property to be array
        const newEvent = await createEvent(eventData); //send to timelineService
        onEventAdded ?. (newEvent); //instantly add event to Timeline.jsx file without needing to refersh
        onClose();
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]'> 
            <div className='mt-8 flex flex-col text-white w-[600px]'>
                <button onClick={onClose} className='place-self-end'><X size={30}/></button> {/*cross out button */}
                <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>Add</h1>

                    {/*form for user to fill out */}       
                    <form onSubmit={handleSubmit} className="w-full">
                        <input 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Type in title'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <input 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder='Enter location'
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <select 
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3"
                        >
                            {/*option choice to make sure non-icon names will be entered */}
                            <option value="">Select Icon Type</option> 
                            <option value="baby">Adolescence</option>
                            <option value="person">Alive</option>
                            <option value="death">Dead</option>
                        </select>
                        <input 
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            placeholder='Color'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <input 
                            name="tech"
                            value={formData.tech}
                            onChange={handleChange}
                            placeholder='Key Words, separate with commas'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <input 
                            name="date"
                            type = "number"
                            min = "1"
                            max = "2026"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder='Type in year'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <input 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Type in short description'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                        />
                        <textarea 
                            name="long_desc"
                            value={formData.long_desc}
                            onChange={handleChange}
                            placeholder='Type in long description'
                            required
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md mb-3'
                            rows={3}
                        />
                        <div className="text-center">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-gray-300 text-center space-x-2 text-gray-950 font-medium px-4 py-1 rounded-md cursor-pointer hover:text-white disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'} {/*completes submission process */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddModal;