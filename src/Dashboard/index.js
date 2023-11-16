import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import { AuthContext } from '../Contexts/AuthContext'


export default function Dashboard() {
    const navigation = useNavigate()

    function handleSair(){
        localStorage.removeItem('@tklogin2023')
        

        // setInterval(() => {
        
        //     navigation('/')
        // }, 5000 )
        
    }

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)


    // const { loginToken } = useContext(AuthContext)
    useEffect(() => {
       if(!token){
        navigation('/')
       } else if (token) {
        async function verificaToken() {
            const resposta = await apiLocal.get('/ListarUsuarioToken', {
                headers:{
                    Authorization:'Beas' `${token}`
                }
            })
            if (resposta.data.dados){
                navigation('/Dashboard')
            }
        }
        verificaToken()
       }
        // loginToken()
        // const iToken = localStorage.getItem('@tklogin2023')
        // const token = JSON.parse(iToken)
        // if (!token) {
        //     navigation('/')
        //     return
        // }
           
    }, [token])



    return (
        <div>
            <h1>Dashboard</h1>

            <Link to='/Produtos'>Cadastrar Produtos</Link>
            <button onClick={handleSair}>Sair</button>
        </div>
    )
}