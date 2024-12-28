const fetchAPOD = async () => {
    const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo'; 
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        
        const apodImage = document.getElementById('apod-image');
        apodImage.src = data.url; 
        apodImage.alt = data.title;

        return data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
    }
};

const fetchMarsRover = async (apodData) => {
    const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo'; 
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const marsRoverImage = document.getElementById('mars-rover-image');

        if (data.photos && data.photos.length > 0) {
            marsRoverImage.src = data.photos[0].img_src; 
            marsRoverImage.alt = 'Mars Rover Image';
        } else {
            marsRoverImage.src = apodData.url;
            marsRoverImage.alt = 'Fallback to APOD Image';
        }
    } catch (error) {
        console.error('Error fetching Mars Rover photos:', error);

        const marsRoverImage = document.getElementById('mars-rover-image');
        marsRoverImage.src = apodData.url;
        marsRoverImage.alt = 'Fallback to APOD Image';
    }
};

fetchAPOD();
fetchMarsRover();

