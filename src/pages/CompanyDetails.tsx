/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompaniesByFilter } from '../hooks/company_hooks';
import { CompanyModelReq } from '../types/company';
import { Notification } from '@mantine/core';

import {
    Container,
    TextInput,
    Button,
    Group,
    Textarea,
    NumberInput,
    Loader,
    Modal,
    Text
} from '@mantine/core';



function CompanyDetails() {
    const { id } = useParams<{ id: string }>();
    const [company, setCompany] = useState<CompanyModelReq | null>(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [confirmUpdate, setConfirmUpdate] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationFailedVisible, setNotificationFailedVisible] = useState(false);

    const { GetCompanyById, UpdateCompany, DeleteCompany } = getCompaniesByFilter();

    useEffect(() => {
        const fetchCompany = async () => {
            if (id) {
                const response = await GetCompanyById(id);
                if (response) {
                    setCompany(response);
                }
            }
        };

        fetchCompany();
    }, [id]);




    const handleInputChange = (field: keyof CompanyModelReq, value: any) => {
        if (company) {
            setCompany({ ...company, [field]: value });
        }
    };

    const handleSave = async () => {
        if (company) {
            setConfirmUpdate(true);
            setLoading(true);

            try {

                const response = await UpdateCompany(company);
                if (response == null) {
                    throw 'empty'
                }
                setTimeout(() => {
                    setNotificationVisible(false);
                    window.location.href = '/home';
                }, 2000);

                setNotificationVisible(true);
            } catch (error) {
                console.error('Failed to update company:', error);
                setNotificationFailedVisible(true);

            } finally {
                setLoading(false);
                setConfirmUpdate(false); // Close the modal after deletion

            }
        }
    };

    const handleDelete = async () => {
        if (company) {
            setConfirmDelete(true); // Close the modal after deletion
            setLoading(true);
            try {
                setNotificationVisible(true);

                const response = await DeleteCompany(company.id || '');
                if (response == null) {
                    throw 'empty'
                }
                setTimeout(() => {
                    setNotificationVisible(false);
                    window.location.href = '/home';
                }, 2000);
            } catch (error) {
                console.error('Failed to delete company:', error);
                setNotificationFailedVisible(true);
            } finally {
                setLoading(false);
                setConfirmDelete(false); // Close the modal after deletion
            }
        }
    };

    if (!company) {
        return <Container size="lg" py="xl"><Loader /></Container>;;
    }

    return (
        <Container size="lg" py="xl">
            {notificationVisible && (
                <Notification loading withCloseButton={false} withBorder color="green" title="We notify you that">
                    Success
                </Notification>)
            }
            {notificationFailedVisible && (
                <Notification withCloseButton={true} withBorder color="red" title="We notify you that">
                    Something went Wrong
                </Notification>)
            }
            <h1>{editMode ? "Edit Company Details" : "Company Details"}</h1>
            <TextInput
                label="Owner Name"
                value={company.ownerName || ''}
                onChange={(e) => handleInputChange('ownerName', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <TextInput
                label="Type"
                value={company.type || ''}
                onChange={(e) => handleInputChange('type', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <Textarea
                label="Description"
                value={company.description || ''}
                onChange={(e) => handleInputChange('description', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <TextInput
                label="Email"
                value={company.email || ''}
                onChange={(e) => handleInputChange('email', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <TextInput
                label="Phone"
                value={company.phone || ''}
                onChange={(e) => handleInputChange('phone', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <TextInput
                label="Website"
                value={company.website || ''}
                onChange={(e) => handleInputChange('website', e.currentTarget.value)}
                mt="md"
                readOnly={!editMode}
            />
            <NumberInput
                label="Rating"
                value={company.rating || 0}
                onChange={(value) => handleInputChange('rating', value)}
                mt="md"
                readOnly={!editMode}
            />
            <Group mt="md">
                {editMode ? (
                    <>
                        <Button onClick={() => setConfirmUpdate(true)}>Save Changes</Button>
                        <Button color="red" onClick={() => setConfirmDelete(true)}>Delete Company</Button>
                    </>
                ) : (
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                )}
            </Group>

            {/* Modal for delete confirmation */}
            <Modal
                opened={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                title="Confirm Deletion"
            >
                <Text>Are you sure you want to delete this company?</Text>
                <Group mt="md">
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button color="red" onClick={handleDelete} loading={loading}>
                        Delete
                    </Button>
                </Group>
            </Modal>
            <Modal
                opened={confirmUpdate}
                onClose={() => setConfirmUpdate(false)}
                title="Confirm Save"
            >
                <Text>Are you sure you want to update this company?</Text>
                <Group mt="md">
                    <Button onClick={() => setConfirmUpdate(false)}>Cancel</Button>
                    <Button color="green" onClick={handleSave} loading={loading}>
                        Save
                    </Button>
                </Group>
            </Modal>
        </Container>
    );
}

export default CompanyDetails;
