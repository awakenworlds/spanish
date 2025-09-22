// Function to fetch and display data
async function fetchAndDisplayUsers() {
    try {
        // Fetch the data.json file
        const response = await fetch('data.json');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data
        const users = await response.json();
        
        // Get the list element from the HTML
        const userList = document.getElementById('user-list');
        
        // Loop through the users and create list items
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${user.name}, Age: ${user.age}, City: ${user.city}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        // Log any errors that occur
        console.error('Could not fetch the user data:', error);
    }
}

// Call the function when the script loads
fetchAndDisplayUsers();