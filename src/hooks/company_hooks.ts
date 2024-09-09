

import { findCompaniesByFilter, viewCompanyDetails, deleteCompany, createOrUpdateCompany, searchCompanyDetails } from "../api/api"
import { CompanyModelReq } from "../types/company"
export const getCompaniesByFilter = () => {
    const getCompanies = async () => {
        try {
            const response = await findCompaniesByFilter();
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const GetCompanyById = async (companyId: string) => {
        try {
            const response = await viewCompanyDetails(companyId);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const UpdateCompany = async (company: CompanyModelReq) => {
        try {
            const response = await createOrUpdateCompany(company);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const DeleteCompany = async (companyId: string) => {
        try {
            const response = await deleteCompany(companyId);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const CreateCompany = async (company: CompanyModelReq) => {
        try {
            const response = await createOrUpdateCompany(company);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const searchCompanyDetail = async (query: string) => {
        try {
            const response = await searchCompanyDetails({ query });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return {
        getCompanies, GetCompanyById, UpdateCompany, DeleteCompany, CreateCompany, searchCompanyDetail
    }
}