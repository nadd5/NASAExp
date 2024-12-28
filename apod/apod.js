document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ZHcUdg0TBkttQnf8DElbyF21fccWkVnzCHauIHbo';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    const defaultDate = '2024-12-23';
    const maxDate = new Date().toISOString().split('T')[0];
  
    const dateInput = document.getElementById('apod-date');
    dateInput.max = maxDate;
    dateInput.value = maxDate;
  
    const fetchApod = (date = '') => {
      const dateParam = date ? `&date=${date}` : '';
      fetch(apiUrl + dateParam)
        .then(response => response.json())
        .then(data => {
          document.getElementById('apod-title').textContent = data.title;
          document.getElementById('apod-image').src = data.url;
          document.getElementById('apod-image').alt = data.title;
          document.getElementById('apod-description').textContent = data.explanation;
          document.getElementById('apod-full-image').src = data.url;
          document.getElementById('apod-full-image').alt = data.title;
        })
        .catch(error => {
          console.error('Error fetching APOD:', error);
        });
    };
  
    fetchApod(defaultDate);
  
    document.getElementById('fetch-apod').addEventListener('click', () => {
      const selectedDate = dateInput.value;
      if (selectedDate) {
        fetchApod(selectedDate);
        const fullImage = document.getElementById('apod-full-image');
        fullImage.classList.add('animate');
        setTimeout(() => fullImage.classList.remove('animate'), 1000);
      } else {
        alert('Please select a date to fetch the APOD.');
      }
    });
  });
  