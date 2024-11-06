const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const response = await fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.success) {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html";
      } else {
        alert("Usuário ou senha incorretos!");
      }
});