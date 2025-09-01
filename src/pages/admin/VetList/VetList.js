import React, { useState, useEffect, useCallback } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api'; // Importa nosso serviço de API
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import '../../admin/VetList/VetList.css';

const VetList = () => {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Estados para edição inline
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [specialties, setSpecialties] = useState([]); // Será preenchido pela API

    // Função para buscar os dados da API
    const fetchVets = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            // Monta os parâmetros da busca
            const params = {};
            if (searchTerm) params.name = searchTerm;
            if (specialtyFilter) params.speciality = specialtyFilter;

            const response = await api.get('/admin/veterinarians', { params });
            setVets(response.data);
            
            // Extrai as especialidades únicas para o filtro
            const uniqueSpecialties = [...new Set(response.data.map(v => v.specialityenum))];
            setSpecialties(uniqueSpecialties);

        } catch (err) {
            setError('Falha ao buscar veterinários.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, specialtyFilter]); // Roda novamente quando os filtros mudam

    useEffect(() => {
        fetchVets();
    }, [fetchVets]);

    // Funções de Edição
    const handleEditClick = (vet) => {
        setEditingId(vet.id);
        setEditFormData({ ...vet, specialty: vet.specialityenum }); // Ajuste para o nome do campo
    };
    const handleCancelClick = () => setEditingId(null);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Função para SALVAR (PUT)
    const handleSaveClick = async (id) => {
        try {
            const dataToUpdate = { ...editFormData, specialityenum: editFormData.specialty };
            await api.put(`/admin/veterinarians/${id}`, dataToUpdate);
            setEditingId(null);
            fetchVets(); // Recarrega a lista para mostrar os dados atualizados
            alert('Veterinário atualizado com sucesso!');
        } catch (err) {
            alert('Erro ao salvar. Verifique o console.');
            console.error(err);
        }
    };
    
    // Função para DELETAR
    const handleDelete = async (vet) => {
        if (window.confirm(`Tem certeza que deseja excluir ${vet.name}?`)) {
            try {
                await api.delete(`/admin/veterinarians/${vet.id}`);
                fetchVets(); // Recarrega a lista
                alert(`${vet.name} excluído com sucesso!`);
            } catch (err) {
                alert('Erro ao excluir. Verifique o console.');
                console.error(err);
            }
        }
    };

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
                        <input type="text" placeholder="Buscar por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
                        <option value="">Todas as Especialidades</option>
                        {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                </div>
                
                {loading && <p>Carregando veterinários...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {!loading && !error && (
                    <div className="admin-card-grid">
                        {vets.map(vet => (
                            <div key={vet.id} className="admin-card">
                                {editingId === vet.id ? (
                                    <> {/* MODO DE EDIÇÃO */}
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
                                    <> {/* MODO DE VISUALIZAÇÃO */}
                                        <div className="card-header-admin">
                                            <img src={vet.imageurl} alt={vet.name} className="card-avatar" />
                                            <span className="card-title">{vet.name}</span>
                                        </div>
                                        <div className="card-body-admin">
                                            <p><strong>CRMV:</strong> {vet.crmv}</p>
                                            <p><strong>Especialidade:</strong> {vet.specialityenum}</p>
                                            <p><strong>Email:</strong> {vet.email}</p>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card delete" onClick={() => handleDelete(vet)}><FaTrash /> Excluir</button>
                                            <button className="action-button-card edit" onClick={() => handleEditClick(vet)}><FaEdit /> Editar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default VetList;