// write you code here
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
                const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
                const data = await response.json();

                // Display user information
                data.items.forEach(user => {
                    const userItem = document.createElement('li');
                    const userProfileLink = document.createElement('a');
                    userProfileLink.href = user.html_url;
                    userProfileLink.textContent = user.login;
                    userProfileLink.addEventListener('click', async (event) => {
                        event.preventDefault(); // Prevent default link behavior
                        try {
                            // Fetching the repositories for the selected user
                            const reposResponse = await fetch(user.repos_url);
                            const reposData = await reposResponse.json();

                            // Display of the repositories for the selected user
                            reposList.innerHTML = '';
                            reposData.forEach(repo => {
                                const repoItem = document.createElement('li');
                                repoItem.textContent = repo.name;
                                reposList.appendChild(repoItem);
                            });
                        } catch (error) {
                            console.error('Error fetching repositories:', error);
                            // Display error message to user
                            reposList.innerHTML = `<li>Error: ${error.message}</li>`;
                        }
                    });

                    const userAvatar = document.createElement('img');
                    userAvatar.src = user.avatar_url;
                    userAvatar.alt = `${user.login}'s Avatar`;
                    userAvatar.classList.add('avatar');

                    userItem.appendChild(userAvatar);
                    userItem.appendChild(userProfileLink);
                    userList.appendChild(userItem);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                // Display error message to user
                userList.innerHTML = `<li>Error: ${error.message}</li>`;
            }
        } else {
            // Display message to user if search query is empty
            userList.innerHTML = '<li>Please enter a search query</li>';
        }
    });
});
