document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo'; // Replace with your NASA API key
    const rover = 'curiosity'; // You can use "curiosity", "opportunity", or "spirit"
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${apiKey}`;
  
    const marsRoverPhotosDiv = document.getElementById('mars-rover-photos');
  
    // Fetch Mars Rover Photos
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          data.photos.slice(0, 12).forEach((photo) => {
            const img = document.createElement('img');
            img.src = photo.img_src;
            img.alt = `Photo taken by ${rover} rover on ${photo.earth_date}`;
            marsRoverPhotosDiv.appendChild(img);
          });
        } else {
          marsRoverPhotosDiv.innerHTML = '<p>No photos found for the specified sol.</p>';
        }
      })
      .catch((error) => {
        marsRoverPhotosDiv.innerHTML = '<p>Sorry, an error occurred while fetching the Mars Rover photos.</p>';
        console.error('Error fetching Mars Rover photos:', error);
      });
  });
  