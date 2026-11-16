const SELOS = {
    indicado: 'Indicado',
    suspenso: 'Suspenso',
};

function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
    const { nome, numero, posicao, foto, situacao } = jogador;
    const selo = SELOS[situacao];
    const classes = ['card', `card-${situacao}`, selecionado && 'card-selecionado']
        .filter(Boolean)
        .join(' ');

    return (
        <article className={classes}>
            <div className="card-foto">
                <img src={foto} alt={nome} />
                {selo && <span className={`home-selo home-selo-${situacao}`}>{selo}</span>}
            </div>
            <div className="card-info">
                <h3 className="card-nome">
                    <span className="home-numero">{numero}</span>
                    <span>{nome}</span>
                </h3>
                <p className="card-posicao">{posicao}</p>
            </div>
            {onSelecionar && (
                <button
                    type="button"
                    className="botao card-botao"
                    aria-pressed={selecionado}
                    onClick={() => onSelecionar(jogador)}
                >
                    {selecionado ? '✓ Selecionado' : 'Selecionar'}
                </button>
            )}
        </article>
    );
}

export default JogadorCard;
