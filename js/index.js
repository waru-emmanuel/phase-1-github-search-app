// My code
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
         form.addEventListener('submit', async (event) => {
           event.preventDefault(); // Prevent form submission
            const searchQuery = searchInput.value.trim(); // Get search query from input
  
         // Clear previous search results
           userList.innerHTML = '';
           reposList.innerHTML = '';
  
           if (searchQuery) {
              try {
               // Fetch user data from GitHub API
               const userDataResponse = await fetch(`https://api.github.com/users/${searchQuery}`);
               const userData = await userDataResponse.json();
  
                // Fetch user's repositories from GitHub API
                 const reposDataResponse = await fetch(userData.repos_url);
                  const reposData = await reposDataResponse.json();
  
                //  user data is displayed
                 const userItem = document.createElement('li');
                 userItem.textContent = `Username: ${userData.login}, Name: ${userData.name}`;
                 userList.appendChild(userItem);
  
              // Display user's repositories
                reposData.forEach(repo => {
                const repoItem = document.createElement('li');
                repoItem.textContent = `Repository: ${repo.name}`;
                reposList.appendChild(repoItem);
            });
          }    catch (error) {
              console.error('Error fetching data:', error);
              // Display error message to user
              userList.innerHTML = `<li>Error: ${error.message}</li>`;
         }
        }      else {
            // Display message to user if search query is empty- that if the user has not entered any 
             userList.innerHTML = '<li>Please enter a search query</li>';
            }
    });
  });
  