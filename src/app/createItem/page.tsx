"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/createItem.css';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const router = useRouter(); // Inicializa o router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const newItem: Item = { name, description, amount, storageLocation };

    try {
      const response = await fetch('http://localhost:8080/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        // Se a resposta for bem-sucedida, redireciona para a lista de itens
        router.push('/');
      } else {
        console.error('Erro ao criar o item:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar o item:', error);
    }
  };

  return (
    <>
    <div className='back-button-container'>    
      <button onClick={() => router.back()} style={{ marginBottom: '20px' }}>
      Voltar
      </button>
    </div>

    <div className="create-item">

      <h2>Criar Novo Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Quantidade:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="storageLocation">Localização:</label>
          <input
            type="text"
            id="storageLocation"
            value={storageLocation}
            onChange={(e) => setStorageLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Item</button>
      </form>
    </div>
    </>
  );
};

export default CreateItem;
