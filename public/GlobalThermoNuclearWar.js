// Define the cities and populations for both sides
const US_cities = [
    {name: "DC", population: 670_000},
    {name: "New York City", population: 8_800_000},
    {name: "LA", population: 3_990_456},
    {name: "Chicago", population: 2_700_000},
    {name: "Austin", population: 970_000},
    {name: "Seattle", population: 740_000},
    {name: "Boston", population: 680_000},
    {name: "Portland", population: 650_000},
    {name: "Denver", population: 720_000},
    {name: "San Francisco", population: 870_000},
    {name: "Miami", population: 440_000},
    {name: "New Orleans", population: 380_000},
    {name: "Dallas", population: 1_300_000},
    {name: "Nashville", population: 720_000},
    {name: "Houston", population: 2_300_000},
    {name: "San Diego", population: 1_400_000},
    {name: "Atlanta", population: 500_000},
    {name: "Tampa", population: 380_000},
    {name: "Minneapolis", population: 430_000},
    {name: "Philadelphia", population: 1_600_000}
];

const Russia_cities = [
    {name: "Moscow", population: 13_000_000},
    {name: "Saint Petersburg", population: 5_600_000},
    {name: "Irkutsk", population: 590_000},
    {name: "Samara", population: 1_200_000},
    {name: "Kazan", population: 1_100_000},
    {name: "Belgorod", population: 360_000},
    {name: "Penza", population: 520_000},
    {name: "Vladivostok", population: 590_000},
    {name: "Kirov", population: 510_000},
    {name: "Stavropol", population: 400_000},
    {name: "Omsk", population: 1_200_000},
    {name: "Novosibirsk", population: 1_600_000},
    {name: "Nizhny Novgorod", population: 1_300_000},
    {name: "Sochi", population: 340_000},
    {name: "Kursk", population: 380_000},
    {name: "Murmansk", population: 310_000},
    {name: "Kaliningrad", population: 430_000},
    {name: "Krasnoyarsk", population: 1_200_000},
    {name: "Rostov-on-Don", population: 1_100_000},
    {name: "Chelyabinsk", population: 1_100_000},
    {name: "Perm", population: 990_000},
];

let US_Casualties = 0;
let Russia_Casualties = 0;

const totalTurns = Math.floor(Math.random() * 11) + 5; // Random number between 5 and 15
let currentTurn = 0;
let playerSide = ''; // 'US' or 'Russia'

// Enemy chooses randomly
function randomlyChoose() {
    return Math.random() < 0.5 ? "Revolt" : "Cooperate";
}

function calculateCasualties(city) {
    let damageMultiplier = Math.random() * 0.5 + 0.5; // Between 0.5 and 1
    let deaths = Math.floor(city.population * damageMultiplier);
    city.population -= deaths;
    return deaths;
}

function attackCity(cities) {
    let randomIndex = Math.floor(Math.random() * cities.length);
    let city = cities[randomIndex];
    let casualties = calculateCasualties(city);
    cities.splice(randomIndex, 1); // Remove the attacked city from the array
    return { city, casualties };
}

function playRound(playerChoice) {
    // Increment the current turn
    currentTurn++;

    // Enemy randomly chooses
    const enemyChoice = randomlyChoose();

    printToTerminal(`Turn ${currentTurn}: You chose to ${playerChoice}. The enemy chose to ${enemyChoice}.`);

    let playerCities, enemyCities, playerCasualties, enemyCasualties;

    if (playerSide === 'US') {
        playerCities = US_cities;
        enemyCities = Russia_cities;
        playerCasualties = US_Casualties;
        enemyCasualties = Russia_Casualties;
    } else {
        playerCities = Russia_cities;
        enemyCities = US_cities;
        playerCasualties = Russia_Casualties;
        enemyCasualties = US_Casualties;
    }

    // If both players revolt, both attack
    if (playerChoice === 'revolt' && enemyChoice === 'revolt') {
        const enemyAttack = attackCity(enemyCities);
        const playerAttack = attackCity(playerCities);
        printToTerminal(`You attacked ${playerAttack.city.name}, causing ${playerAttack.casualties} casualties.`);
        printToTerminal(`The enemy attacked ${enemyAttack.city.name}, causing ${enemyAttack.casualties} casualties.`);
        playerCasualties += playerAttack.casualties;
        enemyCasualties += enemyAttack.casualties;
    }
    // If only the player revolts, they attack
    else if (playerChoice === 'revolt' && enemyChoice === 'cooperate') {
        const enemyAttack = attackCity(enemyCities);
        printToTerminal(`You attacked ${enemyAttack.city.name}, causing ${enemyAttack.casualties} casualties.`);
        playerCasualties += enemyAttack.casualties;
        printToTerminal("The enemy chose to cooperate.");
    }
    // If only the enemy revolts, they attack
    else if (playerChoice === 'cooperate' && enemyChoice === 'revolt') {
        const playerAttack = attackCity(playerCities);
        printToTerminal(`The enemy attacked ${playerAttack.city.name}, causing ${playerAttack.casualties} casualties.`);
        enemyCasualties += playerAttack.casualties;
        printToTerminal("You chose to cooperate.");
    }
    // If both cooperate, nothing happens
    else {
        printToTerminal("Both you and the enemy cooperated. No attacks this round.");
    }

    // Display the current state
    printToTerminal(`Current casualties: ${playerSide} - ${playerCasualties}, Enemy - ${enemyCasualties}`);

    // Check if either side has no cities left or if the turn limit is reached
    if (playerCities.length === 0 || enemyCities.length === 0 || currentTurn === totalTurns) {
        printToTerminal("The game is over!");
        printToTerminal(`Total ${playerSide} casualties: ${playerCasualties}`);
        printToTerminal(`Total Enemy casualties: ${enemyCasualties}`);
    } else {
        printToTerminal(`Remaining ${playerSide} cities: ${playerCities.map(city => city.name).join(', ')}`);
        printToTerminal(`Remaining Enemy cities: ${enemyCities.map(city => city.name).join(', ')}`);
    }
}

// Start the game by choosing a side
function startGame(playerNation) {
    // Reset casualties and set initial game state
    US_Casualties = 0;
    RU_Casualties = 0;
    currentTurn = 0;

    // Determine player and enemy cities based on chosen nation
    let playerCities, enemyCities;
    if (playerNation === 'US') {
        playerCities = US_cities;
        enemyCities = RU_cities;
    } else {
        playerCities = RU_cities;
        enemyCities = US_cities;
    }

	printToTerminal('Type "revolt" to attack or "cooperate" to hold back.');

    // Start the game loop
    while (currentTurn < totalTurns && playerCities.length > 0 && enemyCities.length > 0) {
        
        // This function needs to be called from `terminal.js` to handle the input
        // Use a way to pause and wait for input here if needed

        // Assuming `handleCommand` will call this function with the player input
        function handleGameInput(input) {
            // Call the playRound function with the player's choice
            playRound(input);
        }
    }
}

