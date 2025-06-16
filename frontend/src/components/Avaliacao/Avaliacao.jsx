import './Avaliacao.css';
import { useState } from 'react';

export const AvaliacaoComponent = ({ pedidoId, notaInicial }) => {

    const [nota, setNota] = useState(notaInicial || 0);
    const [avaliado, setAvaliado] = useState(!!notaInicial); // true se notaInicial já existir

    const enviarAvaliacao = async (notaSelecionada) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/pedidos/cliente/avaliar/${pedidoId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nota: notaSelecionada })
            });

            const data = await response.json();
            console.log('Resposta da avaliação:', data);
            setNota(notaSelecionada);
            setAvaliado(true);
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
        }
    };

    const handleClick = (index) => {
        if (avaliado) return; // já avaliado? Não deixa clicar de novo
        setNota(index);
        enviarAvaliacao(index);
    };

    return (
        <div className="ContainerEstrelas">
            <div className='AreaEstrelas'>
                {[...Array(5)].map((_, index) => (

                    <span
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        style={{
                            cursor: avaliado ? 'default' : 'pointer',
                            color: index < nota ? 'gold' : 'gray',
                            fontSize: '24px'
                        }}
                    >
                        ★
                    </span>

                ))}
            </div>
            {avaliado && <span style={{ marginLeft: '8px', fontSize: '16px' }}>Avaliado</span>}
        </div>
    );
};

export default AvaliacaoComponent;
