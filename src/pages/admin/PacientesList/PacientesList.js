import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import '../PacientesList/PacientesList.css';

const initialPacientes = [
    { id: 1, name: 'Carlos Souza', email: 'carlos@email.com', petCount: 1, avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 2, name: 'Ana Silva', email: 'ana@email.com', petCount: 2, avatar: 'https://i.pravatar.cc/150?img=31' },
    { id: 3, name: 'Julia Mendes', email: 'julia@email.com', petCount: 1, avatar: 'https://i.pravatar.cc/150?img=35' },
];

const PacientesList = () => {
    const [pacientes, setPacientes] = useState(initialPacientes);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleEditClick = (paciente) => {
        setEditingId(paciente.id);
        setEditFormData({ ...paciente });
    };
    const handleCancelClick = () => setEditingId(null);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSaveClick = (id) => {
        setPacientes(pacientes.map(p => (p.id === id ? editFormData : p)));
        setEditingId(null);
    };

    const filteredPacientes = pacientes.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Pacientes</h1>
                    <button className="add-new-button"><FaPlus /> Adicionar Novo</button>
                </div>
                <div className="admin-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nome do tutor..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="admin-card-grid">
                    {filteredPacientes.map(p => (
                        <div key={p.id} className="admin-card">
                            {editingId === p.id ? (
                                <>
                                    <div className="card-body-admin">
                                        <div className="form-group-card"><label>Nome do Tutor</label><input type="text" name="name" value={editFormData.name} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Email</label><input type="email" name="email" value={editFormData.email} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Nº de Pets</label><input type="number" name="petCount" value={editFormData.petCount} onChange={handleFormChange} className="card-input"/></div>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                        <button className="action-button-card save" onClick={() => handleSaveClick(p.id)}><FaSave /> Salvar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="card-header-admin">
                                        <img src={p.avatar} alt={p.name} className="card-avatar" />
                                        <span className="card-title">{p.name}</span>
                                    </div>
                                    <div className="card-body-admin">
                                        <p><strong>Email:</strong> {p.email}</p>
                                        <p><strong>Nº de Pets:</strong> {p.petCount}</p>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card delete"><FaTrash /> Excluir</button>
                                        <button className="action-button-card edit" onClick={() => handleEditClick(p)}><FaEdit /> Editar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PacientesList;