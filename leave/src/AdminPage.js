import React from 'react'
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link} from 'react-router-dom';



const AdminPage = () => {
    const[data,setData] = useState([]);
    const[content,setContent]= useState(
        {id:"", employeename:"",projectname: "",shifttimings: "",startdate:"",enddate:"",numberofdays:"",description:"",managername:"",status:""});

   
    const conponentPDF= useRef();   

    useEffect(()=>{
        fetchData();
    },[])
   
    const fetchData = async()=>{
        try{
            const result = await axios("http://localhost:8083/users");
            setData(result.data);
        } catch (err) {
            console.log("something Wrong");
        }
    }
   
    let name,values;
    const handleInputs = (e) => {
        
        name = e.target.name;
        values= e.target.value;

        setContent({...content,[name]:values});
    }    
    
    const generatePDF= useReactToPrint({
        content: ()=>conponentPDF.current,
        documentTitle:"EmployeeData",
       
    });
   
  return (
    <div className='adminpage' ref={conponentPDF} style={{width:'100%'}}>
        <h1>Employees Requests </h1>
        <hr/>         
        <div className="btn-1">
        <div className='sort'>
       <button className='button'> <Link to="/filter">FILTER</Link></button>
      </div>
      
        <button className="btn" onClick={generatePDF}>PDF</button>
        </div>
        
        <div className="adminpage-content" >
            <table className='adminpage-table'>
                <thead >
                    <tr>
			        <th className='heading' name="employeename">EMPLOYEE NAME </th>
			        <th className='heading' name="projectname">PROJECT NAME </th>
			        <th className='heading' name="shifttimings">SHIFT TIMINGS </th>
			        <th className='heading' name="startdate">START DATE </th>
                    <th className='heading' name="enddate">END DATE </th>
                    <th className='heading' name="numberofdays">NUMBER OF DAYS </th>
			        <th className='heading' name="description">DESCRIPTION </th>
			        <th className='heading' name="managername">MANAGER NAME </th>
                    <th className='heading' name="status">STATUS </th>
                    </tr>
                </thead >
                <tbody>
                    {data.map((user,id) => {
                        let date1= new Date(user['startdate']);
                        let date2= new Date(user['enddate']);
                        return (
                            <tr key={id}>
                                <td className='data' name="employeename" value={content.employeename} onChange={handleInputs}>{user.employeename}</td>
                                <td className='data' name="projectname" value={content.projectname} onChange={handleInputs}>{user.projectname}</td>
                                <td className='data' name="shifttimings"  value={content.shifttimings} onChange={handleInputs}>{user.shifttimings}</td>
                                <td className='data' name="startdate"  value={content.startdate} onChange={handleInputs}>{date1.toLocaleDateString()}</td>
                                <td className='data' name="enddate"  value={content.enddate} onChange={handleInputs}>{date2.toLocaleDateString()}</td>
                                <td className='data' name="numberofdays"  value={content.numberofdays} onChange={handleInputs}>{user.numberofdays}</td>
                                <td className='data' name="description"  value={content.description} onChange={handleInputs}>{user.description}</td>
                                <td className='data' name="managername"  value={content.managername} onChange={handleInputs}>{user.managername}</td>
                                
                                <td className='data'  ><Link to={`/update/${user.id}`}>
                                 
                                    <select  className='data'  name="status" value={user.status}  onChange={handleInputs}>
                                        <option value="Pending">Pending</option>
                                        <option value="Aprooved">Aprooved</option>
                                     </select></Link></td>
                                
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            
          
        </div>

    </div>
  )
}

export default AdminPage
