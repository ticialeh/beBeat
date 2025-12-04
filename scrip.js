document.addEventListener("DOMContentLoaded", () => {
  const frase = "BYTE A BYTE, BEAT A BEAT";
  console.log(frase);

  const gameArea = document.getElementById("game-area");
  const instrucao = document.getElementById("instrucao");
  const scoreEl = document.getElementById("score");
  const statusEl = document.getElementById("status");
  const btnStart = document.getElementById("btnStart");
  const btnStop = document.getElementById("btnStop");

  const cores = [
    { cor: "red",   direcao: "Esquerda", sombra: "rgba(255, 80, 80, 0.55)" },
    { cor: "blue",  direcao: "Direita",  sombra: "rgba(80, 140, 255, 0.55)" },
    { cor: "green", direcao: "Cima",     sombra: "rgba(80, 255, 140, 0.55)" },
    { cor: "yellow",direcao: "Baixo",    sombra: "rgba(255, 220, 80, 0.55)" }
  ];

  let corAtual = null;
  let intervalo = null;
  let score = 0;

  function atualizarHUD() {
    scoreEl.textContent = score;
  }

  function mudarCor() {
    const sorteio = cores[Math.floor(Math.random() * cores.length)];
    corAtual = sorteio;
    gameArea.style.backgroundColor = sorteio.cor;
    gameArea.style.boxShadow = `0 0 24px ${sorteio.sombra}`;
    instrucao.textContent = `Cor: ${sorteio.cor.toUpperCase()} → Mova para ${sorteio.direcao}`;
    statusEl.textContent = "Jogando...";
    // console para depuração
    console.log(`LED: ${sorteio.cor} | Direção: ${sorteio.direcao}`);
  }

  function iniciarJogo() {
    if (intervalo) return; // já está rodando
    score = 0;
    atualizarHUD();
    mudarCor(); // começa imediatamente
    intervalo = setInterval(mudarCor, 2000);
    btnStart.disabled = true;
    btnStop.disabled = false;
    statusEl.textContent = "Jogando...";
  }

  function pararJogo() {
    clearInterval(intervalo);
    intervalo = null;
    statusEl.textContent = "Parado";
    instrucao.textContent = "Clique em Iniciar para começar.";
    btnStart.disabled = false;
    btnStop.disabled = true;
  }

  // Inputs por teclado
  document.addEventListener("keydown", (event) => {
    if (!corAtual || !intervalo) return;

    let resposta = "";
    switch (event.key) {
      case "ArrowLeft":  resposta = "Esquerda"; break;
      case "ArrowRight": resposta = "Direita";  break;
      case "ArrowUp":    resposta = "Cima";     break;
      case "ArrowDown":  resposta = "Baixo";    break;
      default: return; // ignora outras teclas
    }

    if (resposta === corAtual.direcao) {
      score += 1;
      atualizarHUD();
      instrucao.textContent = "✅ Acertou!";
      statusEl.textContent = "Boa!";
    } else {
      instrucao.textContent = "❌ Errou!";
      statusEl.textContent = "Tente de novo";
    }
  });

  // Botões
  btnStart.addEventListener("click", iniciarJogo);
  btnStop.addEventListener("click", pararJogo);

  // Estado inicial
  btnStart.disabled = false;
  btnStop.disabled = true;
  statusEl.textContent = "Aguardando...";
});
