import { useState } from 'react';
import { Link } from 'react-router-dom';
import JogadorCard from '../components/JogadorCard';
import {
  listarJogadores,
  listarPorSituacao,
  obterSuspenso,
  obterVotos,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [votos, setVotos] = useState(obterVotos);
  const [selecionadoId, setSelecionadoId] = useState(null);

  const indicados = listarPorSituacao('indicado');
  const elenco = listarPorSituacao('elenco');
  const suspenso = obterSuspenso();
  const selecionado = indicados.find((j) => j.id === selecionadoId) ?? null;

  function nomeDe(id) {
    return listarJogadores().find((j) => j.id === id)?.nome ?? id;
  }

  function alternarSelecao(jogador) {
    setSelecionadoId((atual) => (atual === jogador.id ? null : jogador.id));
  }

  function confirmarVoto() {
    if (!selecionado) return;
    setVotos(registrarVoto(selecionado.id));
    setSelecionadoId(null);
  }

  return (
    <main className="votacao">
      <header className="cabecalho-pagina">
        <h1>Quem foi o craque do jogo?</h1>
        <p>Selecione um dos indicados e confirme o seu voto.</p>
      </header>

      <div className="indicados-grade">
        {indicados.map((j) => (
          <JogadorCard
            key={j.id}
            jogador={j}
            selecionado={j.id === selecionadoId}
            onSelecionar={alternarSelecao}
          />
        ))}
      </div>

      <section className="barra-confirmacao">
        <p>
          {selecionado ? (
            <>Seu voto vai para <strong>{selecionado.nome}</strong>.</>
          ) : (
            'Nenhum jogador selecionado.'
          )}
        </p>
        <button
          type="button"
          className="botao botao-principal"
          disabled={!selecionado}
          onClick={confirmarVoto}
        >
          Confirmar voto
        </button>
      </section>

      <section className="historico" aria-labelledby="titulo-historico">
        <h2 id="titulo-historico">
          Seus votos nesta sessão: {votos.length} {votos.length === 1 ? 'voto' : 'votos'}
        </h2>
        {votos.length === 0 ? (
          <p>Nenhum voto registrado ainda.</p>
        ) : (
          <ol>
            {votos.map((id, indice) => (
              <li key={`${indice}-${id}`}>{nomeDe(id)}</li>
            ))}
          </ol>
        )}
        <Link to="/resultado">Ver parcial</Link>
      </section>

      {suspenso && (
        <section>
          <h2>Suspenso</h2>
          <p>Não entrou em campo e não pode receber votos.</p>
          <div className="suspenso-grade">
            <JogadorCard jogador={suspenso} />
          </div>
        </section>
      )}

      <section>
        <h2>Demais jogadores do elenco</h2>
        <p>Não foram indicados ao prêmio neste jogo.</p>
        <div className="elenco-grade">
          {elenco.map((j) => (
            <JogadorCard key={j.id} jogador={j} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
