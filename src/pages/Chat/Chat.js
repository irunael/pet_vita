import React, { useState } from 'react';
import Header from '../../components/Header_com_cadastro'; // CORRIGIDO
import Footer from '../../components/Footer'; // CORRIGIDO
import { IoSend } from 'react-icons/io5';
import './css/styles.css';

// Dados mockados para simular conversas
const mockConversations = [
  { id: 1, name: 'Dr. Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: 'Claro, pode trazer o Rex amanhã.', unread: 1 },
  { id: 2, name: 'Administração Pet Vita', avatar: 'https://cdn-icons-png.flaticon.com/512/906/906343.png', lastMessage: 'Sua fatura de Julho já está disponível.', unread: 0 },
  { id: 3, name: 'Dra. Juliana Costa', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'Os resultados do exame da Luna chegaram.', unread: 0 },
];

const mockMessages = {
  1: [
    { id: 1, text: 'Olá Dr. Carlos, o Rex está tossindo um pouco. Devo me preocupar?', sender: 'me' },
    { id: 2, text: 'Olá! É uma tosse seca ou com secreção?', sender: 'other' },
    { id: 3, text: 'É uma tosse mais seca, parece um engasgo.', sender: 'me' },
    { id: 4, text: 'Entendi. Pode ser algo simples, mas é bom verificar. Consegue trazê-lo para uma avaliação?', sender: 'other' },
    { id: 5, text: 'Claro, pode trazer o Rex amanhã.', sender: 'other' },
  ],
  2: [
    { id: 1, text: 'Sua fatura de Julho já está disponível.', sender: 'other' },
  ],
  3: [],
}

const Chat = () => {
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

        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me'
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const activeConversation = mockConversations.find(c => c.id === activeConversationId);

    return (
        <div className="chat-page">
            <Header />
            <div className="chat-container">
                {/* Sidebar com a lista de conversas */}
                <div className="chat-sidebar">
                    <div className="sidebar-header">
                        <h3>Conversas</h3>
                    </div>
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

                {/* Área principal do chat */}
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
                                <input 
                                    type="text" 
                                    placeholder="Digite sua mensagem..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
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

export default Chat;