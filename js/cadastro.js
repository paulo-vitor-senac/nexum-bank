document.getElementById('formCadastro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const msg = document.getElementById('mensagem-sucesso');

    if (!email || !senha || !nome || !cpf) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    try {
        const contas = await supabaseQuery('contas', 'GET');

        const jaExiste = contas.some(c => c.email === email);

        if (jaExiste) {
            alert('Email já cadastrado');
            return;
        }
        const cpfExiste = contas.some(c => c.cpf === cpf);

        if (cpfExiste) {
            alert('CPF já cadastrado');
            return;
        }

        const resultado = await supabaseQuery('contas', 'POST', {
            email, senha, nome, saldo: 0, idade, cpf, telefone
        });

        if (resultado.length > 0) {
            msg.style.display = 'block';
        }

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
});