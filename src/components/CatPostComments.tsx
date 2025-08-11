import { useEffect, useState, type FormEvent } from "react";
import type { MessageFormData, PostComment, PostCommentFormData, PostFullData, UserData } from "../types/types";
import { capitalize, formatDate } from "../utils/utils";
import { toast } from "react-toastify";
import { addCommentToCatPost } from "../api/comment";
import anonCat from '../assets/anoncat.png';
import ReactModal from "react-modal";
import { sendMessage } from "../api/message";

interface CatPostCommentsProps {
  postData: PostFullData;
  commentData: PostComment[];
  setCommentData: React.Dispatch<React.SetStateAction<PostComment[]>>;
}

const CatPostComments = ({ postData, commentData, setCommentData }: CatPostCommentsProps) => {


  //Estado para visualicación del modal con el formulario de mensajes
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  //Estado para el formulario de mensaje
  const [messageFormData, setMessageFormData] = useState<MessageFormData>({
    toUserId: '',
    fromUserId: '',
    text: ''
  })

  //Estado para mostrar o ocultar comentarios
  const [isHidden, setIsHidden] = useState<boolean>(true);
  //Estado para creación de comentario
  const [commentFormData, setCommentFormData] = useState<PostCommentFormData>({ text: '' });

  const [avatar, setAvatar] = useState<string>(''); //Estado para el avatar
  const [idUserLogged, setIdUserLogged] = useState<string>(''); //Estado del usuario logueado

  //useEffect para obtener la imagen de localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem('userData');
      const userData = JSON.parse(data!) as UserData;
      setAvatar(userData.avatarUrl);
      setIdUserLogged(userData.userId);
    } catch (error) {
      toast.error('No se logró obtener Avatar', { theme: "colored", autoClose: 3000 });
    }

  }, [])



  // --- Lógica para determinar los colores de la tarjeta y etiquetas ---
  let typeTagBgClass = '';
  let textTagColor = '';

  if (postData.typeOfPublication === 'adopción') {

    typeTagBgClass = 'bg-emerald-400';
    textTagColor = 'text-white'
  } else if (postData.typeOfPublication === 'encontrado') {

    typeTagBgClass = 'bg-yellow-400';
    textTagColor = 'text-gray-800'
  } else if (postData.typeOfPublication === 'perdido') {

    typeTagBgClass = 'bg-rose-400';
    textTagColor = 'text-white'
  }

  const handleHidden = () => {
    setIsHidden(!isHidden);
  }

  const openFormModal = () => {
    setMessageFormData({
      ...messageFormData,
      toUserId: postData.userId._id,
      fromUserId: idUserLogged
    });
    setIsFormModalOpen(true);
  }
  const closeFormModal = () => setIsFormModalOpen(false);

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await sendMessage(messageFormData);
      if (response.status === 'success') {
        toast.success('Mansaje enviado', { theme: "colored", autoClose: 3000 });
      }else {
        // En caso de que el API responda con un estado de error, pero sin lanzar una excepción.
        toast.error('No se logró enviar el mensaje', { theme: "colored", autoClose: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error('No se logró mandar el mensaje', { theme: "colored", autoClose: 3000 });
    } finally {
      setMessageFormData({
        toUserId: '',
        fromUserId: '',
        text: ''
      })
      closeFormModal();
    }

  };

  const handletSubmit = async () => {

    if (!commentFormData.text || commentFormData.text.trim() === '') {
      return toast.error('Debe ingresar un comentario primero', { theme: "colored", autoClose: 3000 });
    }

    try {
      console.log(commentFormData)
      const response = await addCommentToCatPost(commentFormData, postData._id);
      if (response.status === 'success') {
        console.log(response.comment);
        setCommentData(prev => [response.comment, ...prev]);
        toast.success('Comentario publicado', { theme: "colored", autoClose: 3000 });
        setCommentFormData({ ...commentFormData, text: '' });

      } else {
        toast.error('No se logró agregar tu comentario', { theme: "colored", autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al crear el comenario', { theme: "colored", autoClose: 3000 });
    }
  }
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <img className="w-full h-96 object-cover" src={postData.photoUrl} alt={`Imagen del ${postData.catName}`} />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${typeTagBgClass} ${textTagColor}`}>
            {capitalize(postData.typeOfPublication)}
          </span>

          <div className="flex items-center flex-wrap gap-1 text-sm text-gray-600">
            <span>Publicado: {formatDate(postData.date)} por</span>
            <span className="bg-blue-500 text-white px-3 py-1 font-semibold rounded-full">
              {postData.userId.username}
            </span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {postData.catName}
        </h2>
        <p className="text-gray-700 mb-4">
          {postData.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
          <div><strong className="font-semibold">Género:</strong> {postData.gender}</div>
          <div><strong className="font-semibold">Edad:</strong> {postData.age}</div>
          <div><strong className="font-semibold">Raza:</strong> {postData.breed}</div>
          <div><strong className="font-semibold">Ubicación:</strong> {postData.location.province}, {postData.location.city}</div>
        </div>
        <button
          onClick={openFormModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.036 8-9 8a9.863 9.863 0 01-3-6 9.76 9.76 0 014.225-3.45 11.989 11.989 0 003.215 5.755c0 1.682-3.462 4.8-9 4.8-5.538 0-9-3.318-9-8s4.036-8 9-8a8.584 8.584 0 014.7-1.5c.316-.03.631-.05.946-.07M3 20l13.926-7.857a2.1 2.1 0 012.148-.098l.148.027H21v-2.356a2.1 2.1 0 01-1.286-1.972l-4.915-2.457a2.1 2.1 0 01-.966-.128L3 4"></path></svg>
          Contactar al Dueño
        </button>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <button
            onClick={handleHidden}
            id="toggleComments" className="w-full py-2 px-4 rounded-md bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition duration-300 text-center">
            Mostrar Comentarios ({commentData.length})
          </button>

          <div id="commentsSection" className={`comment-section mt-4 space-y-4 ${isHidden ? 'hidden' : ''}`} >
            {commentData.length > 0
              ? commentData.map(comment =>
                <div key={comment._id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8 rounded-full object-cover" src={comment.userId.avatarUrl || anonCat} alt="Avatar de Usuario 1" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-800">{comment.userId.username}</h4>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                </div>)
              : null
            }



          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Dejar un Comentario</h3>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full object-cover" src={avatar ? avatar : anonCat} alt="Tu Avatar" />
              </div>
              <div className="flex-1">
                <textarea
                  name="text"
                  value={commentFormData.text}
                  onChange={(e) => setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  rows={3}
                  placeholder="Escribe tu comentario aquí..."
                ></textarea>
                <button
                  onClick={handletSubmit}
                  className="mt-2 py-2 px-4 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-300 text-sm">
                  Publicar Comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isFormModalOpen}
        onRequestClose={closeFormModal}
        contentLabel="Confirmar Eliminación"
        className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Enviar Mensaje a  <span className="text-orange-600">{postData.userId.username}</span>
            </h2>
            <p className="text-gray-600">
              Escribe tu mensaje para el creador de la publicación.
            </p>
          </div>

          <form onSubmit={handleSubmitMessage} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tu Mensaje</label>
              <textarea
                onChange={(e) => setMessageFormData({ ...messageFormData, [e.target.name]: e.target.value })}
                value={messageFormData.text}
                id="text"
                name="text"
                rows={6}
                placeholder="Hola, me gustaría saber más sobre el michi..."
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
                required
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">Sé claro y conciso para una mejor comunicación.</p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white
                           bg-orange-500 hover:bg-orange-600 focus:outline-none
                           focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition duration-300"
              >
                Enviar Mensaje
              </button>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={closeFormModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>

              </div>
            </div>
          </form>
        </div>

      </ReactModal>
    </div>
  )
}

export default CatPostComments