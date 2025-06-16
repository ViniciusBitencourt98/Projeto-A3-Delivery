import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './FormsUser.css';
import BtnProx from '../../components/Buttons/BtnProx.jsx';
import BtnBack from '../../components/Buttons/BtnBack.jsx';
import LabelComponent from '../../components/label/Label.jsx';
import InputComponent from '../../components/Input/Input.jsx';
import BtnConfirm from '../../components/Buttons/BtnConfirm.jsx';
import BtnCancel from '../../components/Buttons/BtnCancel.jsx';
import { Toast, ToastContainer } from 'react-bootstrap';

const FormsUser = ({ onCadastroSuccess }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');


  const [step, setStep] = useState(1);
  const [perfil, setPerfil] = useState('');
  const [formData, setFormData] = useState({
    // Comuns (cliente e restaurante)
    nome: '',
    telefone: '',
    senha: '',
    email: '',
    // Restaurante
    nomeRestaurante: '',
    // Endereço
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: ''
  });

  const handleSubmit = async () => {

    if (!validateStep(step)) {
      alert('para finalizar o cadastro, preencha todos os campos.');
      return;
    }


    const payload = {
      email: formData.email,
      senha_hash: formData.senha,
      tipo_perfil: perfil,
      endereco: {
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
      },
      perfilData: perfil === 'cliente'
        ? {
          nome: formData.nome,
          telefone: formData.telefone,
        }
        : {
          nome: formData.nomeRestaurante,
          telefone: formData.telefone,
        },
    };

    try {
      const response = await fetch('http://localhost:3001/api/v1/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      const data = await response.json();

      onCadastroSuccess(formData.email, formData.senha);

    } catch (error) {
      setToastMessage('Erro ao cadastrar usuário. Tente novamente.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    // Validação da escolha do perfil na primeira etapa
    if (step === 1 && !perfil) {
      alert('Por favor, selecione um perfil antes de avançar.');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return perfil !== ''; // Deve escolher um perfil
      case 2:
        if (perfil === 'cliente') {
          return formData.nome && formData.telefone && formData.senha && formData.email;
        } else if (perfil === 'vendedor') {
          return formData.nomeRestaurante && formData.telefone && formData.senha && formData.email;
        }
        return false;
      case 3:
        return formData.cep && formData.logradouro && formData.numero && formData.bairro;
      default:
        return false;
    }
  };

  const getStepClass = (currentStep) => {
    if (step === currentStep) return 'style-ativo'; // Etapa atual
    if (step > currentStep) { // Já passou da etapa
      return validateStep(currentStep) ? 'style-sucesso' : 'style-erro';
    }
    return ''; // Futuras etapas
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="containerPerfil">
            <button
              className={`buttonsPerfil buttonsCliente ${perfil === 'cliente' ? 'active' : ''}`}
              onClick={() => setPerfil('cliente')}
            >
              <img src="/images/IconUser.svg" width={18} height={18} alt="" />
              Sou Cliente
            </button>
            <button
              className={`buttonsPerfil buttonsRestaurante ${perfil === 'vendedor' ? 'active' : ''}`}
              onClick={() => setPerfil('vendedor')}
            >
              <img src="/images/IconRestaurante.svg" width={18} height={18} alt="" />
              Quero vender
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            {perfil === 'cliente' ? (
              <>
                {/* Formulário para Cliente */}
                <Row className="mb-2 mt-3 justify-content-center">
                  <Col xs={10}>
                    <LabelComponent>Nome</LabelComponent>
                    <InputComponent
                      type="text"
                      name="nome"
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-2 justify-content-center">
                  <Col xs={5}>
                    <LabelComponent>Telefone:</LabelComponent>
                    <InputComponent
                      type="text"
                      name="telefone"
                      placeholder="Digite seu telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={5}>
                    <LabelComponent>Senha:</LabelComponent>
                    <InputComponent
                      type="password"
                      name="senha"
                      placeholder="Escolha uma senha"
                      value={formData.senha}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-4 justify-content-center">
                  <Col xs={10}>
                    <LabelComponent>E-mail:</LabelComponent>
                    <InputComponent
                      type="email"
                      name="email"
                      placeholder="Digite o seu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                {/* Formulário para Vendedor */}
                <Row className="mb-2 mt-3 justify-content-center">
                  <Col xs={10}>
                    <LabelComponent>Nome do Restaurante</LabelComponent>
                    <InputComponent
                      type="text"
                      name="nomeRestaurante"
                      placeholder="Digite o nome do restaurante"
                      value={formData.nomeRestaurante}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-2 justify-content-center">
                  <Col xs={5}>
                    <LabelComponent>Telefone:</LabelComponent>
                    <InputComponent
                      type="text"
                      name="telefone"
                      placeholder="Digite o telefone do restaurante"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={5}>
                    <LabelComponent>Senha:</LabelComponent>
                    <InputComponent
                      type="password"
                      name="senha"
                      placeholder="Escolha uma senha"
                      value={formData.senha}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-4 justify-content-center">
                  <Col xs={10}>
                    <LabelComponent>E-mail:</LabelComponent>
                    <InputComponent
                      type="email"
                      name="email"
                      placeholder="Digite o e-mail do restaurante"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <Row className="mb-2 mt-3 justify-content-center">
              <Col xs={3}>
                <LabelComponent>CEP:</LabelComponent>
                <InputComponent
                  type="text"
                  name="cep"
                  placeholder="Digite o CEP"
                  value={formData.cep}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={7}>
                <LabelComponent>Bairro:</LabelComponent>
                <InputComponent
                  type="text"
                  name="bairro"
                  placeholder="Digite o bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
              </Col>
            </Row>


            <Row className="mb-2 justify-content-center">
              <Col xs={7}>
                <LabelComponent>Rua:</LabelComponent>
                <InputComponent
                  type="text"
                  name="logradouro"
                  placeholder="Digitte o nome da sua rua"
                  value={formData.logradouro}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={3}>
                <LabelComponent>Número:</LabelComponent>
                <InputComponent
                  type="text"
                  name="numero"
                  placeholder="Digite o numero"
                  value={formData.numero}
                  onChange={handleChange}
                />
              </Col>
            </Row>


            <Row className="mb-4 justify-content-center">
              <Col xs={10}>
                <LabelComponent>Complemento:</LabelComponent>
                <InputComponent
                  type="text"
                  name="complemento"
                  placeholder="Digite o completemnto do seu endereço"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.FormsUser}>
      <div className="containerEtapas">
        <div className="BoxEtapas">
          <span className={`Numeroetapa ${getStepClass(1)}`}>1</span>
          <span className="labelEtapa">Escolha seu Perfil</span>
        </div>
        <div className={`BarraProgresso ${getStepClass(1)}`}></div>

        <div className="BoxEtapas">
          <span className={`Numeroetapa ${getStepClass(2)}`}>2</span>
          <span className="labelEtapa">Dados pessoais</span>
        </div>
        <div className={`BarraProgresso ${getStepClass(2)}`}></div>

        <div className="BoxEtapas">
          <span className={`Numeroetapa ${getStepClass(3)}`}>3</span>
          <span className="labelEtapa">Endereço</span>
        </div>
      </div>



      {renderStepContent()}

      <div className='footerModal'>
        {step === 1 && (
          <>
            <BtnCancel />
            <BtnProx onClick={nextStep} />
          </>
        )}

        {step === 2 && (
          <>
            <BtnBack onClick={prevStep} />
            <BtnProx onClick={nextStep} />
          </>
        )}

        {step === 3 && (
          <>
            <BtnBack onClick={prevStep} />
            <BtnConfirm onClick={handleSubmit} />
          </>
        )}
      </div>



      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === 'success' ? 'Sucesso' : 'Erro'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default FormsUser;
