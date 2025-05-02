const listItems = document.getElementById('list');

const items = ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4', 'Пункт 5',];

const htmlContent = items.map((item) => `<li>${item}</li>`).join('');

listItems.innerHTML = htmlContent;