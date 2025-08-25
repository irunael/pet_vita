import React, { useState } from 'react';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import { IoSend } from 'react-icons/io5';
import '../css/styles.css'; 

// Dados mockados para simular conversas do veterinário
const mockConversations = [
  { id: 1, name: 'Carlos Souza (Tutor do Rex)', avatar: 'https://i.pravatar.cc/150?img=12', lastMessage: 'Ele está tossindo um pouco, devo me preocupar?', unread: 1 },
  { id: 2, name: 'Ana Silva (Tutora da Luna)', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Olá! A vacina da Luna está agendada para hoje?', unread: 2 },
  { id: 3, name: 'Mariana Lima (Tutora do Thor)', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Obrigada pelo cuidado com o Thor!', unread: 0 },
  { id: 4, name: 'Administração Pet Vita', avatar: 'https://cdn-icons-png.flaticon.com/512/906/906343.png', lastMessage: 'Lembrete: Reunião de equipe amanhã.', unread: 0 },
];

const mockMessages = {
  1: [
    { id: 1, text: 'Olá! É uma tosse seca ou com secreção?', sender: 'me' },
    { id: 2, text: 'É uma tosse mais seca, parece um engasgo.', sender: 'other' },
    { id: 3, text: 'Entendi. Pode ser algo simples, mas é bom verificar.', sender: 'me' },
    { id: 4, text: 'Ele está tossindo um pouco, devo me preocupar?', sender: 'other' },
  ],
  2: [
    { id: 1, text: 'Olá! A vacina da Luna está agendada para hoje?', sender: 'other' },
  ],
  3: [
    { id: 1, text: 'Obrigada pelo cuidado com o Thor!', sender: 'other' },
  ],
  4: [
    { id: 1, text: 'Lembrete: Reunião de equipe amanhã.', sender: 'other' },
  ]
};

const VetChat = () => {
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
            sender: 'me' // 'me' representa o veterinário nesta tela
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const activeConversation = mockConversations.find(c => c.id === activeConversationId);

    return (
        <div className="chat-page">
            <HeaderVet />
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

export default VetChat;