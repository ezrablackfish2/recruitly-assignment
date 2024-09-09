// src/router/AppRouter.tsx
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import CompanyDetails from '../pages/CompanyDetails';
import SearchCompanies from '../pages/SearchCompanies';
import CreateCompany from '../pages/CreateCompany';
function AppRouter() {
  return (
    <Routes>
      <Route path="details/:id" element={<CompanyDetails />} />
      <Route path="create" element={<CreateCompany />} />
      <Route path="search" element={<SearchCompanies />} />
      <Route path="/" element={<Home />}>

      </Route>
    </Routes>
  );
}

export default AppRouter;