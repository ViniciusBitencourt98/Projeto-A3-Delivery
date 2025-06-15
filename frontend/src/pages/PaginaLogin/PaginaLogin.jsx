import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import ModalComponent from '../../components/modal/Modal.jsx';
import './PaginaLogin.css';
import InputComponent from '../../components//Input/Input.jsx';
import LabelComponent from '../../components/label/Label.jsx';
import FormsUser from '../../components/forms/FormsUser.jsx';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShow = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const [activeTab, setActiveTab] = useState('cliente');

    function selectTab(tab) {
        setActiveTab(tab);
    }
    const labelText = activeTab === 'cliente' ? 'Usuário:' : 'Usuário do Restaurante:';


    return (
        <div className="Container-login">
            <h1 className="titleLogin">A fome não espera. Faça seu login!</h1>

            <div className="tabs">
                <button
                    className={`buttonPerfil ${activeTab === 'cliente' ? 'buttonActive' : 'buttonNoActive'}`}
                    onClick={() => selectTab('cliente')}
                    id="tab-cliente"
                    type="button"
                    style={{ marginRight: '-10px' }}
                >
                    Cliente
                </button>

                <button
                    className={`buttonPerfil ${activeTab === 'restaurante' ? 'buttonActive' : 'buttonNoActive'}`}
                    onClick={() => selectTab('restaurante')}
                    id="tab-restaurante"
                    type="button"
                    style={{ marginLeft: '-10px' }}
                >
                    Restaurante
                </button>
            </div>

            <form className='container-formulario'>
                <div>
                    <LabelComponent htmlFor="usuario">{labelText}</LabelComponent>
                    <InputComponent
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Digite o seu usuário (e-mail)"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <LabelComponent htmlFor="senhas">Senha:</LabelComponent>
                    <InputComponent
                        type="password"
                        id="senha"
                        value={senha}
                        placeholder="Digite sua senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>


                <button className='BtnLogin' type="submit">Entrar</button>
            </form>

            <div className='container-or'>
                <div></div>
                <span>OU</span>
                <div></div>
            </div>

            <div className='containet-register'><span onClick={handleShow}>Registre-se</span></div>

            
            <ModalComponent title='Novo usuário' show={isModalOpen} onHide={handleClose}>
            <FormsUser/>
            </ModalComponent>
        </div>

    );
}
