import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './RestauranteHome.css';
import ModalComponent from '../../components/modal/Modal.jsx';
import FormEdit from '../../components/forms/FormEdit.jsx';

const RestaurantePerfil = () => {
    const { user } = useUser();
   const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleClose = () => {
        setIsModalOpen(false);
    };

   
    return (
        <>
            <HeaderComponent nome={user.Nome} perfil={user.perfil} />
            
            <ModalComponent title='Editar Perfil' show={isModalOpen} onHide={handleClose}>
                <FormEdit
                    perfil={user.perfil}
                    formData={formData}
                    setFormData={setFormData}
                />
            </ModalComponent>


        </>
    );
};

export default RestaurantePerfil;
