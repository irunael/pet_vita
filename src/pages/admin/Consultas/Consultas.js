import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../admin/Consultas/Consultas.css';

const Consultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [filteredConsultas, setFilteredConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [userFilter, setUserFilter] = useState('');
    const [vetFilter, setVetFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const fetchConsultas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/admin/consultations');
                setConsultas(response.data);
                setFilteredConsultas(response.data); // Inicialmente, mostra todos
            } catch (err) {
                setError('Falha ao buscar consultas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, []);

    // Filtra no front-end sempre que um filtro mudar
    useEffect(() => {
        let result = consultas.filter(c => 
            (c.userName?.toLowerCase() || '').includes(userFilter.toLowerCase()) &&
            (vetFilter ? c.veterinaryName === vetFilter : true) &&
            (specialtyFilter ? c.speciality === specialtyFilter : true) &&
            (dateFilter ? c.consultationdate === dateFilter : true)
        );
        setFilteredConsultas(result);
    }, [userFilter, vetFilter, specialtyFilter, dateFilter, consultas]);
    
    // NOTA: A edição e exclusão de consultas pelo admin não foi especificada no backend.
    // Os botões abaixo são apenas visuais por enquanto.
    const handleEdit = (id) => alert(`Lógica para editar consulta ${id} a ser implementada.`);
    const handleDelete = (id) => alert(`Lógica para deletar consulta ${id} a ser implementada.`);

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header"><h1>Gerenciar Consultas</h1></div>
                <div className="admin-filters">
                    <input type="text" placeholder="Filtrar por paciente..." value={userFilter} onChange={e => setUserFilter(e.target.value)} />
                    <input type="text" placeholder="Filtrar por veterinário..." value={vetFilter} onChange={e => setVetFilter(e.target.value)} />
                    <input type="text" placeholder="Filtrar por especialidade..." value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)} />
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                </div>
                
                {loading && <p>Carregando...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {!loading && !error && (
                    <div className="admin-card-grid">
                        {filteredConsultas.map(c => (
                            <div key={c.id} className="admin-card">
                                <div className="card-header-admin" style={{justifyContent: 'center'}}>
                                    <span className="card-title">Consulta #{c.id}</span>
                                </div>
                                <div className="card-body-admin">
                                    <p><strong>Paciente:</strong> {c.userName || 'N/A'}</p>
                                    <p><strong>Veterinário:</strong> {c.veterinaryName}</p>
                                    <p><strong>Data:</strong> {new Date(c.consultationdate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                                    <p><strong>Status:</strong> <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span></p>
                                </div>
                                <div className="card-actions-admin">
                                    <button className="action-button-card delete" onClick={() => handleDelete(c.id)}><FaTrash /> Excluir</button>
                                    <button className="action-button-card edit" onClick={() => handleEdit(c.id)}><FaEdit /> Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Consultas;