import jogadores from "../data/jogadores";
import { listarJogadores } from "../services/votacaoService";

function JogadorCard({jogador, selecionado = false, onSelecionar}) {
    const {nome, numero, posicao, foto, situacao} = jogador
    return(
        <ul>
            <li>
                <img src={foto} alt={nome} />
                <span className="home-numero">{numero}</span>
                <span>{nome}</span>
                <span>{posicao}</span>
                <span>{situacao}</span>
            </li> 
        </ul>
    );
}

export default JogadorCard;