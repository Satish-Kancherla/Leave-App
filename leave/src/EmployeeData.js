import React from 'react'
import "./employeedata.css";
import { useState } from 'react';
import axios from "axios";
// import emailjs from '@emailjs/browser';
// import Swal from 'sweetalert2';

const Employee = () => {

    const project =[{
        name:"Crunch Time",
        employee:[
            {name:"Nehru Hatkar"},{name:"Prasanth Pullaganti"},{name:"Gunna Pavan Sai"},{name:"Gade Narendra"},{name:"Sanchi Muneendra Kumar"},{name:"Sabreen Banu Shaik"},{name:"Chandan Charchit Sahu"}
            ,{name:"Thumati Narendra Reddy"}
        ],
        shift:[
            {name:"06:00 AM - 02:00 PM IST"},{name:"02:00 PM - 10:00 PM IST"},{name:"10:00 PM - 06:00 AM IST"}
        ]
    }
    ,{
        name:"Data-axle TOC",
        employee:[
            {name:"Kolli Raghu"},{name:"Pithani Chidvinay"},{name:"Nukala Lalitha Bhavani"},{name:"Sanjay Wudali"},{name:"Jagadish Sharla"},{name:"Kodali Harshitha"},{name:"Ramisetty Yaswanth Sai"}
            ,{name:"Pakkala Akshitha"},{name:"Atmakuru Jithendra Kumar"},{name:"Bonda Shalom"},{name:"Lakshmipalem Anil Venkata Babu"}
            
            ],
            shift:[
                {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
            ]
    },
    {
        name:"Data-axle MZP",
        employee:[
            {name:"Meghana Sribhashyam"},{name:"Avilala Gowtham Kumar"},{name:"Chandrika Gummalla"},{name:"Katta Shailaja"},{name:"Edpuganti Jasmine"},{name:"Gangireddy Suneetha"},{name:"Vemula Laxman Reddy"}
            ,{name:"Gorla Sravani"},{name:"Avula Venkat Yeswanth Royal"},{name:"Kalasaudram Keerthana"},{name:"Pamuru Sudeshna"}
            
        ],
        shift:[
            {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
        ]
    },
    {
        name:"Data-axle TechOps",
        employee:[
            {name:"Ramgiri Harsha Vardhan"},{name:"Vikas Vinod Jadhav"},{name:"Sitarami Reddy Eda"}
            ,{name:"Murtaza Zakiuddin Bhori"}
        ],
        shift:[
            {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
        ]
   },
   {
    name:"Data-axle MZP & TechOps",
    employee:[
        {name:"Poorna Mani Vulavalapudi"},{name:"Rasmita Pradhan"},{name:"Goutham Garalapati"}
    ],
    shift:[
        {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
    ]
   }]


    
    const[content,setContent] = useState({
        projectname: "", employeename: "",shifttimings: "",startdate: "",enddate:"",numberofdays:"",description:"",managername:""
       });
       const[projects,setProjects]=useState({projectname: ""});
       const[disable, setDisable]=useState('typing');
       const [employee,setEmployee]=useState({employeename:" "});
       const[empname,setEmpname] =useState([]);
       const[shifts,setShifts]=useState([]);
       
       let name,value;
   
       const handleInputs = (e) => {
           name = e.target.name;
           value = e.target.value;
   
           setContent({...content,[name]:value});
                  
       }

       const handleEmployee =(e)=>{
        setEmployee(e.target.value)
        setContent({...content,"employeename":e.target.value})
       }

       const handleProject =(e)=>{
        setProjects(e.target.value);
       setEmpname(project.find(en => en.name === e.target.value).employee);
        setShifts(project.find(sh => sh.name === e.target.value).shift);
        setContent({...content,"projectname":e.target.value})
       }
      
      
       const handleSubmit =()=>{
         axios.post('http://localhost:8083/emp',content)
         .then(res => console.log(res))
         .catch(err => console.log(err));
         setDisable('submitted');    
            
       

    // const serviceId = 'service_gznakse';
    // const templateId = 'template_kapoqcs';
    // const publicKey = '1ncgCtZIX8ryxescF';

    // const templateParams = {
    //   from_name: employee,
    //   to_name: 'Harika',

    // };

    // emailjs.send(serviceId, templateId, templateParams, publicKey)
    //   .then((response) => {
    //     console.log('Email sent successfully!', response);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending email:', error);
    //   });
    // Swal.fire({
    //     title: "Sent",
    //     text: "Your request has been sent for approval",
    //     icon: "success",
    //   });

    // setTimeout(function(){window.location.reload();},4000);
      
    }
     return (
       <div className='employee'>
       <div className='employeedata'>
           <div className="form-data">
               <h1>Leave Request Form</h1>
                    <div className='input'>
            <form  >  
             <table >
             <thead>

             <tr><td><span >Project Name</span></td><td >
               <select name="projectname" id="projectname" value={projects} onChange={handleProject} > 
                <option disable="true"  hidden>Select Project Name</option>
                {project.map((pr,index)=>(
                    <option  key={index} value={pr.name}>{pr.name}</option>
                ))}
                </select></td></tr>

            <tr><td><span >Employee Name</span></td><td>
               <select name="employeename"  id="employeename" value={employee} onChange={handleEmployee} >
               <option value="" disable="true"  hidden>Select Employee Name</option>
               {empname.map((emp,index)=>(
                <option key = {index} value={emp.name}>{emp.name}</option>
               ))}
            </select></td></tr>
               
            <tr><td><span > Shift Timings</span></td><td>
               <select name="shifttimings" id="shifttimings" value={content.shifttimings} onChange={handleInputs} >
               <option disable="true"  hidden>Select Shift Timings</option>
               {shifts.map((sh,index)=>(
                <option key= { index} value={sh.name}>{sh.name}</option>
               ))}
            </select></td></tr>
                   
                <tr><td><span >Start Date</span></td><td>
               <input type="date" name="startdate" id="startdate" value={content.startdate}
                onChange={handleInputs} placeholder='Select Holiday Date' />
                </td></tr>

                <tr><td><span >End Date</span></td><td>
               <input type="date" name="enddate" id="enddate" value={content.enddate}
                onChange={handleInputs} placeholder='Select Holiday Date'/>
                </td></tr>

                <tr><td><span >Number Of Days</span></td><td>
               <input type="number" name="numberofdays" id="numberofdays" value={content.numberofdays}
                onChange={handleInputs} placeholder='Enter Number Of Days'/>
                </td></tr>
                                   
                <tr><td><span >Reason</span></td><td>
               <input name="description" id="description" placeholder='Enter Reason' value={content.description} onChange={handleInputs} />
                </td></tr>
                   
             <tr><td><span>Manager Name</span></td><td><select name="managername" id="managername" value={content.managername} onChange={handleInputs}>
             <option disable="true"  hidden>Select Manager Name</option>
             <option value="Harika">Harika</option>
            </select></td></tr>
           
           </thead>
           </table>
           </form> 
                   </div>	       	
                   <div className="button">
                       <button type="submit" onClick={handleSubmit} /* disabled={content.employeename.length===0 || 
                                       content.projectname.length===0 ||                                     
                                       content.shifttimings.length===0 ||
                                       content.holidaydate.length===0 ||
                                       content.description.length===0 ||
                                       content.managername.length===0 ||
                                       disable==='submitted'} */>Submit</button>
                   </div>	

               </div>
         </div> 
           </div>  
     )
}

export default Employee