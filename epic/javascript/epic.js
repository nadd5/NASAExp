document.addEventListener('DOMContentLoaded', () => {
  fetchEPICImage();
});

function fetchEPICImage() {
  fetch('https://api.nasa.gov/EPIC/api/natural?api_key=ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo')
    .then(response => response.json())
    .then(data => {
      console.log('EPIC data:', data);  
      const epicDataSection = document.querySelector('#epic-data');
      
      if (data && data.length > 0) {
        const image = data[0];  
        
        console.log('Selected image:', image);

        const [year, month, day] = image.date.split(" ")[0].split("-");

        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image.image}.jpg`;

        console.log('Image URL:', imageUrl);

        epicDataSection.innerHTML = `
          <div class="epic-container">
            <h2>Latest EPIC Image of Earth</h2>
            <img src="${imageUrl}" alt="EPIC Earth Image" class="epic-image">
            <p>Date: ${image.date}</p>
            <p>Description: Earth as seen from the EPIC camera aboard NASA's Deep Space Climate Observatory (DSCOVR).</p>
          </div>
        `;
      } else {
        epicDataSection.innerHTML = '<p>No EPIC data found. Please try again later.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching EPIC data:', error);
      const epicDataSection = document.querySelector('#epic-data');
      epicDataSection.innerHTML = '<p>Error loading EPIC image. Please try again later.</p>';
    });
}
