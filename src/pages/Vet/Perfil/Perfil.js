import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import ImageCropper from '../../../components/ImageCropper/ImageCropper';
import profileIcon from '../../../assets/images/Perfil/perfilIcon.png';
import { FaPencilAlt } from 'react-icons/fa';
import '../css/styles.css';
import { formatEnumLabel } from '../../../utils/format';

const specialityOptions = [
    "CLINICO_GERAL",
    "ANESTESIOLOGISTA",
    "CARDIOLOGISTA",
    "DERMATOLOGISTA",
    "ENDOCRINOLOGISTA",
    "GASTROENTEROLOGISTA",
    "NEUROLOGISTA",
    "NUTRICIONISTA",
    "OFTALMOLOGISTA",
    "ONCOLOGISTA",
    "ORTOPEDISTA",
    "ESPECIALISTA_REPRODUCAO_ANIMAL",
    "PATOLOGISTA",
    "CIRURGIAO_GERAL",
    "CIRURGIAO_ORTOPEDICO",
    "ODONTOLOGO",
    "ZOOTECNISTA",
    "VETERINARIO_EXOTICOS",
    "ACUPUNTURISTA",
    "FISIOTERAPEUTA",
    "RADIOLOGISTA"
];

const VetPerfil = () => {
    const { user } = useAuth();
    const [vetData, setVetData] = useState(null);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(profileIcon);
    const [hasChanges, setHasChanges] = useState(false);

    const fetchVetData = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const response = await api.get(`/veterinary/me?_t=${new Date().getTime()}`);
                const combinedData = { ...response.data };

                console.log('Dados do veterinário recebidos:', combinedData);
                console.log('Especialidade:', combinedData.specialityenum);

                setVetData(combinedData);
                setEditData(combinedData);
                setImagePreview(combinedData.imageurl || profileIcon);
            } catch (error) {
                console.error("Erro ao buscar dados do veterinário", error);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchVetData();
    }, [fetchVetData]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => { setImageToCrop(reader.result); };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCropComplete = (croppedFile) => {
        setImageFile(croppedFile);
        setImagePreview(URL.createObjectURL(croppedFile));
        setImageToCrop(null);
        setHasChanges(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Campo alterado:', name, 'Novo valor:', value);
        setEditData(prev => {
            const updated = { ...prev, [name]: value };
            console.log('EditData atualizado:', updated);
            return updated;
        });
        setHasChanges(true);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Primeiro faz o upload da imagem se houver
            let finalImageUrl = vetData.imageurl || ''; // Mantém a URL atual por padrão
            
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);
                const uploadResponse = await api.post(`/upload/veterinary/${vetData.id}`, uploadFormData);
                // O backend retorna { url: "..." }
                finalImageUrl = uploadResponse.data.url;
            }

            // Depois atualiza os dados do veterinário usando o endpoint correto
            const updateDTO = {
                name: editData.name,
                email: editData.email,
                crmv: editData.crmv,
                specialityenum: editData.specialityenum,
                phone: editData.phone,
                rg: editData.rg,
                imageurl: finalImageUrl
            };
            
            console.log('Enviando dados para atualização:', updateDTO);
            console.log('Especialidade sendo enviada:', updateDTO.specialityenum);
            
            // Usa o endpoint /admin/veterinarians/{id} que agora permite veterinários atualizarem seu próprio perfil
            await api.put(`/admin/veterinarians/${vetData.id}`, updateDTO);

            alert('Perfil atualizado com sucesso!');
            setIsEditing(false);
            setHasChanges(false);
            setImageFile(null);
            await fetchVetData();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data || 'Erro ao salvar as alterações.';
            alert(errorMessage);
            console.error('Erro detalhado:', err.response?.data || err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(vetData);
        setImagePreview(vetData.imageurl || profileIcon);
        setHasChanges(false);
    };

    if (loading) return <div className="loading-container">Carregando perfil...</div>;
    if (!vetData) return <div className="error-message">Não foi possível carregar os dados do perfil.</div>;

    return (
        <div className="profile-page-vet">
            <HeaderVet />
            {imageToCrop && (
                <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setImageToCrop(null)}
                />
            )}
            <div className="profile-container">
                <div className="profile-header"><h1>Perfil Profissional</h1></div>
                <form className="profile-content" onSubmit={handleSaveChanges}>
                    <div className="profile-picture-section">
                        <div className="profile-picture-container">
                            <img src={imagePreview} alt="Foto de perfil" className="profile-picture" onError={(e) => { e.target.onerror = null; e.target.src=profileIcon }} />
                            {isEditing && (
                                <div className="profile-picture-edit">
                                    <label htmlFor="vet-image-input"><FaPencilAlt className="edit-icon" /></label>
                                    <input id="vet-image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profile-info-section">
                        <div className="profile-row">
                            <div className="profile-field">
                                <label>Nome Completo</label>
                                {isEditing ? <input type="text" name="name" value={editData.name || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{vetData.name}</div>}
                            </div>
                            <div className="profile-field">
                                <label>CRMV</label>
                                {isEditing ? <input type="text" name="crmv" value={editData.crmv || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{vetData.crmv}</div>}
                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="profile-field">
                                <label>Especialidade</label>
                                {isEditing ? (
                                    <select 
                                        name="specialityenum" 
                                        value={editData.specialityenum || vetData.specialityenum || 'CLINICO_GERAL'} 
                                        onChange={handleInputChange} 
                                        className="info-field editable"
                                    >
                                        {specialityOptions.map(s => <option key={s} value={s}>{formatEnumLabel(s)}</option>)}
                                    </select>
                                ) : <div className="info-field">{vetData.specialityenum ? formatEnumLabel(vetData.specialityenum) : ''}</div>}
                            </div>
                            <div className="profile-field">
                                <label>RG</label>
                                {isEditing ? <input type="text" name="rg" value={editData.rg || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{vetData.rg}</div>}
                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="profile-field">
                                <label>Email</label>
                                {isEditing ? <input type="email" name="email" value={editData.email || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{vetData.email}</div>}
                            </div>
                            <div className="profile-field">
                                <label>Telefone</label>
                                {isEditing ? <input type="tel" name="phone" value={editData.phone || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{vetData.phone}</div>}
                            </div>
                        </div>
                        <div className="profile-actions">
                            {isEditing ? (
                                <>
                                    <button type="submit" className="save-button" disabled={!hasChanges || isSaving}>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</button>
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                                </>
                            ) : (
                                <button type="button" className="edit-button" onClick={() => {
                                    console.log('Iniciando edição. VetData:', vetData);
                                    console.log('EditData antes:', editData);
                                    setEditData({ ...vetData });
                                    console.log('EditData depois:', { ...vetData });
                                    setIsEditing(true);
                                }}>Editar Perfil</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default VetPerfil;