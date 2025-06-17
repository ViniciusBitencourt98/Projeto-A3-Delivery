import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import HeaderComponent from '../../components/Header/Header';
import ModalComponent from '../../components/modal/Modal.jsx';
import InputComponent from '../../components/Input/Input.jsx';
import LabelComponent from '../../components/label/Label.jsx';
import './RestauranteCardapio.css';

const RestauranteCardapio = () => {
    const { user } = useUser();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [itemEditando, setItemEditando] = useState(null); // null = criando novo, objeto = editando

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        foto_url: ''
    });

    // Buscar itens do cardápio
    useEffect(() => {
        const fetchItens = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/v1/itens/restaurante/listar/${user.id}`);
                const data = await res.json();
                setItens(data);
            } catch (error) {
                console.error('Erro ao carregar itens:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) fetchItens();
    }, [user]);

    const abrirModalNovo = () => {
        setItemEditando(null); // criando novo
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            foto_url: ''
        });
        setShowModal(true);
    };

    const abrirModalEditar = (item) => {
        setItemEditando(item);
        setFormData({
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            foto_url: item.foto_url
        });
        setShowModal(true);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeletar = async (itemId) => {
        if (!window.confirm('Confirma excluir este item?')) return;
        try {
            const res = await fetch(`http://localhost:3001/api/v1/itens/restaurante/${itemId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setItens(itens.filter(item => item.id !== itemId));
            } else {
                alert('Erro ao deletar item.');
            }
        } catch {
            alert('Erro ao deletar item.');
        }
    };

    const handleSalvar = async () => {
        try {

            let categoria_id = null;
            if (formData.nome.toLowerCase().includes('pizza')) {
                categoria_id = 2;
            } else if (formData.nome.toLowerCase().includes('hamburguer')) {
                categoria_id = 1;
            }

            const body = {
                ...formData,
                preco: parseFloat(formData.preco),
                restaurante_id: user.id,
                categoria_id
            };

            let response;
            if (itemEditando) {
                // Edição
                response = await fetch(`http://localhost:3001/api/v1/itens/restaurante/${itemEditando.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            } else {
                // Criação
                response = await fetch('http://localhost:3001/api/v1/itens/restaurante', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            }

            if (!response.ok) throw new Error('Erro ao salvar item');
            const itemSalvo = await response.json();

            if (itemEditando) {
                setItens(itens.map(i => (i.id === itemSalvo.id ? itemSalvo : i)));
            } else {
                setItens(prev => [...prev, itemSalvo]);
            }

            setShowModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <HeaderComponent nome={user.Nome} perfil={user.perfil} />
            <h2 className="TitlePage">Gerenciar Cardápio</h2>

            <div className="containerCards">
                {/* Card Novo Item */}
                <div
                    className="cardNovoItem"
                    onClick={abrirModalNovo}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => (e.key === 'Enter' ? abrirModalNovo() : null)}
                >
                    <div className="plusIcon">+</div>
                    <div>Criar novo item</div>
                </div>

                <div className="containerItens">
                    {loading ? (
                        <p>Carregando itens...</p>
                    ) : itens.length === 0 ? (
                        <p>Nenhum item cadastrado.</p>
                    ) : (
                        itens.map(item => (
                            <div className="cardItem" key={item.id}>
                                <img src={`/images/${item.foto_url}`} alt={item.nome} className="fotoItem" />
                                <h3>{item.nome}</h3>
                                <p>{item.descricao}</p>
                                <p className="preco">R$ {parseFloat(item.preco).toFixed(2)}</p>
                                <div className="botoesCard">
                                    <button onClick={() => abrirModalEditar(item)} className="btnAlterar">Alterar</button>
                                    <button onClick={() => handleDeletar(item.id)} className="btnDeletar">Deletar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal de Criar/Editar */}
            <ModalComponent show={showModal} onHide={() => setShowModal(false)} title={itemEditando ? "Editar Item" : "Criar Novo Item"}>
                <form
                    id="formItem"
                    onSubmit={e => {
                        e.preventDefault();
                        handleSalvar();
                    }}
                >
                    <Row className="mb-2 mt-3 justify-content-center">
                        <Col xs={10}>
                            <LabelComponent>Nome</LabelComponent>
                            <InputComponent
                                type="text"
                                name="nome"
                                placeholder="Digite o nome do item"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2 justify-content-center">
                        <Col xs={10}>
                            <LabelComponent>Descrição</LabelComponent>
                            <InputComponent
                                as="textarea"
                                name="descricao"
                                placeholder="Digite a descrição"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2 justify-content-center">
                        <Col xs={5}>
                            <LabelComponent>Preço</LabelComponent>
                            <InputComponent
                                type="number"
                                step="0.01"
                                name="preco"
                                placeholder="Digite o preço"
                                value={formData.preco}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col xs={5}>
                            <LabelComponent>URL da Foto</LabelComponent>
                            <InputComponent
                                type="text"
                                name="foto_url"
                                placeholder="URL da foto do item"
                                value={formData.foto_url}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col xs={10} className="d-flex justify-content-end">
                            <button className="btnCustton btnProx" type="submit" id="submitBtn" style={{ display: '' }}>Finalizar<img src="/images/IconConfirm.svg" alt="" /></button>
                        </Col>
                    </Row>
                </form>
            </ModalComponent>
        </>
    );
};

export default RestauranteCardapio;
