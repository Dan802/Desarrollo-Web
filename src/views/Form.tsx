import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, doc, updateDoc, serverTimestamp, getDoc} from './../config/firebase'; 
import { useNavigate, useParams } from 'react-router-dom';

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [studentId, setStudentId] = useState<string>(''); 
  const [isEditing, setIsEditing] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();  

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchItem = async () => {
        try {
          const itemRef = doc(db, 'items', id);
          const itemDoc = await getDoc(itemRef);
          if (itemDoc.exists()) {
            const data = itemDoc.data();
            setTitle(data?.title || '');
            setDescription(data?.description || '');
            setStudentId(data?.studentId || '');
          }
        } catch (err) {
          console.error("Error al obtener el item:", err);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    setError(null);

    try {
      if (isEditing && id) {
        
        const itemRef = doc(db, 'items', id);
        await updateDoc(itemRef, {
          title,
          description,
          studentId,
          updatedAt: serverTimestamp(),
        });
      } else {
        
        const itemsCollection = collection(db, 'items');
        await addDoc(itemsCollection, {
          title,
          description,
          studentId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      navigate('/'); 
    } catch (err) {
      console.error("Error al guardar el item:", err);
      setError("Hubo un problema al guardar el item. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">{isEditing ? "Editar Item" : "Crear Nuevo Item"}</h1>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">ID del Estudiante:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            type="submit" 
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
