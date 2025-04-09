const friends = [
  {
    name: "Сережа",
    comment: "Поболтаем?",
  },
  {
    name: "Петр",
    comment: "Давайте?",
  },
  {
    name: "Ольга",
    comment: "Ребята, как сходили в кино?",
  },
];

const listElements = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const addCommentButton = document.getElementById('add-comment-button');

function renderFriends() {
  let friendsHtml = '';

  friends.forEach((friend) => {
    friendsHtml += `<li class="friend">
        <p>${friend.name}</p>
        <div class="comments">
          <p class="comment">${friend.comment}</p>
        </div>
      </li>`;
  });

  listElements.innerHTML = friendsHtml;

}

renderFriends();

addCommentButton.addEventListener('click', () => {
  const name = nameInputElement.value.trim();
  const comment = commentInput.value.trim();

  if (name && comment) {
    friends.push({
      name: name,
      comment: comment,
    });
  
    renderFriends();
  
    nameInputElement.value = '';
    commentInput.value = '';
  } else {
    alert('Введите имя и комент');
  }
});