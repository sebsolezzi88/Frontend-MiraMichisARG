import { useState } from "react";
import { useNavigate } from "react-router-dom";


const BlogPosts = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    if (loading) return <div>Cargado...</div>

    if (error) return <div>{error}</div>
    return (

        <>
            <div className="max-w-7xl mx-auto space-y-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                   Últimos Notas
                </h2>
            </div>
        </>
    )
}

export default BlogPosts