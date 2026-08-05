const boto = document.getElementById("boto");
let totalgeral = 0;

const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const lista = document.getElementById("listaprodutos");

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

boto.addEventListener("click", function(event) {
    event.preventDefault();
    const produto = capitalizar(produtoInput.value);
    const quantidade = parseFloat(quantidadeInput.value);
    const preco = parseFloat(precoInput.value);
    const unidade = document.getElementById("unidade").value;

    const subtotal = quantidade * preco;
    totalgeral += subtotal;

    lista.innerHTML += `
    <tr>
        <td>${produto}</td>
        <td>${quantidade} ${unidade}</td>
        <td>R$${preco.toFixed(2)}</td>
        <td><button class="apagar">🚫 Apagar </button></td>
    </tr>`;

    document.getElementById("totalgeral").textContent = totalgeral.toFixed(2);

    produtoInput.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
    produtoInput.focus();
});

// Registrado UMA vez só, fora do clique do boto
lista.addEventListener("click", function(event) {
    if (event.target.classList.contains("apagar")) {
        const linha = event.target.closest("tr");
        const precoCell = linha.children[2].textContent.replace("R$", "");
        const quantidadeCell = parseFloat(linha.children[1].textContent);

        totalgeral -= quantidadeCell * parseFloat(precoCell);
        document.getElementById("totalgeral").textContent = totalgeral.toFixed(2);

        linha.remove();
    }
});

// ===== Lista pendente =====
let pendentes = JSON.parse(localStorage.getItem("listaPendente")) || [];

const botaoPendente = document.getElementById("botaoPendente");
const itemPendenteInput = document.getElementById("itemPendente");
const listaPendenteEl = document.getElementById("listaPendente");

function renderizarPendentes() {
    listaPendenteEl.innerHTML = "";
    pendentes.forEach((nome, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${capitalizar(nome)}
            <button class="comprar" data-index="${index}">Comprar</button>
            <button class="remover-pendente" data-index="${index}">Remover</button>
        `;
        listaPendenteEl.appendChild(li);
    });
}

botaoPendente.addEventListener("click", function(event) {
    event.preventDefault();
    const nome = itemPendenteInput.value.trim();
    if (nome === "") return;

    pendentes.push(nome);
    localStorage.setItem("listaPendente", JSON.stringify(pendentes));
    renderizarPendentes();
    itemPendenteInput.value = "";
    itemPendenteInput.focus();
});

listaPendenteEl.addEventListener("click", function(event) {
    const index = event.target.dataset.index;

    if (event.target.classList.contains("comprar")) {
        produtoInput.value = pendentes[index];
        quantidadeInput.focus();

        pendentes.splice(index, 1);
        localStorage.setItem("listaPendente", JSON.stringify(pendentes));
        renderizarPendentes();
    }

    if (event.target.classList.contains("remover-pendente")) {
        pendentes.splice(index, 1);
        localStorage.setItem("listaPendente", JSON.stringify(pendentes));
        renderizarPendentes();
    }
});

renderizarPendentes();