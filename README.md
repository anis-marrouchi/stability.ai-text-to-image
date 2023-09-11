# Building a Web App using Stability.ai REST API

In this tutorial, we'll learn how to build a web app that generates images using the Stability.ai REST API based on a submitted prompt and displays it to the user. The API documentation covers several endpoints including account management, engine enumeration, and image generation. Let's dive in!

## Prerequisite

You will need a basic understanding of:

- HTML/CSS for front-end development
- JavaScript for API calls
- Basic understanding of REST APIs

## Step 1: Setting up your Development Environment

First, create a new folder for our project and initialize it with the necessary front-end files.

```bash
mkdir text-to-image-app
cd text-to-image-app
touch index.html app.js
```

## Step 2: Creating the HTML structure

In `index.html`, add the following HTML structure with Tailwind CSS:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text to Image Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 h-screen flex flex-col justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h1 class="text-2xl mb-4">Text to Image Generator</h1>
        <form id="prompt-form" class="flex flex-col">
            <input type="text" id="prompt-input" placeholder="Enter a text prompt" class="p-2 border rounded-md mb-4">
            <button type="submit" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Generate</button>
        </form>
        <div id="result" class="mt-4"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

## Step 3: Making API Calls

In `app.js`, we'll make the API calls using the native `fetch` function provided by JavaScript:

```javascript
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
            'Authorization': `Bearer YOUR_API_KEY_HERE`
        },
        body: JSON.stringify({ text_prompts: [{text: promptText}] })
    })
    .then(response => response.json())
    .then(data => {
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
```

**Note**: Replace `YOUR_API_KEY_HERE` with your actual Stability.ai API key.

## Step 4: Displaying Generated Images

The code within the `.then()` function handles the response that we get from the API. Stability.ai returns the generated image as a base64 string, which we convert to an image and append to the `result` div.

---

That's it! You've built your own web app that generates images from text prompts using the Stability.ai REST API.

Remember to always refer back to the API documentation to understand the requirements and constraints of each parameter, and happy coding!