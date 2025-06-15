import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './FormsUser.css';
import BtnProx from '../../components/Buttons/BtnProx.jsx';
import BtnBack from '../../components/Buttons/BtnBack.jsx';
import LabelComponent from '../../components/label/Label.jsx';
import InputComponent from '../../components/Input/Input.jsx';

const FormsUser = () => {
  const [step, setStep] = useState(1);
  const [perfil, setPerfil] = useState('');
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="containerPerfil">
            <button
              className={`buttonsPerfil buttonsCliente ${perfil === 'cliente' ? styles.active : ''}`}
              onClick={() => setPerfil('cliente')}
            >
              <img src="/images/IconUser.svg" width={18} height={18} alt="" />
              Sou Cliente
            </button>
            <button
              className={`buttonsPerfil buttonsRestaurante ${perfil === 'vendedor' ? styles.active : ''}`}
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
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </Col>
            </Row>


            <Row className="mb-4 justify-content-center">
              <Col xs={10}>
                <LabelComponent>Complemento:</LabelComponent>
                <InputComponent
                  type="text"
                  name="Complemento"
                  placeholder="Digite o completemnto do seu endereço"
                  value={formData.bairro}
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
          <span className="Numeroetapa">1</span>
          <span className="labelEtapa">Escolha seu Perfil</span>
        </div>
        <div className="BarraProgresso"></div>
        <div className="BoxEtapas">
          <span className="Numeroetapa">2</span>
          <span className="labelEtapa">Dados pessoais</span>
        </div>
        <div className="BarraProgresso"></div>
        <div className="BoxEtapas">
          <span className="Numeroetapa">3</span>
          <span className="labelEtapa">Endereço</span>
        </div>
      </div>


      {renderStepContent()}

      <div className='footerModal'>
        {step > 1 && <button onClick={prevStep} className={styles.cancelBtn}>Cancelar</button>}
        {step < 3 ? (
          <>
            <BtnBack onClick={prevStep} />
            <BtnProx onClick={nextStep} />
          </>

        ) : (
          <button className={styles.nextBtn}>Finalizar</button>
        )}
      </div>
    </div>
  );
};

export default FormsUser;
