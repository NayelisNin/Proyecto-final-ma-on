// URL base de la API (Tus compañeros te darán esta dirección)
const API_URL = 'http://localhost:3000/api/libros';

const bookForm = document.getElementById('book-form');
const booksBody = document.getElementById('books-body');
const totalDisplay = document.getElementById('total-gastado');
const searchInput = document.getElementById('search');

let allBooks = []; // Variable para guardar los libros localmente

// 1. Función para obtener libros (GET)
async function fetchBooks() {
    try {
        // Por ahora usamos datos de prueba si la API no está lista
        // const response = await fetch(API_URL);
        // allBooks = await response.json();
        
        // DATOS DE PRUEBA (MOCK DATA)
        allBooks = [
            { id: 1, titulo: 'El Quijote', autor: 'Cervantes', precio: 20.00, fecha: '2024-01-15' },
            { id: 2, titulo: 'Hábitos Atómicos', autor: 'James Clear', precio: 15.50, fecha: '2024-02-10' }
        ];
        
        renderBooks(allBooks);
    } catch (error) {
        console.error("Error cargando libros:", error);
    }
}

// 2. Función para pintar los libros en la tabla
function renderBooks(books) {
    booksBody.innerHTML = '';
    let total = 0;

    books.forEach(book => {
        total += parseFloat(book.precio);
        const row = `
            <tr>
                <td>${book.titulo}</td>
                <td>${book.autor}</td>
                <td>$${parseFloat(book.precio).toFixed(2)}</td>
                <td>${book.fecha}</td>
                <td>
                    <button class="btn-delete" onclick="deleteBook(${book.id})">Eliminar</button>
                </td>
            </tr>
        `;
        booksBody.innerHTML += row;
    });

    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

// 3. Función para agregar un libro (POST)
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoLibro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        precio: document.getElementById('precio').value,
        fecha: document.getElementById('fecha').value
    };

    console.log("Enviando al backend:", nuevoLibro);
    // Aquí harías el fetch POST a la API de tus compañeros
    
    // Simulación: Lo agregamos al array local
    allBooks.push({...nuevoLibro, id: Date.now()});
    renderBooks(allBooks);
    bookForm.reset();
});

// 4. Buscador en tiempo real
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allBooks.filter(book => 
        book.titulo.toLowerCase().includes(term) || 
        book.autor.toLowerCase().includes(term)
    );
    renderBooks(filtered);
});

// Inicializar la carga
fetchBooks();