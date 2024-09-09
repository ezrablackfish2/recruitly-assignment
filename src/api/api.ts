
/* eslint-disable no-useless-catch */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {CompanyModelReq} from '../types/company';
// Define the base URL for the API
const BASE_URL = 'https://api.recruitly.io/api/company';
const apiKey = import.meta.env.VITE_API_KEY;

// Create a custom Axios instance with apiKey included in every request
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey,
    },
});

// Request interceptor to ensure apiKey is always included in params
apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apiKey,
    };
    return config;
});

// Get companies by filter
export const findCompaniesByFilter = async (params?: object): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.get('/', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create or update a company
export const createOrUpdateCompany = async (companyData: CompanyModelReq): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.post('/v2', companyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// List company details
export const listCompanyDetails = async (params?: object): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.get('/list', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Search company details
export const searchCompanyDetails = async (params?: object): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.get('/search', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create or update a company using v2 endpoint
export const createOrUpdateCompanyV2 = async (companyData: CompanyModelReq): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.post('/v2', companyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// View company details by company ID
export const viewCompanyDetails = async (companyId: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.get(`/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a company by company ID
export const deleteCompany = async (companyId: string): Promise<AxiosResponse> => {
    try {
        const response = await apiClient.delete(`/${companyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
