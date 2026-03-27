document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); // ← impede o reload da página

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value.trim();
    const msg = document.getElementById('mensagem-sucesso');

    if (!email || !senha || !nome) {
        // mostra erro nos campos
        return;
    }

    try {
        const contas = await supabaseQuery('contas', 'GET');

        const jaExiste = contas.some(c => c.email === email);

        if (jaExiste) {
            alert('Email já cadastrado');
            return;
        }

        const resultado = await supabaseQuery('contas', 'POST', {
            email, senha, nome, saldo: 0
        });

        if (resultado.length > 0) {
            msg.style.display = 'block';
        }

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
});