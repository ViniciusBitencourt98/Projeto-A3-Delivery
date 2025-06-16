import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import ModalComponent from '../../components/modal/Modal.jsx';
import ModalConfirm from '../../components/modal/ModalConfirm.jsx';
import './PaginaLogin.css';
import InputComponent from '../../components/Input/Input.jsx';
import LabelComponent from '../../components/label/Label.jsx';
import BtnRealizaLogin from '../../components/Buttons/BtnRealizaLogin.jsx';
import FormsUser from '../../components/forms/FormsUser.jsx';
import { UserProvider, useUser } from '../../context/UserContext.jsx';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            senha,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();
            setUser({
                perfil: data.usuario.tipo_perfil,
                email: data.usuario.email,
                token: data.token,
            });

            if (data.tipo_perfil === 'cliente') {
                navigate('/cliente');
            } else if (data.tipo_perfil === 'restaurante') {
                navigate('/restaurante');
            }


            // Exemplo: salva token no localStorage
            localStorage.setItem('token', data.token);


            // Redirecionar ou atualizar estado global se necessário
            // Ex: navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShow = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmData, setConfirmData] = useState({ email: '', senha: '' });

    const handleCadastroSuccess = (email, senha) => {
        setConfirmData({ email, senha });
        setShowConfirmModal(true);  // abre modal de sucesso
        setIsModalOpen(false);      // fecha modal de cadastro
    };

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

                <button className='BtnLogin' type='button' onClick={handleLogin}>Entrar</button>
            </form>

            <div className='container-or'>
                <div></div>
                <span>OU</span>
                <div></div>
            </div>

            <div className='containet-register'><span onClick={handleShow}>Registre-se</span></div>

            {/* Modal de Cadastro */}
            <ModalComponent title='Novo usuário' show={isModalOpen} onHide={handleClose}>
                <FormsUser onCadastroSuccess={handleCadastroSuccess} />
            </ModalComponent>

            {/* Modal de Confirmação */}
            <ModalConfirm
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                variant='sucesso'
            >
                <h4>Cadastro realizado com sucesso!</h4>
                <p><strong>Email:</strong> {confirmData.email}</p>
                <p><strong>Senha:</strong> {confirmData.senha}</p>
                <Modal.Footer>
                    <BtnRealizaLogin onClick={() => {
                        setShowConfirmModal(false);
                    }} />
                </Modal.Footer>
            </ModalConfirm>
        </div>
    );
}
