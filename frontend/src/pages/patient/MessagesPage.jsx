
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, Send, User } from 'lucide-react';
import dayjs from 'dayjs';

const MessagesPage = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messageEndRef = useRef(null);

    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/core/conversations/');
                setConversations(response.data);

                if (response.data.length > 0) {
                    setSelectedConversation(response.data[0]);
                }
            } catch (error) {
                toast.error("Failed to load conversations.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedConversation) {
                try {
                    const response = await axiosInstance.get(`/core/conversations/${selectedConversation.id}/messages/`);
                    setMessages(response.data);
                } catch (error) {
                    toast.error("Failed to load messages.");
                }
            }
        };
        fetchMessages();

        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);

    }, [selectedConversation]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        
        try {
            const response = await axiosInstance.post(`/core/conversations/${selectedConversation.id}/send/`, {
                content: newMessage,
            });
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            toast.error("Failed to send message.");
        }
    };

    const getOtherParticipant = (participants) => {
        return participants.find(p => p.id !== user.id);
    };

    return (
        <div className="flex h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Sidebar with conversations */}
            <div className="w-1/3 border-r dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold">Chats</h2>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {isLoading ? <LoaderCircle className="mx-auto mt-10 animate-spin" /> : (
                        conversations.map(convo => {
                            const otherUser = getOtherParticipant(convo.participants);
                            return (
                                <div key={convo.id} onClick={() => setSelectedConversation(convo)} className={`p-4 flex items-center cursor-pointer border-l-4 ${selectedConversation?.id === convo.id ? 'border-blue-500 bg-gray-100 dark:bg-gray-700' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                                        <User className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{otherUser?.full_name || 'Unknown User'}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{convo.last_message?.content || 'No messages yet'}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Main chat window */}
            <div className="w-2/3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b dark:border-gray-700 flex items-center">
                            <h3 className="font-bold text-lg">{getOtherParticipant(selectedConversation.participants)?.full_name}</h3>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex mb-4 ${msg.sender.id === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-md p-3 rounded-lg ${msg.sender.id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                        <p>{msg.content}</p>
                                        <p className="text-xs mt-1 opacity-70">{dayjs(msg.timestamp).format('h:mm A')}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                        <div className="p-4 border-t dark:border-gray-700">
                            <form onSubmit={handleSendMessage} className="flex items-center">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-l-lg focus:outline-none" />
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg"><Send /></button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;