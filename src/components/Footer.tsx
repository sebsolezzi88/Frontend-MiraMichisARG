const Footer = () => {
    
  return (
     <footer className="text-center bg-gray-100 text-gray-600 text-sm mt-10 p-4 border-t border-gray-200">
            <p>&copy; {new Date().getFullYear().toString()} MiraMichis ARG. Todos los derechos reservados.</p>
            <p>Hecho para todos los Michis en Argentina</p>
    </footer>
  )
}

export default Footer