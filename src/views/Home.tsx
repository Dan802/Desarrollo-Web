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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Items</h1>
      <button
        onClick={handleCreate}
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6"
      >
        Crear Nuevo Item
      </button>

      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            {item.description && <p className="mt-2 text-gray-700">{item.description}</p>}
            <div className="mt-4 space-x-4">
              <button
                onClick={() => handleEdit(item.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
