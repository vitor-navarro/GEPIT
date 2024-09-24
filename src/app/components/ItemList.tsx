"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importando useRouter
import "../styles/itemList.css"

export default function ItemList() {
  const router = useRouter(); // Inicializando o router
  const [items, setItems] = useState<Item[]>([]); // Definindo o estado com o tipo Item[]

  useEffect(() => {
    // Chamada à API para pegar os itens
    fetch('http://localhost:8080/inventory/') // Ajuste conforme sua rota do backend
      .then(res => res.json())
      .then(data => 
        setItems(data)
      );
  }, []);

  const handleEdit = (id: number) => {
    // Lógica para editar o item
    router.push('/editItem');
  };

  const handleRemove = (id: number) => {
    // Lógica para remover o item
    console.log(`Remove item with id: ${id}`);
  };

  const handleAddItem = () => {
    // Redireciona para a página de criação de novo item
    router.push('/createItem');
  };

  return (
    <div className="item-list">
      <div className="header-container">
        <h2>Lista de Itens de TI</h2>
        <button onClick={handleAddItem}>Adicionar Item</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Localização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item) => ( // Renderizando os itens
            <tr key={item.id}>
              <td>
                <a href={`/items/${item.id}`}>{item.name}</a>
              </td>
              <td>{String(item.amount)}</td>
              <td>{item.storageLocation}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Editar</button>
                <button onClick={() => handleRemove(item.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
