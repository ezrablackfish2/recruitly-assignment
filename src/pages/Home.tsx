import { useEffect, useState } from 'react';
import { getCompaniesByFilter } from '../hooks/company_hooks';
import { CompanyModelReq } from '../types/company';
import { SimpleGrid, Container } from '@mantine/core';
import { BadgeCard } from '../components/BadgeCard';
import LoaderGrid from '../components/loaderGrid';
function Home() {
  const [companies, setCompanies] = useState<CompanyModelReq[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { getCompanies } = getCompaniesByFilter();
        const response = await getCompanies();
        if (response && response.data) {
          setCompanies(response.data);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container my="md">
      {loading ? (
        < LoaderGrid />
      ) : companies && companies.length ? (
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
      ) : (
        <h1>No companies found</h1>
      )}
    </Container>
  );


}


export default Home;
