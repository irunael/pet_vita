import React from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../css/styles.css';

const mockVets = [
    { id: 1, name: 'Dr. Carlos Silva', crmv: 'CRMV-SP 12345', specialty: 'Clínico Geral', email: 'carlos.silva@vet.com' },
    { id: 2, name: 'Dra. Ana Paula', crmv: 'CRMV-SP 54321', specialty: 'Dermatologia', email: 'ana.paula@vet.com' },
    { id: 3, name: 'Dra. Juliana Costa', crmv: 'CRMV-SP 67890', specialty: 'Cardiologia', email: 'juliana.costa@vet.com' },
];

const VetList = () => {

    const handleDelete = (vet) => {
        if (window.confirm(`Tem certeza que deseja excluir o veterinário ${vet.name}?`)) {
            alert(`${vet.name} excluído com sucesso!`);
            // Lógica de exclusão aqui
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Veterinários</h1>
                    <button className="add-new-button">
                        <FaPlus /> Adicionar Novo Veterinário
                    </button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CRMV</th>
                                <th>Especialidade</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockVets.map(vet => (
                                <tr key={vet.id}>
                                    <td>{vet.name}</td>
                                    <td>{vet.crmv}</td>
                                    <td>{vet.specialty}</td>
                                    <td>{vet.email}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn"><FaEdit /></button>
                                            <button className="delete-btn" onClick={() => handleDelete(vet)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VetList;