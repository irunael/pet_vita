import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProfileScreen from "../pages/Perfil";
import Pets from "../pages/Pets/PetsProfile";
import AddPet from "../pages/Pets/AddPets";
import PetsDetails from "../pages/Pets/PetsDetails";
import ConsulPending from "../pages/Consultations/ConsulPending";
import ConsulCompleted from "../pages/Consultations/ConsulCompleted";
import ConsulDetails from "../pages/Consultations/ConsulDetails";
import ConsulCompleteDetails from "../pages/Consultations/ConsulCompletedDetails";
import ScheduleAppointment from "../pages/Consultations/ScheduleAppointment";
import ModalRegisterUser from "../components/ModalRegisterUser";
import ModalRegisterVet from "../components/ModalRegisterVet";
import AbaoutUs from "../pages/AboutUs";
import App from "../pages/App";
import Chat from "../pages/Chat/Chat";
import CalendarioConsultas from "../pages/Consultations/CalendarioConsulta/CalendarioConsultas";
import VetDashboard from '../pages/Vet/Dashboard/Dashboard';
import VetConsultas from '../pages/Vet/Consultas/Consultas';
import VetRelatorios from '../pages/Vet/Relatorios/Relatorios';
import VetDetalhesConsulta from '../pages/Vet/DetalhesConsulta/DetalhesConsulta';
import VetPerfil from '../pages/Vet/Perfil/Perfil';
import VetChat from '../pages/Vet/Chat/Chat';
import VetList from '../pages/admin/VetList/VetList';
import AdminDashboard from "../pages/admin/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<ProfileScreen />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets-details" element={<PetsDetails />} />
        <Route path="/consultas" element={<ConsulPending />} />
        <Route path="/consultas/concluidas" element={<ConsulCompleted />} />
        <Route path="/consultas/calendario" element={<CalendarioConsultas />} />
        <Route path="/detalhes-consulta" element={<ConsulDetails />} />
        <Route path="/detalhes-consulta-concluida" element={<ConsulCompleteDetails />} />
        <Route path="/agendar-consulta" element={<ScheduleAppointment />} />
        <Route path="/register-user" element={<ModalRegisterUser />} />
        <Route path="/register-vet" element={<ModalRegisterVet />} />
        <Route path="/sobre-nos" element={<AbaoutUs />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/app" element={<App />} />

         <Route path="/vet/dashboard" element={<VetDashboard />} />
        <Route path="/vet/consultas" element={<VetConsultas />} />
        <Route path="/vet/relatorios" element={<VetRelatorios />} />
        <Route path="/vet/consultas/:consultaId" element={<VetDetalhesConsulta />} />
        <Route path="/vet/chat" element={<VetChat />} />
        <Route path="/vet/perfil" element={<VetPerfil />} />

         <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/veterinarios" element={<VetList />} />
        <Route path="/admin/pacientes" element={<div>Página de Pacientes em Construção</div>} />
      </Routes>
    </BrowserRouter>
  );
}