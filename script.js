const enunciados = {
    1: "Validação de Datas:\nInforme dia, mês e ano. Verificar se é uma data válida considerando anos bissextos.",
    2: "Jogo de Adivinhação:\nAdivinhe o número de 1 a 100. O jogo dirá se é mais alto ou mais baixo.",
    3: "Palavras Únicas:\nDigite uma frase e veja quais são as palavras únicas nela.",
    4: "Fatorial Recursivo:\nInforme um número inteiro para calcular o fatorial de forma recursiva.",
    5: "Debounce:\nClique rapidamente no botão. A função só executa após você parar de clicar por alguns milissegundos.",
    6: "Memoization:\nCalcula fatorial com cache. Teste com o mesmo número e veja a diferença de desempenho.",
    7: "Mapeamento e Ordenação:\nInforme uma lista de produtos com nome e preço. O sistema retorna os nomes ordenados pelo preço.",
    8: "Agrupamento por Propriedade:\nInforme uma lista de vendas (cliente e total). O sistema soma os totais por cliente.",
    9: "Conversão Entre Formatos:\nTransforma um array de pares em objeto e vice-versa."
};

function mostrarEnunciado() {
    const exercicio = document.getElementById('exercicio').value;
    document.getElementById('enunciado').innerText = enunciados[exercicio];
    gerarInputs(exercicio);
    document.getElementById('resultado').innerText = '';
}

function gerarInputs(ex) {
    const div = document.getElementById('inputs');
    div.innerHTML = '';

    switch (parseInt(ex)) {
        case 1:
            div.innerHTML = `
        <input id="dia" placeholder="Dia">
        <input id="mes" placeholder="Mês">
        <input id="ano" placeholder="Ano">
        <button onclick="validarData()">Executar</button>
      `;
            break;
        case 2:
            iniciarJogo();
            break;
        case 3:
            div.innerHTML = `
        <input id="frase" placeholder="Digite uma frase">
        <button onclick="palavrasUnicas()">Executar</button>
      `;
            break;
        case 4:
            div.innerHTML = `
        <input id="num" placeholder="Número">
        <button onclick="calcularFatorial()">Executar</button>
      `;
            break;
        case 5:
            div.innerHTML = `
        <button id="btnDebounce">Clique Rápido Aqui</button>
      `;
            debounceExample();
            break;
        case 6:
            div.innerHTML = `
        <input id="numMemo" placeholder="Número">
        <button onclick="fatorialMemoizacao()">Executar</button>
      `;
            break;
        case 7:
            div.innerHTML = `
        <textarea id="produtos" rows="4" placeholder='Exemplo: [{"nome":"Arroz","preco":10},{"nome":"Feijão","preco":8}]'></textarea>
        <button onclick="mapearOrdenar()">Executar</button>
      `;
            break;
        case 8:
            div.innerHTML = `
        <textarea id="vendas" rows="4" placeholder='Exemplo: [{"cliente":"Ana","total":100},{"cliente":"João","total":150},{"cliente":"Ana","total":200}]'></textarea>
        <button onclick="agruparVendas()">Executar</button>
      `;
            break;
        case 9:
            div.innerHTML = `
        <textarea id="inputPares" rows="2" placeholder='Pares: [["a",1],["b",2]]'></textarea>
        <button onclick="paresParaObjeto()">Pares ➡️ Objeto</button><br>
        <textarea id="inputObjeto" rows="2" placeholder='Objeto: {"a":1,"b":2}'></textarea>
        <button onclick="objetoParaPares()">Objeto ➡️ Pares</button>
      `;
            break;
    }
}

// Exercício 1
function validarData() {
    const d = parseInt(document.getElementById('dia').value);
    const m = parseInt(document.getElementById('mes').value);
    const a = parseInt(document.getElementById('ano').value);
    const dataValida = (d, m, a) => {
        const meses = [31, (a % 4 === 0 && (a % 100 !== 0 || a % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return m >= 1 && m <= 12 && d >= 1 && d <= meses[m - 1];
    };
    document.getElementById('resultado').innerText = dataValida(d, m, a) ? "Data válida" : "Data inválida";
}

// Exercício 2
let numeroSecreto, tentativas;
function iniciarJogo() {
    const div = document.getElementById('inputs');
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    div.innerHTML = `
    <input id="palpite" placeholder="Seu palpite">
    <button onclick="jogar()">Chutar</button>
  `;
}
function jogar() {
    const chute = parseInt(document.getElementById('palpite').value);
    tentativas++;
    if (chute === numeroSecreto) {
        document.getElementById('resultado').innerText = `Acertou! Tentativas: ${tentativas}`;
    } else if (chute < numeroSecreto) {
        alert("Mais alto!");
    } else {
        alert("Mais baixo!");
    }
}

// Exercício 3
function palavrasUnicas() {
    const frase = document.getElementById('frase').value;
    const palavras = frase.toLowerCase().split(/\s+/);
    const unicas = palavras.filter((p, i) => palavras.indexOf(p) === i);
    document.getElementById('resultado').innerText = `Palavras únicas: ${JSON.stringify(unicas)}`;
}

// Exercício 4
function calcularFatorial() {
    const n = parseInt(document.getElementById('num').value);
    function fatorial(x) {
        if (x < 0) throw "Número não pode ser negativo";
        if (x === 0) return 1;
        return x * fatorial(x - 1);
    }
    try {
        const r = fatorial(n);
        document.getElementById('resultado').innerText = `Fatorial: ${r}`;
    } catch (e) {
        document.getElementById('resultado').innerText = e;
    }
}

// Exercício 5
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
function debounceExample() {
    const btn = document.getElementById('btnDebounce');
    if (!btn) return;
    btn.onclick = debounce(() => {
        document.getElementById('resultado').innerText = "Clique processado!";
    }, 1000);
}

// Exercício 6
function memoize(fn) {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}
const fatorialMemo = memoize(function f(n) {
    if (n < 0) throw "Negativo!";
    if (n === 0) return 1;
    return n * f(n - 1);
});
function fatorialMemoizacao() {
    const n = parseInt(document.getElementById('numMemo').value);
    try {
        const r = fatorialMemo(n);
        document.getElementById('resultado').innerText = `Fatorial memoizado: ${r}`;
    } catch (e) {
        document.getElementById('resultado').innerText = e;
    }
}

// Exercício 7
function mapearOrdenar() {
    const arr = JSON.parse(document.getElementById('produtos').value);
    const r = arr.sort((a, b) => a.preco - b.preco).map(p => p.nome);
    document.getElementById('resultado').innerText = JSON.stringify(r);
}

// Exercício 8
function agruparVendas() {
    const arr = JSON.parse(document.getElementById('vendas').value);
    const r = arr.reduce((acc, curr) => {
        acc[curr.cliente] = (acc[curr.cliente] || 0) + curr.total;
        return acc;
    }, {});
    document.getElementById('resultado').innerText = JSON.stringify(r);
}

// Exercício 9
function paresParaObjeto() {
    const arr = JSON.parse(document.getElementById('inputPares').value);
    const r = Object.fromEntries(arr);
    document.getElementById('resultado').innerText = JSON.stringify(r);
}
function objetoParaPares() {
    const obj = JSON.parse(document.getElementById('inputObjeto').value);
    const r = Object.entries(obj);
    document.getElementById('resultado').innerText = JSON.stringify(r);
}
