import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { Search, UserPlus, Edit, Trash2, LoaderCircle } from 'lucide-react';
import Modal from '../../components/Modal';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        role: 'patient',
        password: '',
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/users/management/');
            setUsers(Array.isArray(response.data) ? response.data : (response.data.results || []));
        } catch (error) {
            toast.error("Failed to fetch user data.");
            setUsers([]); // Ensure users is always an array
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenAddModal = () => {
        setNewUser({ full_name: '', email: '', phone_number: '', role: 'patient', password: '' });
        setErrors({});
        setIsAddModalOpen(true); 
    };
    const handleCloseAddModal = () => setIsAddModalOpen(false);
    const handleAddInputChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });
    const handleAddUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        try {
            const response = await axiosInstance.post('/api/users/management/', newUser);
            setUsers([response.data, ...users]);
            toast.success("User added successfully!");
            handleCloseAddModal();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                toast.error("Please correct the form errors.");
            } else {
                toast.error("Failed to add user.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setEditFormData({ ...user, password: '' }); 
        setErrors({});
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => setIsEditModalOpen(false);
    const handleEditInputChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!selectedUser) return;
        
        setIsSubmitting(true);
        setErrors({});
        const dataToUpdate = { ...editFormData };
        if (!dataToUpdate.password) {
            delete dataToUpdate.password;
        }

        try {
            const response = await axiosInstance.patch(`/api/users/management/${selectedUser.id}/`, dataToUpdate);
            setUsers(users.map(u => (u.id === selectedUser.id ? response.data : u)));
            toast.success("User updated successfully!");
            handleCloseEditModal();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                toast.error("Please correct the form errors.");
            } else {
                toast.error("Failed to update user.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axiosInstance.delete(`/api/users/management/${userId}/`);
                setUsers(users.filter(user => user.id !== userId));
                toast.success("User deleted successfully.");
            } catch (error) {
                toast.error("Failed to delete user.");
            }
        }
    };

    const filteredUsers = users.filter(user => {
        if (!user) return false;
        const searchTermLower = searchTerm.toLowerCase();
        const fullNameMatch = user.full_name ? user.full_name.toLowerCase().includes(searchTermLower) : false;
        const emailMatch = user.email ? user.email.toLowerCase().includes(searchTermLower) : false;
        const roleMatch = user.role ? user.role.toLowerCase().includes(searchTermLower) : false;
        return fullNameMatch || emailMatch || roleMatch;
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">User Management</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button onClick={handleOpenAddModal} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Full Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Date Joined</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="6" className="text-center py-8"><LoaderCircle className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                        ) : filteredUsers.map(user => (
                            <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.full_name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'doctor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
                                <td className="px-6 py-4">{new Date(user.date_joined).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{user.is_active ? 'Active' : 'Inactive'}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenEditModal(user)} className="p-2 text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><Edit className="h-4 w-4" /></button>
                                    <button onClick={() => handleDelete(user.id)} className="p-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><Trash2 className="h-4 w-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal} title="Add a New User">
                <form onSubmit={handleAddUser} className="space-y-4">
                    {/* Form fields for adding a user... */}
                    <div>
                        <label htmlFor="add_full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input id="add_full_name" type="text" name="full_name" value={newUser.full_name} onChange={handleAddInputChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="add_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input id="add_email" type="email" name="email" value={newUser.email} onChange={handleAddInputChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="add_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                        <input id="add_phone" type="tel" name="phone_number" value={newUser.phone_number} onChange={handleAddInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label htmlFor="add_role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <select id="add_role" name="role" value={newUser.role} onChange={handleAddInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"><option value="patient">Patient</option><option value="doctor">Doctor</option><option value="admin">Admin</option></select>
                    </div>
                    <div>
                        <label htmlFor="add_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Password</label>
                        <input id="add_password" type="password" name="password" value={newUser.password} onChange={handleAddInputChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>
                    <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-6">
                        <button type="button" onClick={handleCloseAddModal} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center">{isSubmitting && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />} Add User</button>
                    </div>
                </form>
            </Modal>
            
            {selectedUser && (
                <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title={`Edit User: ${selectedUser.full_name}`}>
                    <form onSubmit={handleUpdateUser} className="space-y-4">
                        {/* Form fields for editing a user... */}
                        <div>
                            <label htmlFor="edit_full_name" className="block text-sm font-medium">Full Name</label>
                            <input id="edit_full_name" type="text" name="full_name" value={editFormData.full_name || ''} onChange={handleEditInputChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
                            {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name[0]}</p>}
                        </div>
                        <div>
                            <label htmlFor="edit_email" className="block text-sm font-medium">Email</label>
                            <input id="edit_email" type="email" name="email" value={editFormData.email || ''} onChange={handleEditInputChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                        </div>
                        <div>
                            <label htmlFor="edit_phone" className="block text-sm font-medium">Phone Number</label>
                            <input id="edit_phone" type="tel" name="phone_number" value={editFormData.phone_number || ''} onChange={handleEditInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
                        </div>
                        <div>
                            <label htmlFor="edit_role" className="block text-sm font-medium">Role</label>
                            <select id="edit_role" name="role" value={editFormData.role || ''} onChange={handleEditInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700"><option value="patient">Patient</option><option value="doctor">Doctor</option><option value="admin">Admin</option></select>
                        </div>
                        <div>
                            <label htmlFor="edit_password" className="block text-sm font-medium">New Password (leave blank to keep unchanged)</label>
                            <input id="edit_password" type="password" name="password" value={editFormData.password || ''} onChange={handleEditInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                        </div>
                        <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-6">
                            <button type="button" onClick={handleCloseEditModal} className="mr-2 px-4 py-2 text-sm font-medium">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md flex items-center">{isSubmitting && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />} Save Changes</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default UserManagementPage;