import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import '../VetList/VetList.css';

const initialVets = [
    { id: 1, name: 'Dr. Carlos Silva', crmv: 'CRMV-SP 12345', specialty: 'Clínico Geral', email: 'carlos.silva@vet.com', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 2, name: 'Dra. Ana Paula', crmv: 'CRMV-SP 54321', specialty: 'Dermatologia', email: 'ana.paula@vet.com', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 3, name: 'Dra. Juliana Costa', crmv: 'CRMV-SP 67890', specialty: 'Cardiologia', email: 'juliana.costa@vet.com', avatar: 'https://i.pravatar.cc/150?img=44' },
];
const specialties = ['Clínico Geral', 'Dermatologia', 'Cardiologia'];

const VetList = () => {
    const [vets, setVets] = useState(initialVets);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');

    const handleEditClick = (vet) => {
        setEditingId(vet.id);
        setEditFormData({ ...vet });
    };

    const handleCancelClick = () => setEditingId(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveClick = (id) => {
        setVets(vets.map(vet => (vet.id === id ? editFormData : vet)));
        setEditingId(null);
    };

    const filteredVets = vets.filter(vet => (
        vet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specialtyFilter ? vet.specialty === specialtyFilter : true)
    ));

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Veterinários</h1>
                    <button className="add-new-button"><FaPlus /> Adicionar Novo</button>
                </div>
                <div className="admin-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nome..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
                        <option value="">Todas as Especialidades</option>
                        {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                </div>

                <div className="admin-card-grid">
                    {filteredVets.map(vet => (
                        <div key={vet.id} className="admin-card">
                            {editingId === vet.id ? (
                                <>
                                    <div className="card-body-admin">
                                        <div className="form-group-card"><label>Nome</label><input type="text" name="name" value={editFormData.name} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>CRMV</label><input type="text" name="crmv" value={editFormData.crmv} onChange={handleFormChange} className="card-input" /></div>
                                        <div className="form-group-card"><label>Especialidade</label>
                                            <select name="specialty" value={editFormData.specialty} onChange={handleFormChange} className="card-input">
                                                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group-card"><label>Email</label><input type="email" name="email" value={editFormData.email} onChange={handleFormChange} className="card-input" /></div>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                        <button className="action-button-card save" onClick={() => handleSaveClick(vet.id)}><FaSave /> Salvar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="card-header-admin">
                                        <img src={vet.avatar} alt={vet.name} className="card-avatar" />
                                        <span className="card-title">{vet.name}</span>
                                    </div>
                                    <div className="card-body-admin">
                                        <p><strong>CRMV:</strong> {vet.crmv}</p>
                                        <p><strong>Especialidade:</strong> {vet.specialty}</p>
                                        <p><strong>Email:</strong> {vet.email}</p>
                                    </div>
                                    <div className="card-actions-admin">
                                        <button className="action-button-card delete"><FaTrash /> Excluir</button>
                                        <button className="action-button-card edit" onClick={() => handleEditClick(vet)}><FaEdit /> Editar</button>
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

export default VetList;