
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './inicio.estilo.scss'

export default function LoginCat() {
    const navigation = useNavigate()
    const [nome, setNome] = useState('')

    const { signIn } = useContext(AuthContext)
 
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
        if(!token){
            navigation('/')
            return
        }else if(token){
            async function verificaToken(){
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                if(resposta.data.dados){
                    navigation('/')
                    return
                }else if(resposta.data.id){
                    navigation('/Dashboard')
                }
            }
            verificaToken()
        }
    }, [])


    async function handleLogin(e) {
        e.preventDefault()        
        let data = {
            nome
        }
        const resposta = await signIn(data)
        if(!resposta){
            toast.error('Erro de Login', {
                toastId: 'toastId'
            }) 
            return
        }else if(resposta.status === 200){
            const token = resposta.data.token
            localStorage.setItem('@tklogin2023', JSON.stringify(token))
            toast.success('Login efetuado com sucesso')
            navigation('/Dashboard')
        }    
    }

    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <Link to='/Login'>AQUI</Link></p>
            </div>
        </div>
    )
}