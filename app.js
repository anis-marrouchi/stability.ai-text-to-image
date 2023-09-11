const promptInput = document.querySelector('#prompt-input');
const promptForm = document.querySelector('#prompt-form');
const result = document.querySelector('#result');

promptForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const promptText = promptInput.value;
    
    fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer you-api-key-here` // from stability.ai
        },
        body: JSON.stringify({ text_prompts: [{text: promptText}] })
    })
    .then(response => response.json())
    .then(data => {



        // Clear existing images
        result.innerHTML = '';

        data.artifacts.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${image.base64}`;
            img.setAttribute("alt", `Generated Image ${index + 1}`);
            result.appendChild(img);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
