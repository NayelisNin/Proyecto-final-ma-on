const API_URL = 'http://localhost:3000/api/libros';

const bookForm = document.getElementById('book-form');
const booksBody = document.getElementById('books-body');
const totalDisplay = document.getElementById('total-gastado');
const searchInput = document.getElementById('search');

let allBooks = [];

// GET
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Error en API");

        allBooks = await response.json();
        renderBooks(allBooks);

    } catch (error) {
        console.error("Error cargando libros:", error);
    }
}

// RENDER
function renderBooks(books) {
    booksBody.innerHTML = '';
    let total = 0;

    books.forEach(book => {
        total += parseFloat(book.precio);

     booksBody.innerHTML += `
        <tr>
            <td>${book.titulo}</td>
            <td>${book.autor}</td>
            <td>$${parseFloat(book.precio).toFixed(2)}</td>
            <td>${book.fecha}</td>
            <td>
            <button class="btn-edit" onclick="editBook(${book.id})">Editar</button>
            <button class="btn-delete" onclick="deleteBook(${book.id})">Eliminar</button>
            </td>
        </tr>
    `;
    });

    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

// DELETE
async function deleteBook(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        fetchBooks();
    } catch (error) {
        console.error(error);
    }
}

// EDIT
async function editBook(id) {

    const titulo = prompt("Nuevo título:");
    const autor = prompt("Nuevo autor:");
    const precio = prompt("Nuevo precio:");
    const fecha = prompt("Nueva fecha:");

    if (!titulo || !autor || !precio || !fecha) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                autor,
                precio: parseFloat(precio),
                fecha
            })
        });

        fetchBooks();
    } catch (error) {
        console.error(error);
    }
}

// POST
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoLibro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        precio: parseFloat(document.getElementById('precio').value),
        fecha: document.getElementById('fecha').value,
        stock: Math.floor(Math.random() * 26) + 1
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoLibro)
        });

        if (!res.ok) throw new Error("Error al guardar");

        fetchBooks();
        bookForm.reset();

    } catch (error) {
        console.error(error);
    }
});

// SEARCH
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = allBooks.filter(book =>
        book.titulo.toLowerCase().includes(term) ||
        book.autor.toLowerCase().includes(term)
    );

    renderBooks(filtered);
});

// INIT
fetchBooks();