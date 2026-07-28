
const boto=document.getElementById ("boto");
let totalgeral=0;
boto.addEventListener("click", function(event) {
    event.preventDefault();
    const produto = capitalizar(document.getElementById("produto").value);
    const quantidade =parseFloat (document.getElementById("quantidade").value);
    const preco = parseFloat (document.getElementById("preco").value);
    const unidade = document.getElementById("unidade").value;

    const produtoInput = document.getElementById("produto");
    const quantidadeInput = document.getElementById("quantidade");
    const precoInput = document.getElementById("preco");

    const subtotal= quantidade * preco;
    totalgeral += subtotal;
    
    const lista = document.getElementById("listaprodutos");
    lista.innerHTML +=`
    <tr>
        <td>${produto}</td>
        <td>${quantidade} ${unidade}</td>
        <td>R$${preco.toFixed(2)}</td>
        <td><button class="apagar">🚫 Apagar </button></td>
        
    </tr>`;
    
    lista.addEventListener("click", function(event){
        if(event.target.classList.contains("apagar")){
            const linha= event.target.closest("tr");
            const precoCell = linha.children[2]. textContent.replace("R$","");
            const quantidadeCell = parseFloat(linha.children[1].textContent);

            totalgeral-= quantidadeCell*parseFloat(precoCell);
            document.getElementById("totalgeral").textContent= totalgeral.toFixed(2);

            linha.remove();
        }
    });
    document.getElementById("totalgeral").textContent = totalgeral.toFixed(2);

    produtoInput.value="";
    quantidadeInput.value="";
    precoInput.value="";
    produtoInput.focus();

    function capitalizar(texto){
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }
});

