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
        const profilePic = $('meta[property="og:image"]').attr('content') || 'https://via.placeholder.com/120';

        return {
            statusCode: 200,
            body: JSON.stringify({ profilePic }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao extrair a foto. Verifique o @ ou tente novamente.' })
        };
    }
};
