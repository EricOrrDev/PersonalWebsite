const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const prompt = 'guest@EricOrr.com: >> ';

// Messages
const welcomeMessage = `
Welcome to my website!

Type 'help' to see available commands.
`;

const helpText = `Available commands:<br>help<br>clear<br>nav<br>about`;
const navText = `Navigation: [P]rojects, [C]ontact, [R]esume`;

// Function to print text to the terminal
function printToTerminal(text) {
    terminalOutput.innerHTML += '<br>' + text;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Function to clear the terminal
function clearTerminal() {
    terminalOutput.innerHTML = '';
}

// Command-specific functions
function showProjects() {
    const projectsString = `
Increment MText     : <a href="https://github.com/EricOrrDev/Increment-Mtext">Increment MText</a>
    <i>A script for AutoCAD to increment text like MicroStation.</i>
Resume API  : <a href="https://github.com/EricOrrDev/ResumeProject">Resume API</a>
    <i>A C++ API endpoint that delivers my resume.</i>
WARGAMES            : <a href="https://github.com/EricOrrDev/WARGAMES">WARGAMES</a>
    <i>The classic prisoner's dilemma game written in C.</i>
Terminal Portfolio  : <a href="https://github.com/EricOrrDev/Terminal-Website">Terminal</a>
    <i>This very website!</i>
    `;
    printToTerminal(projectsString);
}

function showContact() {
    const contactString = 'Eric Orr 503-983-3289 eric.orr.dev@gmail.com';
    printToTerminal(contactString);
}

function showResume() {
    const resumeString = `
Summary:
A computer science student looking for people to solve their problems.

Work Experience:
Prep Cook, Filberts Farmhouse Kitchen
`;
    printToTerminal(resumeString);
}

// Function to handle commands
function handleCommand(input) {
    console.log('Received command:', input); // Debugging the received command
    switch (input.toLowerCase()) {
        case 'help':
        case 'h':
            printToTerminal(helpText);
            break;
        case 'nav':
        case 'navigation':
            printToTerminal(navText);
            break;
        case 'about':
            printToTerminal('I am a C# backend developer specializing in generative design.');
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'projects':
        case 'p':
            showProjects();
            break;
        case 'contact':
        case 'c':
            showContact();
            break;
        case 'resume':
        case 'r':
            showResume();
            break;
        default:
            printToTerminal(`Unknown command: ${input}`);
    }
}

// Handle user input
let currentInput = ''; // Store the current typed input

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action

        // Handle Enter key: process the command
        const command = currentInput.trim(); // Get the command and trim spaces
        console.log('Command extracted:', command); // Debugging extracted command

        // Handle the command and output the result
        handleCommand(command);

        // Clear the input for the next command
        currentInput = '';

        // Print a new prompt after the output (this prompt is for the next input)
        printToTerminal(prompt);
    } else if (event.key === 'Backspace') {
        // Handle Backspace: remove the last character from current input
        currentInput = currentInput.slice(0, -1);
        // Update the terminal output (replace the last line with updated input)
        const lines = terminalOutput.innerHTML.split('<br>');
        lines[lines.length - 1] = prompt + currentInput; // Update the last line with the current input
        terminalOutput.innerHTML = lines.join('<br>');
    } else if (event.key.length === 1) {
        // Handle regular character input
        currentInput += event.key; // Add the character to the current input
        // Update the terminal output (replace the last line with updated input)
        const lines = terminalOutput.innerHTML.split('<br>');
        lines[lines.length - 1] = prompt + currentInput; // Update the last line with the current input
        terminalOutput.innerHTML = lines.join('<br>');
    }

    // Scroll to the bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
});

// Initialize the terminal with the welcome message and first prompt
printToTerminal(welcomeMessage + '<br>' + prompt);
terminalInput.focus(); // Ensure the hidden input is focused for typing
