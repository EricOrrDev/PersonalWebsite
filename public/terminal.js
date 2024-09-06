const terminalInput = document.getElementById('terminalInput');
const prompt = 'guest@EricOrr.com: >> ';

// Messages
const welcomeMessage = `
Welcome to my website!

Type 'help' to see available commands.
`;

const helpText = `Available commands:\nhelp\nclear\nnav\nabout`;
const navText = `Navigation: [P]rojects, [C]ontact, [R]esume`;

// Function to print text to the terminal
function printToTerminal(text) {
    terminalInput.value +='\n' + text + '\n';
    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
    terminalInput.scrollTop = terminalInput.scrollHeight;
}

// Function to clear the terminal
function clearTerminal() {
    terminalInput.value = '';
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
        default:
            printToTerminal(`Unknown command: ${input}`);
    }
}

// Handle user input
terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action

        // Get all lines in the textarea
        const lines = terminalInput.value.split('\n');
        // Get the last line (where the user typed the command)
        const lastLine = lines[lines.length - 1];
        // Extract the command by removing the prompt from the last line and trim any extra spaces
        const command = lastLine.slice(prompt.length).trim();

        console.log('Command extracted:', command); // Debugging extracted command
        handleCommand(command); // Handle the extracted and trimmed command

        // Add a new prompt without moving the cursor to a new line
        terminalInput.value += prompt;
        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length; // Ensure cursor is at the end of the prompt

        // Scroll to the bottom
        terminalInput.scrollTop = terminalInput.scrollHeight;
    }
});

function showProjects(){
    const projectsString = `
    Increment MText     : https://github.com/EricOrrDev/Increment-Mtext
    Resume API in C++   : https://github.com/EricOrrDev/ResumeProject
    Terminal Portfolio  : stand in
    `
    printToTerminal(projectsString);
}
function showContact(){
    const contactString = 'Eric Orr 503-983-3289 eric.orr.dev@gmail.com'
    printToTerminal(contactString);
    
}
function showResume(){
    const resumeString = `
    
    `
}

// Initialize the terminal with the welcome message, and ensure the cursor is at the end of the prompt
printToTerminal(welcomeMessage); // Print the welcome message without adding prompt here
terminalInput.value += prompt; // Manually add the prompt
terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length; // Ensure the cursor is placed at the end
terminalInput.scrollTop = terminalInput.scrollHeight; // Scroll to the bottom
