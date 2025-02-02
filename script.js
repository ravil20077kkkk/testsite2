const users = JSON.parse(localStorage.getItem('users')) || [];

function register() {
    const username = document.getElementById('reg-username').value;
    if (username && !users.find(user => user.username === username)) {
        const newUser = {
            username: username,
            currency: 10000,
            registrationDate: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Регистрация успешна!');
        updateUserList();
    } else {
        alert('Никнейм уже занят или пуст!');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const user = users.find(user => user.username === username);
    if (user) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('welcome-message').innerText = `Добро пожаловать, ${user.username}!`;
        document.getElementById('currency').innerText = user.currency;
        updateUserList();
    } else {
        alert('Пользователь не найден!');
    }
}

function logout() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
}

function transfer() {
    const recipientUsername = document.getElementById('transfer-username').value;
    const amount = parseInt(document.getElementById('transfer-amount').value);
    const senderUsername = users.find(user => user.username === document.getElementById('welcome-message').innerText.split(', ')[1]);
    
    const recipient = users.find(user => user.username === recipientUsername);
    if (recipient && senderUsername.currency >= amount && amount > 0) {
        senderUsername.currency -= amount;
        recipient.currency += amount;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Перевод успешен!');
        document.getElementById('currency').innerText = senderUsername.currency;
    } else {
        alert('Ошибка перевода!');
    }
}

function updateUserList() {
    const list = document.getElementById('user-list');
    list.innerHTML = '';
    users.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)).forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${index + 1}. <a href="#" onclick="viewProfile('${user.username}')">${user.username}</a>`;
        list.appendChild(li);
    });
}

function viewProfile(username) {
    const user = users.find(user => user.username === username);
    alert(`Профиль пользователя:\nНикнейм: ${user.username}\nВиртуальная валюта: ${user.currency}`);
}
