import 'regenerator-runtime/runtime';
import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => console.log(ui.showPosts(data)))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title: title,
    body,
    body,
  };

  http
    .post('http://localhost:3000/posts', data)
    .then(() => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();

      getPosts();
      //console.log(data); //data that was submitted to db.json
    })
    .catch((err) => console.log(err));
}

function deletePost(e) {
  e.preventDefault(e);

  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}
