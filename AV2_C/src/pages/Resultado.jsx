import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  desfazerUltimoVoto,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService';

const plural = (quantidade, singular, plural) => (quantidade === 1 ? singular : plural);

const formatarPercentual = (valor) =>
  `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;

function textoLideranca([primeiro, segundo]) {
  if (primeiro.votos === segundo.votos) {
    return `Empate entre ${primeiro.nome} e ${segundo.nome} com ${primeiro.votos} ${plural(primeiro.votos, 'voto', 'votos')}.`;
  }
  const vantagem = primeiro.votos - segundo.votos;
  return `${primeiro.nome} lidera com ${vantagem} ${plural(vantagem, 'voto', 'votos')} de vantagem sobre ${segundo.nome}.`;
}

function Resultado() {
  const [votos, setVotos] = useState(obterVotos);
  const total = votos.length;
  const resultado = calcularResultado(votos);

  function desfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function zerar() {
    zerarVotos();
    setVotos([]);
  }

  return (
    <main className="resultado">
      <header className="cabecalho-pagina">
        <h1>Parcial: craque do jogo</h1>
        <p className="resultado-total">
          <strong>{total}</strong> {plural(total, 'voto computado', 'votos computados')}
        </p>
      </header>

      {total === 0 ? (
        <section className="resultado-vazio">
          <p>Ainda não há votos computados. Seja o primeiro a votar!</p>
          <Link to="/votacao" className="botao botao-principal">Votar no craque</Link>
        </section>
      ) : (
        <>
          <p className="resultado-lideranca">{textoLideranca(resultado)}</p>

          <ol className="resultado-lista">
            {resultado.map((j, indice) => {
              const classe = indice === 0 ? 'resultado-item-craque' : indice === 1 ? 'resultado-item-vice' : '';
              return (
                <li key={j.id} className={classe}>
                  <span className="resultado-posicao">{indice + 1}º</span>
                  <img src={j.foto} alt={j.nome} className="resultado-foto" />
                  <div className="resultado-dados">
                    <h2 className="resultado-nome">
                      {j.nome}
                      {indice === 0 && <span className="selo-craque">Craque do jogo</span>}
                      {indice === 1 && <span className="selo-vice">Vice</span>}
                    </h2>
                    <div
                      className="resultado-barra"
                      role="progressbar"
                      aria-label={`Percentual de votos de ${j.nome}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(j.percentual)}
                    >
                      <span style={{ width: `${j.percentual}%` }} />
                    </div>
                    <p className="resultado-numeros">
                      {formatarPercentual(j.percentual)} ({j.votos} {plural(j.votos, 'voto', 'votos')})
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="resultado-acoes">
            <button type="button" className="botao botao-principal" onClick={desfazer}>
              Desfazer último voto
            </button>
            <button type="button" className="botao botao-secundario" onClick={zerar}>
              Zerar votação
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Resultado;
