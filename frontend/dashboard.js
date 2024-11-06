// Função para buscar e exibir produtos
async function loadProducts() {
    const response = await fetch('http://localhost:3030/products');
    const data = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de inserir novos dados
  
    data.products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>R$ ${product.price}</td>
        <td>
          <button onclick="editProduct(${product.id})">Editar</button>
          <button onclick="deleteProduct(${product.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Função para adicionar um novo produto
  document.querySelector('.product-form form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const quantity = document.getElementById('product-quantity').value;
    const price = document.getElementById('product-price').value;
  
    await fetch('http://localhost:3030/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity, price })
    });
  
    document.querySelector('.product-form form').reset();
    loadProducts();
  });
  
  // Função para deletar um produto
  async function deleteProduct(id) {
    await fetch(`http://localhost:3030/products/${id}`, {
      method: 'DELETE'
    });
    loadProducts();
  }
  
  // Função para editar um produto
  async function editProduct(id) {
    const name = prompt("Novo nome do produto:");
    const quantity = prompt("Nova quantidade do produto:");
    const price = prompt("Novo preço do produto:");
  
    await fetch(`http://localhost:3030/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity, price })
    });
    loadProducts();
  }
  
  // Carregar produtos ao iniciar a página
  loadProducts();
  