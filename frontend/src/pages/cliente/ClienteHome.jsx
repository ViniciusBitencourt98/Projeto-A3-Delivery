import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './ClienteHome.css';

//Dados mockados
const produtos = [
  { id: 1, nome: 'Pizza', descricao: 'Deliciosa pizza de mussarela', preco: 19.99, imagem: '/images/pizza.jpg' },
  { id: 2, nome: 'Hambúrguer', descricao: 'Hambúrguer suculento', preco: 15.50, imagem: '/images/burger.jpg' },
  { id: 3, nome: 'Sushi', descricao: 'Sushi fresco', preco: 25.00, imagem: '/images/sushi.jpg' },
  { id: 4, nome: 'Sushi', descricao: 'Sushi fresco', preco: 25.00, imagem: '/images/sushi.jpg' },
  { id: 5, nome: 'Sushi', descricao: 'Sushi fresco', preco: 25.00, imagem: '/images/sushi.jpg' }
];


const ClienteHome = () => {
  const { user } = useUser();

  return (
    <>
      <HeaderComponent nome={user.Nome} perfil={user.perfil} />

      <div className="Menuopcoes">
        <nav className="selecionado">Ofertas</nav>
        <nav>Pizza</nav>
        <nav>Bebidas</nav>
        <nav>Massas</nav>
        <nav>Açaí e sorvete</nav>
      </div>

      <div className="Cotainer-card">
        {produtos.map(produto => (
          <div className="product-card" key={produto.id}>
            <div className="img-placeholder">
              {produto.imagem ? (
                <img src={produto.imagem} alt={produto.nome} />
              ) : (
                <div className="no-image">Sem imagem</div>
              )}
            </div>
            <div className="info">
              <h4>{produto.nome}</h4>
              <p>{produto.descricao}</p>
              <div className="price-add">
                <strong>R$ {produto.preco.toFixed(2)}</strong>
                <button className="add-btn">➕</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClienteHome;
