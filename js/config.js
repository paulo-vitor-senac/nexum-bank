const SUPABASE_URL = 'https://akzjwawzyylnbsebgyui.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFremp3YXd6eXlsbmJzZWJneXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2Mjk0MjMsImV4cCI6MjA5MDIwNTQyM30.jrHWgvs1SzWGOmzTNNw4GieDm8D_eWBoLUMhhu1G534';

async function supabaseQuery(tabela, metodo, dados = null, id = null) {
    let url = `${SUPABASE_URL}/rest/v1/${tabela}`;
    if (id) url += `?id=eq.${id}`;

    const options = {
        method: metodo,
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    };

    if (dados) {
        options.body = JSON.stringify(dados);
    }

    try {
        const resposta = await fetch(url, options);
        const resultado = await resposta.json();

        if (Array.isArray(resultado)) {
            return resultado;
        } else if (resultado && typeof resultado === 'object') {
            return [resultado];
        } else {
            return [];
        }

    } catch (erro) {
        console.error('Erro na requisição:', erro);
        return [];
    }
}