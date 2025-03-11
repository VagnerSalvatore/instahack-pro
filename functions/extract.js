const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
    const username = event.path.split('/').pop();

    try {
        const url = `https://www.instagram.com/${username}/`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        const profilePic = $('meta[property="og:image"]').attr('content');

        if (!profilePic) {
            throw new Error('Foto de perfil não encontrada');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ profilePic }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        console.error(error);
        // Fallback para uma URL confiável do Placeholder.com
        const fallbackPic = 'https://placehold.co/120x120?text=Sem+Foto';
        return {
            statusCode: 200, // Retorna 200 mesmo com erro para evitar falha visível
            body: JSON.stringify({ profilePic: fallbackPic }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
