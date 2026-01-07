'use client'

import { useState } from 'react'
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { api } from '../services/api'
import { useLoggedFlag } from '@/queries/loggedFlag'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  
  const { logged, setLogged } = useLoggedFlag();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await api.post('/login', { usuario, senha })
    
    try {
      localStorage.setItem('token', res.data.access_token)
      setLogged(true);
      router.push('/menu');
    } catch (error) {
      console.log(error);
    }

  }

  return (
 <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            className="text-center mb-6 font-semibold"
          >
            Login
          </Typography>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextField
              label="Usuário"
              variant="outlined"
              fullWidth
              onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button
              sx={{
                backgroundColor: "#FF0000"
              }}
              type="submit"
              variant="contained"
              className="mt-2"
              fullWidth
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
