/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { SimpleGrid, Container } from '@mantine/core';
import { BadgeCard } from '../components/BadgeCard';
import { getCompaniesByFilter } from '../hooks/company_hooks';
import { CompanyModelReq } from '../types/company';
import LoaderGrid from '../components/loaderGrid';

function SearchCompanies() {
  const [searchTerm, setSearchTerm] = useState<CompanyModelReq[]>([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { searchCompanyDetail } = getCompaniesByFilter();


  if (isError) {
    return <div>Error fetching companies</div>;
  }

  const handleSearch = async (value: string | any[] | ((prevState: CompanyModelReq[]) => CompanyModelReq[])) => {
    setSearchTerm(value);
    if (value.length < 3) {
      setCompanies([]);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    try {
      const response = await searchCompanyDetail(value);
      if (response) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>Search Companies</h1>
      <Autocomplete
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        leftSection={<IconSearch style={{ width: 16, height: 16 }} stroke={1.5} />}
        data={isLoading ? [] : companies.map(company => company.name)} // Adjust based on your data structure
        visibleFrom="xs"
      />
      <br />
      <Container my="md">
        {isError && <div>Error fetching companies</div>}
        {isLoading ? (
          <LoaderGrid />)
          : (
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
              {companies.map((company: CompanyModelReq) => (
                <BadgeCard
                  key={company.id}
                  id={company.id || ''}
                  image={company.imageUrl || 'https://via.placeholder.com/150'} // Fallback image if none exists
                  title={company.name || 'No Name'}
                  description={company.description || 'No Description'}
                  country={company.domain || 'Unknown Domain'} // Example for extra data
                  badges={[
                    { emoji: '🏢', label: company.companyTypeId || 'Unknown Type' },
                    { emoji: '📧', label: company.email || 'No Email' },
                  ]} // You can adjust badges based on available company fields
                />
              ))}
            </SimpleGrid>

          )}
      </Container>
    </Container>
  );
}

export default SearchCompanies;





