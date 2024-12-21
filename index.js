const usersCont = document.getElementById('users');
const postsCont = document.getElementById('posts');

const users = ['Irimin_a', 'user42980909', 'caitleen', 'user9856724', 'hoebojobo'];
const pfps = ['potential.png', 'empty.png', 'caitleen.png', 'empty.png', 'empty.png'];
const ids = [1, 2, 3];

ids.forEach((userId, idx) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      const userCard = `
        <div class="user-card">
          <img src="${pfps[idx]}" alt="${users[idx]}'s profile picture">
          <h3>${users[idx]}</h3>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>City:</strong> ${user.address.city}</p>
        </div>
      `;
      usersCont.innerHTML += userCard;
    });

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postCard = `
          <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <small><em>Uploaded by: ${users[idx]}</em></small>
          </div>
        `;
        postsCont.innerHTML += postCard;
      });
    });
});

const loadMoreBtn = document.getElementById('load-more');

let postPage = 1;
const postsPerPage = 5;

function loadPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${postPage}&_limit=${postsPerPage}`)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postCard = `
          <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>
        `;
        postsCont.innerHTML += postCard;
      });
      postPage++;
    })
    .catch(error => console.error('Error loading posts:', error));
}

loadPosts();

loadMoreBtn.addEventListener('click', loadPosts);

