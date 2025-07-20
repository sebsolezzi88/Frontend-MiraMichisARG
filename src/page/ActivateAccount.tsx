import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


const ActivateAccount = () => {

    const {token} = useParams(); //Obtener token de URL
    const navigate = useNavigate(); //Para redireccionar
    console.log(token);
    useEffect(() => {

        if(!token) navigate('/register');
        
        console.log(token)
    }, [])
    
  return (
    <div>ActivateAccount</div>
  )
}

export default ActivateAccount