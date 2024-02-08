import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,  useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();
    const[user,setUser] = useState({
         status:"",
        });

    

    const handleInputs = (e) => {
        setUser((prev)=>({...prev,[ e.target.name]:e.target.value}));
    };

    useEffect(()=>{
        axios.get("http://16.171.16.133:8083/userdetails/"+id)
        .then(res =>{
            setUser(res.data[0]);
        })
        .catch(err => console.log(err));
    },[id]);

    const handleUpdate= async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://16.171.16.133:8083/users/${id}`, user);
            
        }catch(err){
            console.log(err);
        } 
    };   

         
    let date1= new Date(user['startdate']);
    let date2= new Date(user['enddate']);

  return (
    <div className='adminpage' >
    <h1>Update Status</h1>
    <hr/> 
    
    <form>  
    <div className="updatepage-content" >
    <table className='updatepage-table'>
        <thead >
            <tr>            
            <th className='heading' name="employeename">EMPLOYEE NAME </th>           
            <th className='heading' name="startdate">START DATE </th>
            <th className='heading' name="enddate">END DATE </th>
            <th className='heading' name="status">STATUS</th>
            </tr>
        </thead >
        <tbody>
            
        <tr key={id}>        
             <td className='data'><input type="text"  name="employeename" id="employeename" value={user.employeename} onChange={handleInputs} disabled/></td>
            <td className='data'><input type="text" name="startdate" id="startdate" value={date1.toLocaleDateString()}onChange={handleInputs} disabled/></td>
            <td className='data'><input type="text" name="enddate" id="enddate" value={date2.toLocaleDateString()}onChange={handleInputs} disabled/></td>
            <td className='data'  name="status"  id="status" >
            <select  className='data' id="status" name="status" value={user.status}  onChange={handleInputs}>
                <option  value="Pending">Pending</option>
                <option  value="Aprooved">Aprooved</option>
            </select></td>
            
            </tr>
        </tbody>
    </table>     
    
    </div>    
    </form>
    <div className='update-btn'>
    <button onClick={handleUpdate}><Link to="/filter">submit</Link></button>
    </div>
    </div>
    
  )
  }
export default Update;
