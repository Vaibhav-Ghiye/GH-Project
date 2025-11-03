import { Routes, Route } from 'react-router'
import Login from "./Pages/Login";
import Home from './Pages/Home';
import Customers from './Pages/CustmorManagement';
import Suppliers from './Pages/SupplierManagement';
import CustomerDetails from './Pages/CustmorDetails';
import SupplierDetails from './Pages/SupplierDetails';
import ReportAnalysis from './Pages/Report_Analysis'; 
import BillDetails from './Pages/billDetails';
import BillDetailsCustmor from './Pages/billDetailsCustmor';


function App() {
  return (
    <>
      <div className=''>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Customer Management Routes */}
          <Route path="/customers" element={<Customers />} />
         <Route path="/customers/:name" element={<CustomerDetails />} />
         <Route path="/customers/:name/bill/:invoice" element={<BillDetailsCustmor />} />

          {/* Supplier Management Routes */}
          <Route path="/suppliers" element={<Suppliers />} />
        
          <Route path="/suppliers/:name" element={<SupplierDetails />} />
          <Route path="/suppliers/:name/bills/:invoice" element={<BillDetails />} />
          {/* Reports */}
          <Route path="/reports" element={<ReportAnalysis />} /> 

        </Routes>
      </div>
    </>
  );
}

export default App;
