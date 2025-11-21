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
    <div>
      <h1>{isEditing ? "Editar Item" : "Crear Nuevo Item"}</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <div>
          <label>ID del Estudiante:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default Form;
