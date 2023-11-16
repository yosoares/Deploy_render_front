
import React, { useState, useEffect, useContext } from 'react'
// import { AuthContext } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './inicio.estilo.scss'
import apiLocal from '../API/apiLocal/api'

export default function Inicio() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    // const { signIn } = useContext(AuthContext)

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
        if(!email || !password){
            toast.warn('existem campos em branco') 
            
        }try{
            const resposta = await apiLocal.post('/Login', {
                email,password
            })
            console.log(resposta)
        }catch(err){
            console.log(err.response.data.error)
            //mostra na console o erro
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
                        type="text"
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