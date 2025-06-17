import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './ClienteHome.css';

const ClienteHome = () => {
  const { user } = useUser();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Ofertas');

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v1/itens/listar');
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const data = await res.json();

        setProdutos(data);

        
        const categoriasUnicas = ['Ofertas', ...new Set(data.map(item => item.categoria_nome))];
        setCategorias(categoriasUnicas);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarProdutos();
  }, []);


  const produtosFiltrados = categoriaSelecionada === 'Ofertas'
    ? produtos
    : produtos.filter(item => item.categoria_nome === categoriaSelecionada);

  return (
    <>
      <HeaderComponent nome={user.Nome} perfil={user.perfil} />

      <div className="Menuopcoes">
        {categorias.map((cat, index) => (
          <nav
            key={index}
            className={categoriaSelecionada === cat ? 'selecionado' : ''}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </nav>
        ))}
      </div>

      {loading && <p>Carregando produtos...</p>}
      {erro && <p>Erro: {erro}</p>}

      <div className="Cotainer-card">
        {produtosFiltrados.map(produto => (
          <div className="product-card" key={produto.id}>
            <div className="info-card">
              <h4>{produto.nome}</h4>
              <p>{produto.descricao}</p>
              <div className="price-add">
                <strong>R$ {produto.preco.toFixed(2)}</strong>
              </div>
            </div>
            <div className="img-placeholder">
              {produto.foto_url ? (
                <img src={`/images/${produto.foto_url}`} alt={produto.nome} />
              ) : (
                <div className="no-image">Sem imagem</div>
              )}
              <button className="add-btn"><img src="/images/addbtn.svg" alt="" width={30} height={30} /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClienteHome;
