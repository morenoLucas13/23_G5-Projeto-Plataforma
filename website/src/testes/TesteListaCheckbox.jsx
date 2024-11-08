import React, { useState } from 'react';

export default function TesteListaCheckbox() {
  // Lista de itens
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  // Estado para armazenar os itens selecionados
  const [selectedItems, setSelectedItems] = useState([]);

  // Função para lidar com o evento de checkbox
  const handleCheckboxChange = (event) => {
    const item = event.target.value;

    setSelectedItems((prevSelectedItems) => {
      // Se o item já está selecionado, removemos da lista
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        // Caso contrário, adicionamos à lista
        return [...prevSelectedItems, item];
      }
    });
  };

  // Função para mostrar os itens selecionados
  const handleSubmit = () => {
    alert('Itens selecionados: ' + selectedItems.join(', '));
  };

  return (
    <div>
      <h3>Escolha os itens:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={item}
                onChange={handleCheckboxChange}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Mostrar Itens Selecionados</button>
    </div>
  );
};