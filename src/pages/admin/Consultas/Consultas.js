import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../Consultas/Consultas.css';

const initialConsultas = [
    { id: 1, date: '2025-08-28', user: 'Carlos Souza', vet: 'Dr. Carlos Silva', specialty: 'Clínico Geral', status: 'Agendada' },
    { id: 2, date: '2025-08-29', user: 'Ana Silva', vet: 'Dra. Ana Paula', specialty: 'Dermatologia', status: 'Pendente' },
    { id: 3, date: '2025-08-30', user: 'Julia Mendes', vet: 'Dr. Carlos Silva', specialty: 'Clínico Geral', status: 'Concluída' },
];
const statusOptions = ['Pendente', 'Agendada', 'Concluída', 'Cancelada'];
const vets = ['Dr. Carlos Silva', 'Dra. Ana Paula', 'Dra. Juliana Costa'];
const specialties = ['Clínico Geral', 'Dermatologia', 'Cardiologia'];

const Consultas = () => {
    const [consultas, setConsultas] = useState(initialConsultas);
    const [filteredConsultas, setFilteredConsultas] = useState(initialConsultas);
    
    const [userFilter, setUserFilter] = useState('');
    const [vetFilter, setVetFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        let result = consultas.filter(c => 
            c.user.toLowerCase().includes(userFilter.toLowerCase()) &&
            (vetFilter ? c.vet === vetFilter : true) &&
            (specialtyFilter ? c.specialty === specialtyFilter : true) &&
            (dateFilter ? c.date === dateFilter : true)
        );
        setFilteredConsultas(result);
    }, [userFilter, vetFilter, specialtyFilter, dateFilter, consultas]);

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    
    const handleEditClick = (consulta) => { setEditingId(consulta.id); setEditFormData({ ...consulta }); };
    const handleCancelClick = () => setEditingId(null);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSaveClick = (id) => {
        setConsultas(consultas.map(c => (c.id === id ? editFormData : c)));
        setEditingId(null);
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header"><h1>Gerenciar Consultas</h1></div>
                <div className="admin-filters">
                    <input type="text" placeholder="Filtrar por paciente..." value={userFilter} onChange={e => setUserFilter(e.target.value)} />
                    <select value={vetFilter} onChange={e => setVetFilter(e.target.value)}>
                        <option value="">Todos os Veterinários</option>
                        {vets.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
                        <option value="">Todas as Especialidades</option>
                        {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                </div>
                <div className="admin-card-grid">
                    {filteredConsultas.map(c => (
                        <div key={c.id} className="admin-card">
                            {editingId === c.id ? (
                                <>
                                    <div className="card-body-admin">
                                        <div className="form-group-card"><label>Paciente</label><input type="text" name="user" value={editFormData.user} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Veterinário</label><input type="text" name="vet" value={editFormData.vet} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Data</label><input type="date" name="date" value={editFormData.date} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Status</label>
                                            <select name="status" value={editFormData.status} onChange={handleFormChange} className="card-input">
                                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                        <button className="action-button-card save" onClick={() => handleSaveClick(c.id)}><FaSave /> Salvar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="card-header-admin" style={{justifyContent: 'center'}}>
                                        <span className="card-title">Consulta #{c.id}</span>
                                    </div>
                                    <div className="card-body-admin">
                                        <p><strong>Paciente:</strong> {c.user}</p>
                                        <p><strong>Veterinário:</strong> {c.vet}</p>
                                        <p><strong>Data:</strong> {new Date(c.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                                        <p><strong>Status:</strong> <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span></p>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card delete"><FaTrash /> Excluir</button>
                                        <button className="action-button-card edit" onClick={() => handleEditClick(c)}><FaEdit /> Editar</button>
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

export default Consultas;