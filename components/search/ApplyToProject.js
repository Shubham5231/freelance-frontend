import { useState, useRef } from 'react';
import { Dialog } from '@material-ui/core';

function ApplyToProject({project, currentUserProfile}) {

    const messageInpRef = useRef(null);
    const durationInpRef = useRef(null);
    const bidInpRef = useRef(null);

    const [loading, setLoading] = useState(false);

    async function validateAndApply(){
        if(messageInpRef.current.value && durationInpRef.current.value && bidInpRef.current.value){
            setLoading(true);
            console.log("apply pay load "+JSON.stringify({
                "projectId": project._id,
                "userId" : currentUserProfile.user[0]._id,
                "bid" : bidInpRef.current.value,
                "duration" : durationInpRef.current.value+" Months",
                "description" : messageInpRef.current.value
            }));
            const res = await fetch("http://elance-be.herokuapp.com/api/hire/applyProject", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "projectId": project._id,
                                "userId" : currentUserProfile.user[0]._id,
                                "bid" : bidInpRef.current.value,
                                "duration" : durationInpRef.current.value,
                                "description" : messageInpRef.current.value
                            })
            });
            const res_json = await res.json();
            console.log("Apply Res"+ JSON.stringify(res_json));
            setLoading(false);
        }
    }
    return (
        <div>
            <div>
                <h1 className="border-b-2 border-[#c4c4c4] p-5 font-bold">
                    You are applying to {project.projectTitle}!
                </h1>
                <div className="p-5 space-y-2">
                    <h1>
                        A short message to the job poster? *
                    </h1>
                    <div className={`border border-[#c4c4c4] rounded-md p-2`}>
                        <input
                            ref={messageInpRef}
                            className="w-full focus:outline-none"
                            placeholder="Write your message here"/>
                    </div>
                </div>
                <div className="p-5 space-y-2">
                    <h1>
                        How many months are available to work? *
                    </h1>
                    <div className={`border border-[#c4c4c4] rounded-md p-2`}>
                        <input
                            ref={durationInpRef}
                            className="w-full focus:outline-none"
                            placeholder="Type duration here"/>
                    </div>
                </div>
                <div className="p-5 space-y-2">
                    <h1>
                        How much hourly rate are you expecting? *
                    </h1>
                    <div className={`border border-[#c4c4c4] rounded-md p-2`}>
                        <input
                            ref={bidInpRef}
                            className="w-full focus:outline-none"
                            placeholder="Type hourly rate in rupees"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 p-5">
                    <div/>
                    <h1 onClick={validateAndApply} className="lg:px-4 lg:py-2 p-2 border border-[#29b2fe] bg-[#29b2fe] rounded-full text-center justify-center cursor-pointer text-white font-semibold hover:text-[#29b2fe] hover:bg-white">
                        Send Application
                    </h1>
                    <div />
                </div>
                
            </div>
            <Dialog
                    open={loading}
                    className={`${loading ? "" : "hidden"}`}>
                    <div className="animate-pulse flex items-center justify-center p-5">
                        <img
                            className="w-12 h-12"
                            src="https://cdn.worldvectorlogo.com/logos/freelancer-1.svg"/>
                        <h1 className="italic text-xl font-extrabold -ml-3 text-[#0e1724] hidden lg:flex">elance</h1>    
                    </div>
                </Dialog> 
        </div>
    )
}

export default ApplyToProject
