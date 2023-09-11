const axios = require('axios');  // Comment this line if you're running this in a browser
const promptInput = document.querySelector('#prompt-input');
const promptForm = document.querySelector('#prompt-form');
const result = document.querySelector('#result');

promptForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const promptText = promptInput.value;
    
    axios.post('https://api.stability.ai/v1/generation', {
        prompt: promptText,
        // *Add your API key and other necessary parameters here*
    })
    .then((response) => {
        const img = document.createElement('img');
        img.src = response.data.url;
        result.appendChild(img);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
