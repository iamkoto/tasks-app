document.addEventListener('DOMContentLoaded', function () {
    const listaPessoas = document.getElementById('listaPessoas');
    const adicionarPessoaButton = document.getElementById('adicionarPessoa');
    
    adicionarPessoaButton.addEventListener('click', function () {
        const nome = document.getElementById('nomeInput').value;
        const idade = parseInt(document.getElementById('idadeInput').value);
        const cidade = document.getElementById('cidadeInput').value;
        const sangue = document.getElementById('sangueInput').value;
        
        if (nome && !isNaN(idade) && cidade && sangue) {
            // cria um objeto pessoa com os dados
            const pessoa = {
                nome: nome,
                idade: idade,
                cidade: cidade,
                sangue: sangue,
            };

            // adiciona a pessoa ao JSON
            adicionarPessoa(pessoa);
        } else if  (!nome) {
            alert('Preencher o campo nome');
        } else if (!idade) {
            alert('Idade inválida');
        } else if (!cidade) {
            alert('Dados da cidade inválido');
        } else if(!sangue) {
            alert('Tipo de sangue inválido');
        } 
         else {
            alert('Preencha todos os campos corretamente');
        }
    });
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
        document.getElementById("sangueInput").value = '';

        atualizarListaPessoas(jsonAtual.pessoas);
    }
    function atualizarListaPessoas(pessoas) {
        // limpa lista de pessoas existentes
        listaPessoas.innerHTML = '';

        // adiciona pessoas a lista
        pessoas.forEach(function (pessoa, index) {
            const li = document.createElement('li');
            li.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Cidade: ${pessoa.cidade}, Sangue: ${pessoa.sangue}`;
            listaPessoas.appendChild(li);

            const removeButton = document.createElement('button')

            removeButton.textContent = 'Remover pessoas';
            li.appendChild(removeButton)
            
            // Remover pessoas por pessoa da lista
            removeButton.addEventListener('click', function() {
                removerPessoa(index)
            });
        })
    }
    
    
    function removerPessoa(index) {
        const jsonArmazenado = localStorage.getItem('dadosJson');

        if (jsonArmazenado) {
            try {
                const parsedJson = JSON.parse(jsonArmazenado);
                if (Array.isArray(parsedJson.pessoas)) {
                    // Remove a pessoa pelo índice
                    parsedJson.pessoas.splice(index, 1);

                    // Atualiza o JSON no localStorage
                    localStorage.setItem('dadosJson', JSON.stringify(parsedJson));

                    // Atualiza a lista de pessoas na página
                    atualizarListaPessoas(parsedJson.pessoas);
                }
            } catch (error) {
                console.error('erro ao analizar JSON', error);
            }
        };
    }

    


    // Botão que apaga toda lista criada anteriormente
    const limpaLista = document.getElementById('limpaLista')

    limpaLista.addEventListener('click', function (){
        localStorage.clear();
        listaPessoas.innerHTML = '';
    });
});
