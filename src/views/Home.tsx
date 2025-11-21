import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, deleteDoc, doc, query, orderBy } from './../config/firebase'; 
import { useNavigate } from 'react-router-dom'; 

interface Item {
  id: string;
  title: string;
  description?: string;
  createdAt: any; 
}

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, "items");
        const q = query(itemsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Item[];
        setItems(itemsList);
      } catch (error) {
        console.error("Error al obtener los datos de Firestore:", error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const itemRef = doc(db, "items", id);
      await deleteDoc(itemRef);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el item:", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`); 
  };

  const handleCreate = () => {
    navigate('/create'); 
  };

  return (
    <div>
      <h1>Lista de Items</h1>
      <button onClick={handleCreate}>Crear Nuevo Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
            <button onClick={() => handleEdit(item.id)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
