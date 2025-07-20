import { useEffect } from "react"
import { useParams } from "react-router-dom"


const ActivateAccount = () => {

    const {token} = useParams();
    useEffect(() => {
        
        console.log(token)
    }, [])
    
  return (
    <div>ActivateAccount</div>
  )
}

export default ActivateAccount