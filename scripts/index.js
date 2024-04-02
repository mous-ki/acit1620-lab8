function populateSelectionOptions(users) {
    const options = document.querySelector('select');
    for (let user of users) {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      options.appendChild(option);
    }
}

function displayPosts(posts, user) {
  /**
   * Display posts for a particular user
   * Add a heading in the form of 'User name's posts'
   * Add a list of posts
   */
  const heading = document.createElement('h2');
  const list = document.createElement('ul');
  const container = document.querySelector('.posts');

  if (!user) {
    heading.textContent = 'My posts';
  } else {
    heading.textContent = `${user}'s posts`;
  }
  
  container.appendChild(heading);
  container.appendChild(list);

  for (let post of posts) {
    const postContainer = document.createElement('li');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    title.textContent = post.title;
    body.textContent = post.body;

    postContainer.append(title, body);
    list.appendChild(postContainer);
  }
}

function displayOwnPosts() {
  /**
   * Display my own posts
   * Get the list of posts from local storage
   * Call displayPosts()
   */
  if (!localStorage.getItem('posts')) return;

  const posts = JSON.parse(localStorage.getItem('posts'));
  displayPosts(posts);
}

document.querySelector('select').addEventListener('change', (e) => {
  document.querySelector('.posts').innerHTML = '';
  if (e.target.value === '') return;

  if (e.target.value === '0') {
      displayOwnPosts();
      return;
  }
  const options = e.target.options;
  const idx = e.target.selectedIndex;
  const id = options[idx].value;
  const name = options[idx].textContent;
  getPosts({id, name});
});

window.addEventListener('storage', () => {
  const select = document.querySelector('select');
  const event = new Event('change');
  select.value = '0';
  select.dispatchEvent(event);
});


/** COMPLETE THIS PART */

async function getUsers() {
  /**
   * Fetch the list of users from jsonplaceholder
   * If request successful, populate the select
   * element options with the returned data.
   * 
   */
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    
    const users = await response.json();
    
    const selectElement = document.getElementById('user'); 
    
    selectElement.innerHTML = '';
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        selectElement.appendChild(option);
    });
    
    console.log('Users fetched and options populated successfully.');
} catch (error) {
    console.error('Error fetching users:', error);
}
}



async function getPosts(user) {
/**
 * Fetch posts belonging to this user
 * If request successful, display the posts
 */
try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`);
  
  if (!response.ok) {
      throw new Error('Failed to fetch posts');
  }
  
  const posts = await response.json();
  
  displayPosts(posts);
  
  console.log('Posts fetched and displayed successfully.');
} catch (error) {
  console.error('Error fetching posts:', error);
}
}

function displayPosts(posts) {
const postsContainer = document.getElementById('postsContainer');

postsContainer.innerHTML = '';

posts.forEach(post => {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
  `;
  postsContainer.appendChild(postElement);
});
} 

getUsers();

  



  
