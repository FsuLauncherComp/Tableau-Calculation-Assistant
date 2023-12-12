import {LLM} from "./llmjs/llm.js";

// Constants
const MODEL_URL = 'https://huggingface.co/RZakovich/tableau_calc_assistant/resolve/main/model-15k.gguf';

// UI Elements
const submitButton = document.getElementById('submitBtn');
const outputElement = document.getElementById('output');
const spinnerElement = document.getElementById('spinner');
const resultElement = document.getElementById('result');

let OUTPUT_FOUND = false;


const on_loaded = () => {
    submitButton.disabled = false;
    submitButton.innerText = "Generate";
}

const line_formatter = (line) => {
    // Regex to find 1. Some text: 2. Some text: 
    const regex = /(\d+\.\s)(.*?:)/g;
    // Ignore if tripple backticks are found before the :
    if (line.includes("```")) {
        return line;
    }
    const matches = line.matchAll(regex);
    // Replace the Some text with **Some text**
    for (const match of matches) {
        const text = match[2];
        const formatted_text = `**${text}**`;
        line = line.replace(text, formatted_text);
    }
    // We want to add /n before the next number
    line = line.replace(/(\d+\.\s)/g, "\n$1");
    return line;
}

const write_result = (line) => {
    // If the line contains <|output|>, then update OUTPUT_FOUND and split the line
    if (line.includes("<|output|>")) {
        OUTPUT_FOUND = true;
        line = line.split("<|output|>")[1];
        line = line.trim();
    }

    // If the line contains <|endoftext|>, then remove it from the line and strip the line
    if (line.includes("<|endoftext|>")) {
        line = line.split("<|endoftext|>")[1];
        line = line.trim();
    }

    if (OUTPUT_FOUND && line.length > 0) {
        resultElement.style.display = "block";
        spinnerElement.style.display = "none";
        line = line_formatter(line);
        outputElement.textContent += line + "\n";
    }
}

const run_model = () => {
    resultElement.style.display = "none";
    spinnerElement.style.display = "block";
    const text = document.getElementById("textInput").value;
    const cleanedText = "<|input|>\n" + text + "\n<|output|>\n";

    submitButton.style.display = "none";

    outputElement.textContent = "";

    app.run({
        prompt: cleanedText,
        max_token_len: 512,
        reverse_prompt: "<|endoftext|>"
    });
}


const run_complete = () => {
    submitButton.style.display = "block";
    submitButton.innerText = "Generate";
    submitButton.disabled = false;

    OUTPUT_FOUND = false;

    const converter = new showdown.Converter();
    const html = converter.makeHtml(outputElement.textContent);
    outputElement.innerHTML = html;
}

// Initialize the model
const app = new LLM(
    'LLAMA',
    MODEL_URL,
    on_loaded,
    write_result,
    run_complete,
);

app.load_worker();

// Event Listeners
submitButton.addEventListener("click", run_model);
