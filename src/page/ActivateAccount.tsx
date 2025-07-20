import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"


const ActivateAccount = () => {

    const navigate = useNavigate(); //Navegador
    const [searchParams, setSearchParams] = useSearchParams(); //buscar parametro token
    const token = searchParams.get('token'); 

    useEffect(() => {

        if(!token) navigate('/register');
        
        const activateAccound = async () => {

        }
        activateAccound();
    }, [])
    
  return (
    <div>ActivateAccount</div>
  )
}

export default ActivateAccount