document.addEventListener('DOMContentLoaded', function () {
    const listaPessoas = document.getElementById('listaPessoas');
    const adicionarPessoaButton = document.getElementById('adicionarPessoa');
    
    adicionarPessoaButton.addEventListener('click', function () {
        const nome = document.getElementById('nomeInput').value;
        const idade = parseInt(document.getElementById('idadeInput').value);
        const cidade = document.getElementById('cidadeInput').value;
        
        if (nome && !isNaN(idade) && cidade) {
            // cria um objeto pessoa com os dados
            const pessoa = {
                nome: nome,
                idade: idade,
                cidade: cidade,
            };

            // adiciona a pessoa ao JSON
            adicionarPessoa(pessoa);
        } else {
            alert('Preencha todos os campos corretamente');0
        }
    })
    function adicionarPessoa(pessoa) {
        const jsonAtual = {
            pessoas: []
        }
        const jsonArmazenado = localStorage.getItem('dadosJson');

        if (jsonArmazenado) {
            try {
                const parsedJson = JSON.parse(jsonArmazenado);

                if (Array.isArray(parsedJson.pessoas)) {
                    jsonAtual.pessoas = parsedJson.pessoas;
                }
            } catch (error) {
                console.error('erro ao analizar JSON', error);
            }
        }

        // adiciona a nova pessoa
        jsonAtual.pessoas.push(pessoa);

        // atualiza o JSON
        localStorage.setItem('dadosJson', JSON.stringify(jsonAtual));

        // limpa os campos
        document.getElementById("nomeInput").value = '';
        document.getElementById("idadeInput").value = '';
        document.getElementById("cidadeInput").value = '';

        atualizarListaPessoas(jsonAtual.pessoas);
    }
    function atualizarListaPessoas(pessoas) {
        // limpa lista de pessoas existentes
        listaPessoas.innerHTML = '';

        // adiciona pessoas a lista
        pessoas.forEach(function (pessoa) {
            const li = document.createElement('li');
            li.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Cidade: ${pessoa.cidade}`;
            listaPessoas.appendChild(li);
        })
        
    }
    const jsonArmazenado = localStorage.getItem('dadosJson');
    if (jsonArmazenado) {
        try {
            const parsedJson = JSON.parse(jsonArmazenado);
            if (Array.isArray(parsedJson.pessoas)) {
                atualizarListaPessoas(parsedJson.pessoas);
            }
        } catch (error) {
            console.error('erro ao analizar JSON', error);
        }
    }
})