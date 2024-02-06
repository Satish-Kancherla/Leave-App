import AdminPage from "./AdminPage";
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Jan from "./Jan";
import Update from "./Update";
import EmployeeData from "./EmployeeData";


function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AdminPage />}/>
        <Route path="/employee" element={<EmployeeData />}/>
        <Route path="/filter" element={<Jan />} />
        <Route path="/update/:id" element={<Update/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
