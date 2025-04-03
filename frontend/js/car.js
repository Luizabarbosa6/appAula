
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para o URL correto da sua API
    const carModal = document.getElementById('carModal');
    const carForm = document.getElementById('carForm');
    const addCarBtn = document.getElementById('addCar');
    const modalTitleCar = document.getElementById('modalTitleCar');
    let editCarId = null; 

   
    const loadCars = async () => { 
        const response = await fetch(`${apiUrl}/car`); 
        const cars = await response.json(); 
        const tableBody = document.querySelector('#CarTable tbody'); 
        tableBody.innerHTML = '';

   cars.forEach(car => { 
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.nameCar}</td> 
                <td>${car.marca}</td> 
                <td>${car.ano}</td> 
                <td>${car.placa}</td> 
                <td>${car.responsible ? car.responsible.name : 'N/A'}</td>
                <td>
                    <button class="editCarBtn" data-id="${car._id}">Editar</button> <!-- Antes: editPlantationBtn -->
                    <button class="deleteCarBtn" data-id="${car._id}">Deletar</button> <!-- Antes: deletePlantationBtn -->
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editCarBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditCarModal(e.target.dataset.id));
        });
      
        document.querySelectorAll('.deleteCarBtn').forEach(button => { 
            button.addEventListener('click', (e) => deleteCar(e.target.dataset.id));
        });
    };

    const addCar = async (car) => { 
        await fetch(`${apiUrl}/car/`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        });
        loadCars(); 
    };


    const updateCar = async (id, car) => { 
        await fetch(`${apiUrl}/car/${id}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car) 
        });
        loadCars(); 
    };

  
    const deleteCar = async (id) => { 
        await fetch(`${apiUrl}/car/${id}`, { 
            method: 'DELETE'
        });
        loadCars(); 
    };

  
    const openEditCarModal = async (id) => { 
        editCarId = id; 
        modalTitleCar.innerText = 'Editar Carro'; 

        
        const response = await fetch(`${apiUrl}/car/${id}`);
        if (response.status === 404) {
            console.error('Carro não encontrado');
            return;
        }
        const car = await response.json(); 

        document.getElementById('nameCar').value = car.nameCar; 
        document.getElementById('marca').value = car.marca;
        document.getElementById('ano').value = car.ano;
        document.getElementById('placa').value = car.placa;
        await loadUsers(car.responsible ? car.responsible._id : null);
       
        carModal.style.display = 'block'; 
    };

    const openAddCarModal = async () => { 
        editCarId = null; 
        modalTitleCar.innerText = 'Adicionar Carro'; 
        carForm.reset(); 
        await loadUsers(); 
        carModal.style.display = 'block'; 
    };

    const loadUsers = async (selectedUserId = null) => {
        const response = await fetch(`${apiUrl}/users`);
        const users = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = '';

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user._id;
            option.text = user.name;
            if (user._id === selectedUserId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    document.querySelector('.close').addEventListener('click', () => {
        carModal.style.display = 'none'; 
    });


    window.addEventListener('click', (event) => {
        if (event.target === carModal) { 
            carModal.style.display = 'none';
        }
    });

  
    carForm.addEventListener('submit', async (e) => { 
        e.preventDefault();
        const carData = { 
            nameCar: document.getElementById('nameCar').value,
            marca: document.getElementById('marca').value,
            ano: document.getElementById('ano').value,
            placa: document.getElementById('placa').value,
            responsible: document.getElementById('responsible').value
        };

        if (editCarId) { 
            await updateCar(editCarId, carData); 
        } else {
            await addCar(carData); 
        }

        carModal.style.display = 'none'; 
        loadCars(); 
    });

 
    addCarBtn.addEventListener('click', openAddCarModal); 
    loadCars(); 
});
