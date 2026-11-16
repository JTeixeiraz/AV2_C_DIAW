import jogadores from "../data/jogadores";
import { listarJogadores } from "../services/votacaoService";

    
const SELOS = {
    indicado: 'Indicado',
    suspenso: 'Suspenso'
}

function JogadorCard({jogador, selecionado = false, onSelecionar}) {
    const {nome, numero, posicao, foto, situacao} = jogador
    const selo = SELOS[situacao]

 
    
    {onSelecionar && (
        <button type="button" onClick={() => onSelecionar(jogador)}>
            {selecionado ? '✓ Selecionado':'selecionar'}        
        </button>
    )}

    return(
        <ul>
            <li>
                <img src={foto} alt={nome} />
                <span className="home-numero">{numero}</span>
                <span>{nome}</span>
                <span>{posicao}</span>
                <span>{situacao}</span>
                {selo && <span className={`home-selo home-selo-${situacao}`}>{selo}</span>}  
            </li> 
        </ul>
    );
}

export default JogadorCard;