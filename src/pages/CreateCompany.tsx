import React, { useState } from 'react';
import { getCompaniesByFilter } from '../hooks/company_hooks';
import {
    Container,
    TextInput,
    Button,
    Group,
    Textarea,
    Notification,
} from '@mantine/core';

// Define the Company type
interface Company {
    city: string;
    countryName: string;
    description: string;
    name: string;
    phone: string;
    postCode: string;
    source: string;
}

function CreateCompany() {
    const [company, setCompany] = useState<Company>({
        city: '',
        countryName: '',
        description: '',
        name: '',
        phone: '',
        postCode: '',
        source: '',
    });
    const [loading, setLoading] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationFailedVisible, setNotificationFailedVisible] = useState(false);

    const { CreateCompany } = getCompaniesByFilter();

    const handleInputChange = (field: keyof Company, value: string) => {
        setCompany((prevCompany) => ({
            ...prevCompany,
            [field]: value,
        }));
    };

    const handleClear = () => {
        setCompany({
            city: '',
            countryName: '',
            description: '',
            name: '',
            phone: '',
            postCode: '',
            source: '',
        });
    };

    const validateFields = () => {
        return Object.values(company).every((field) => field.trim() !== '');
    };

    const handleCreate = async () => {
        if (!validateFields()) {
            alert('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            const response = await CreateCompany(company);
            if (response == null) {
                throw new Error('empty');
            }
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
                window.location.href = '/'; // Redirect after successful creation
            }, 2000);
        } catch (error) {
            console.error('Failed to create company:', error);
            setNotificationFailedVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="lg" py="xl">
            {notificationVisible && (
                <Notification
                    withCloseButton
                    withBorder
                    color="green"
                    title="Success"
                    onClose={() => setNotificationVisible(false)}
                >
                    Company created successfully!
                </Notification>
            )}
            {notificationFailedVisible && (
                <Notification
                    withCloseButton
                    withBorder
                    color="red"
                    title="Error"
                    onClose={() => setNotificationFailedVisible(false)}
                >
                    Failed to create company.
                </Notification>
            )}
            <h1>Create New Company</h1>
            <TextInput
                label="City"
                value={company.city}
                onChange={(e) => handleInputChange('city', e.currentTarget.value)}
                mt="md"
                required
            />
            <TextInput
                label="Country Name"
                value={company.countryName}
                onChange={(e) => handleInputChange('countryName', e.currentTarget.value)}
                mt="md"
                required
            />
            <Textarea
                label="Description"
                value={company.description}
                onChange={(e) => handleInputChange('description', e.currentTarget.value)}
                mt="md"
                required
            />
            <TextInput
                label="Name"
                value={company.name}
                onChange={(e) => handleInputChange('name', e.currentTarget.value)}
                mt="md"
                required
            />
            <TextInput
                label="Phone"
                value={company.phone}
                onChange={(e) => handleInputChange('phone', e.currentTarget.value)}
                mt="md"
                required
            />
            <TextInput
                label="Post Code"
                value={company.postCode}
                onChange={(e) => handleInputChange('postCode', e.currentTarget.value)}
                mt="md"
                required
            />
            <TextInput
                label="Source"
                value={company.source}
                onChange={(e) => handleInputChange('source', e.currentTarget.value)}
                mt="md"
                required
            />
            <Group mt="md">
                <Button onClick={handleCreate} loading={loading}>
                    Create Company
                </Button>
                <Button onClick={handleClear} color="gray">
                    Clear
                </Button>
            </Group>
        </Container>
    );
}

export default CreateCompany;