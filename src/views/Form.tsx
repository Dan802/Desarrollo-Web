import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from './firebase';
import { useHistory } from 'react-router-dom';

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title) {
      try {
        const itemsCollection = collection(db, "items");
        await addDoc(itemsCollection, {
          title,
          description,
          createdAt: serverTimestamp(),
        });
        history.push('/'); // Redirige al Home
      } catch (error) {
        console.error("Error al agregar el item:", error);
      }
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Crear Item</button>
      </form>
    </div>
  );
};

export default Form;
