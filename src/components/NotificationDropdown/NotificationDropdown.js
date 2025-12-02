// src/components/NotificationDropdown/NotificationDropdown.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './css/NotificationDropdown.css';

const NotificationDropdown = ({ notifications, onNotificationRead }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNotificationClick = async (notification) => {
    try {
      // 1. Marca como lida no backend
      if (!notification.read) {
        await api.post(`/notifications/${notification.id}/read`);
        onNotificationRead(); // Atualiza o contador no Header
      }

      // 2. Redireciona dependendo do tipo de notificação e role do usuário
      const message = notification.message.toLowerCase();
      const isVet = user?.role === 'VETERINARY';
      
      // Verifica se é notificação de chat
      if (message.includes('mensagem') || message.includes('chat')) {
        if (notification.consultationId) {
          navigate(`/chat/consultation/${notification.consultationId}`);
        } else {
          navigate(isVet ? '/vet/chat' : '/conversations');
        }
      }
      // Notificação de nova solicitação de consulta (para veterinários)
      else if (message.includes('nova solicitação') || message.includes('nova consulta')) {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=agendadas');
      }
      // Verifica se é notificação de consulta agendada/aceita
      else if (message.includes('foi agendada') || message.includes('aceita') || message.includes('confirmada')) {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=agendadas');
      }
      // Verifica se é notificação de consulta finalizada/concluída
      else if (message.includes('foi finalizada') || message.includes('concluída') || message.includes('relatório')) {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=historico');
      }
      // Verifica se é notificação de consulta rejeitada/cancelada
      else if (message.includes('rejeitada') || message.includes('cancelada') || message.includes('recusada')) {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=agendadas');
      }
      // Se tiver consultationId mas não se encaixar em nenhuma categoria
      else if (notification.consultationId) {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=agendadas');
      }
      // Fallback genérico
      else {
        navigate(isVet ? '/vet/consultas' : '/consultas?tab=agendadas');
      }

    } catch (error) {
      console.error("Erro ao processar notificação", error);
    }
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className="notification-dropdown empty">
        <p>Nenhuma notificação.</p>
      </div>
    );
  }

  return (
    <div className="notification-dropdown">
      <div className="dropdown-header">
        <h4>Notificações</h4>
      </div>
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li 
            key={notif.id} 
            className={`notification-item ${!notif.read ? 'unread' : ''}`}
            onClick={() => handleNotificationClick(notif)}
          >
            <div className="notif-content">
              <p className="notif-message">{notif.message}</p>
              <span className="notif-time">
                {new Date(notif.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            {!notif.read && <span className="unread-dot"></span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;