import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { IoSend } from 'react-icons/io5';
import './css/Chat.css';

const mockConversations = [
  { id: 1, name: 'Carlos Souza (Paciente)', avatar: 'https://i.pravatar.cc/150?img=12', lastMessage: 'Ele está tossindo um pouco...', unread: 1 },
  { id: 2, name: 'Dr. Carlos Silva (Veterinário)', avatar: 'https://i.pravatar.cc/150?img=60', lastMessage: 'Relatório da consulta do Rex enviado.', unread: 0 },
  { id: 3, name: 'Ana Silva (Paciente)', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Olá! A vacina da Luna está agendada?', unread: 2 },
];

const mockMessages = {
  1: [{ id: 1, text: 'Ele está tossindo um pouco, devo me preocupar?', sender: 'other' }],
  2: [{ id: 1, text: 'Relatório da consulta do Rex enviado.', sender: 'other' }],
  3: [{ id: 1, text: 'Olá! A vacina da Luna está agendada para hoje?', sender: 'other' }],
};

const AdminChat = () => {
    const [activeConversationId, setActiveConversationId] = useState(1);
    const [messages, setMessages] = useState(mockMessages[1]);
    const [newMessage, setNewMessage] = useState('');

    const handleConversationClick = (convId) => {
        setActiveConversationId(convId);
        setMessages(mockMessages[convId] || []);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const newMsg = { id: messages.length + 1, text: newMessage, sender: 'me' };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const activeConversation = mockConversations.find(c => c.id === activeConversationId);

    return (
        <div className="chat-page">
            <HeaderAdmin />
            <div className="chat-container">
                <div className="chat-sidebar">
                    <div className="sidebar-header"><h3>Conversas</h3></div>
                    <div className="contact-list">
                        {mockConversations.map(conv => (
                            <div 
                                key={conv.id} 
                                className={`contact-item ${conv.id === activeConversationId ? 'active' : ''}`}
                                onClick={() => handleConversationClick(conv.id)}
                            >
                                <img src={conv.avatar} alt={conv.name} className="contact-avatar" />
                                <div className="contact-info">
                                    <span className="contact-name">{conv.name}</span>
                                    <span className="contact-last-message">{conv.lastMessage}</span>
                                </div>
                                {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-main">
                    {activeConversation ? (
                        <>
                            <div className="chat-header">
                                <img src={activeConversation.avatar} alt={activeConversation.name} className="contact-avatar" />
                                <span className="contact-name">{activeConversation.name}</span>
                            </div>
                            <div className="message-area">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <form className="message-input-area" onSubmit={handleSendMessage}>
                                <input type="text" placeholder="Digite sua mensagem..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                <button type="submit"><IoSend size={22} /></button>
                            </form>
                        </>
                    ) : (
                        <div className="no-chat-selected">Selecione uma conversa para começar</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminChat;