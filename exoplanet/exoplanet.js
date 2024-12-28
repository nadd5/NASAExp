const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo';

const apiUrl = `https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isplanet,eq,true&filter[]=id,gt,1000&api_key=${apiKey}`;

const fetchExoplanets = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data || !data.bodies) {
            console.error('No exoplanet data found.');
            return;
        }

        const exoplanetList = data.bodies;

        const exoplanetContainer = document.getElementById('exoplanet-list');

        exoplanetContainer.innerHTML = '';

        exoplanetList.forEach(exoplanet => {
            const exoplanetCard = document.createElement('div');
            exoplanetCard.classList.add('exoplanet-card');
            
            exoplanetCard.innerHTML = `
                <h3>${exoplanet.englishName || 'Unnamed Planet'}</h3>
                <p><strong>Mass:</strong> ${exoplanet.mass ? exoplanet.mass.massValue : 'N/A'} ${exoplanet.mass ? exoplanet.mass.massExponent : ''}kg</p>
                <p><strong>Gravity:</strong> ${exoplanet.gravity || 'N/A'} m/s²</p>
                <p><strong>Discovery:</strong> ${exoplanet.discoveryDate || 'Unknown'}</p>
            `;
            exoplanetContainer.appendChild(exoplanetCard);
        });
    } catch (error) {
        console.error('Error fetching exoplanet data:', error);
    }
};

window.onload = fetchExoplanets;
