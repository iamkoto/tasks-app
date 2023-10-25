document.addEventListener('DOMContentLoaded', function () {
    const listaPessoas = document.getElementById('listaPessoas');
    const adicionarPessoaButton = document.getElementById('adicionarPessoa');


    adicionarPessoaButton.addEventListener('click', function () {
        const tarefa = document.getElementById('taskInput').value;
        const who = document.getElementById('whoInput').value;
        const status = document.getElementById('statusInput').value;
        const dateInput = document.getElementById('dateInput');
        const date = formatDate(dateInput.value);

        if (tarefa && who && status && date) {
            const task = {
                tarefa: tarefa,
                responsavel: who,
                situacao: status,
                data: date,
            };

            adicionarPessoa(task);
        } else if (!tarefa) {
            alert('Task inexistente');
        } else if (!who) {
            alert('Pessoa inválida');
        } else if (!status) {
            alert('Status inexistente');
        } else if (!date) {
            alert('Data inválida');
        } else {
            alert('Preencha todos os campos corretamente');
        }
    });

    function formatDate(isoDate) {
        const dateObject = new Date(isoDate);
        const dia = dateObject.getDate() + 1;
        const mes = dateObject.getMonth() + 1;
        const ano = dateObject.getFullYear();

        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    }

    function adicionarPessoa(task) {
        const jsonAtual = {
            tasks: []
        };
        const jsonArmazenado = localStorage.getItem('dadosJson');

        if (jsonArmazenado) {
            try {
                const parsedJson = JSON.parse(jsonArmazenado);

                if (Array.isArray(parsedJson.tasks)) {
                    jsonAtual.tasks = parsedJson.tasks;
                }
            } catch (error) {
                console.error('erro ao analisar JSON', error);
            }
        }

        jsonAtual.tasks.push(task);

        localStorage.setItem('dadosJson', JSON.stringify(jsonAtual));

        document.getElementById("taskInput").value = '';
        document.getElementById("whoInput").value = '';
        document.getElementById("statusInput").value = '';
        document.getElementById("dateInput").value = '';

        atualizarListaPessoas(jsonAtual.tasks);
    }

    function atualizarListaPessoas(tasks) {
        listaPessoas.innerHTML = '';

        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
             <div>
             <select id="status-select" class="status-select" data-index="${index}">
             <option value="Backlog" ${task.situacao === 'Backlog' ? 'selected' : ''}>Backlog</option>
             <option value="Em Andamento" ${task.situacao === 'Em Andamento' ? 'selected' : ''}>Em andamento</option>
             <option value="Concluído" ${task.situacao === 'Concluído' ? 'selected' : ''}>Concluído</option>
             <option value="Impeditivo" ${task.situacao === 'Impeditivo' ? 'selected' : ''}>Impeditivo</option>
             </select>
             </div>
             <div>${task.tarefa} - ${task.responsavel}</div> 
             <div>${task.data}</div>
            `;
            listaPessoas.appendChild(li);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            li.appendChild(removeButton);

            removeButton.addEventListener('click', function () {
                removerPessoa(index);
            });
            const statusSelect = li.querySelector('.status-select');
            
            statusSelect.addEventListener('change', function() {
                const selectedIndex = parseInt(statusSelect.getAttribute('data-index'));
                const newStatus = statusSelect.value;

                atualizarStatusTarefa(selectedIndex, newStatus);
            })
        });
    }

    function atualizarStatusTarefa(index, newStatus) {
        if (jsonArmazenado) {
            try {
    
                if (Array.isArray(parsedJson.tasks)) {
                    parsedJson.tasks[index].situacao = newStatus;
                    localStorage.setItem('dadosJson', JSON.stringify(parsedJson));
                }
            } catch (error) {
                console.error('erro ao analisar JSON', error);
            }
        }
    
    }

    const jsonArmazenado = localStorage.getItem('dadosJson');
    const parsedJson = JSON.parse(jsonArmazenado);

    if (jsonArmazenado) {
        try {

            if (Array.isArray(parsedJson.tasks)) {
                atualizarListaPessoas(parsedJson.tasks);
            }
        } catch (error) {
            console.error('erro ao analisar JSON', error);
        }
    }

    function removerPessoa(index) {

        if (jsonArmazenado) {
            try {

                if (Array.isArray(parsedJson.tasks)) {
                    parsedJson.tasks.splice(index, 1);
                    localStorage.setItem('dadosJson', JSON.stringify(parsedJson));
                    atualizarListaPessoas(parsedJson.tasks);
                }
            } catch (error) {
                console.error('erro ao analisar JSON', error);
            }
        }
    }

    const limpaLista = document.getElementById('limpaLista');

    limpaLista.addEventListener('click', function () {
        localStorage.clear();
        listaPessoas.innerHTML = '';
    });

    const addThreePeople = document.getElementById('addThreePeople');

    addThreePeople.addEventListener('click', function () {
        for (let i = 0; i < 3; i++) {
            const taskInput = document.getElementById('taskInput');
            const whoInput = document.getElementById('whoInput');
            const statusInput = document.getElementById('statusInput');
            const dateInput = document.getElementById('dateInput');

            taskInput.value = `teste ${(i + 1)}`;
            whoInput.value = 'jose';
            statusInput.value = 'produzindo';
            dateInput.value = '10/2/2024';

            adicionarPessoa({
                tarefa: taskInput.value,
                responsavel: whoInput.value,
                situacao: statusInput.value,
                data: dateInput.value
            });
        }
    });

    const select = document.getElementById('status-select');
    select.addEventListener('change', function(){
        const currentValue = select.value;

        if(currentValue === 'Impeditivo') {
            select.style.backgroundColor = 'red';
        }
    }) 
});
