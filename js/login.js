document.getElementById('formLogin').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const msg = document.getElementById('mensagem-sucesso');

    if (!email || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    try {
        const contas = await supabaseQuery('contas', 'GET');

        const conta = contas.find(c => c.email === email && c.senha === senha);

        if (!conta) {
            alert('Email ou senha incorretos');
            return;
        }

        // Salva os dados do usuário na sessão
        sessionStorage.setItem('usuarioLogado', JSON.stringify(conta));

        msg.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'conta.html'; // troca pelo destino depois do login
        }, 1500);

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
});