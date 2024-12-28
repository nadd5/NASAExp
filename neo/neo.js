document.addEventListener('DOMContentLoaded', async () => {
    const neoListDiv = document.getElementById('neo-list');
    neoListDiv.innerHTML = '<p>Loading NEO data...</p>';

    const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo';
    const today = new Date().toISOString().split('T')[0];
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`;

    const createNeoItem = (neo) => {
        const neoTab = document.createElement('div');
        neoTab.classList.add('neo-tab');

        const isImpactPossible = neo.close_approach_data.some(
            (approach) => approach.orbiting_body === 'Earth' && approach.miss_distance.kilometers <= 50000
        );

        neoTab.innerHTML = `
            <h3>${neo.name}</h3>
            <p>Diameter: ${neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
            <p>Hazardous: ${neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
            <p>Close Approach Date: ${neo.close_approach_data[0].close_approach_date}</p>
            <p>Velocity: ${parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
            <p>Miss Distance: ${parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toFixed(2)} km</p>
            <p>Impact Possible: ${isImpactPossible ? 'Yes' : 'No'}</p>
        `;

        neoTab.addEventListener('click', () => {
            document.querySelectorAll('.neo-tab').forEach(tab => tab.classList.remove('active'));
            neoTab.classList.add('active');
        });

        neoTab.addEventListener('mouseover', () => {
            neoTab.style.boxShadow = '0 6px 12px rgb(53, 140, 255)';
        });

        neoTab.addEventListener('mouseout', () => {
            neoTab.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        });

        return neoTab;
    };

    const loadNeoList = async () => {
        try {
            neoListDiv.innerHTML = '<p>Loading NEO data...</p>';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data from the API.');
            }

            const data = await response.json();
            const nearEarthObjects = data.near_earth_objects[today];

            if (nearEarthObjects && nearEarthObjects.length > 0) {
                neoListDiv.innerHTML = '';
                nearEarthObjects.forEach((neo) => {
                    const neoItem = createNeoItem(neo);
                    neoListDiv.appendChild(neoItem);
                });
            } else {
                neoListDiv.innerHTML = '<p>No NEOs detected for today.</p>';
            }
        } catch (error) {
            console.error('Error fetching NEO data:', error.message);
            neoListDiv.innerHTML = '<p style="color: red;">Failed to fetch data. Please try again later.</p>';
        }
    };

    await loadNeoList();
});