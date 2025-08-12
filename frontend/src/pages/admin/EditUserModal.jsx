

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { Search, UserPlus, FileDown } from 'lucide-react';

import Modal from '../../components/Modal';
import EditUserModal from './EditUserModal';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/users/admin/users/');
            setUsers(response.data);
        } catch (error) {
            toast.error("Could not fetch users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleUserUpdate = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const filteredUsers = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const roleStyles = { /* ... */ };


    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">User Management</h1>
                
                {/* Header with Search and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    {/* ... (search and action buttons JSX remains the same) ... */}
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {/* ... (thead remains the same) ... */}
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center py-8">Loading users...</td></tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        {/* ... (other tds remain the same) ... */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* --- UPDATE THIS BUTTON --- */}
                                            <button 
                                                onClick={() => handleEditClick(user)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Render the Modal --- */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Edit User: ${editingUser?.full_name}`}>
                {editingUser && (
                    <EditUserModal 
                        user={editingUser} 
                        onClose={handleCloseModal} 
                        onUserUpdate={handleUserUpdate} 
                    />
                )}
            </Modal>
        </>
    );
};

export default UserManagementPage;