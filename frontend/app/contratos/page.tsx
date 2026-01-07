'use client'

import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useLoggedFlag } from '@/queries/loggedFlag'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  MenuItem,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Zod
const filtrosSchema = z.object({
  id_contrato: z.string().optional(),
  nome_cliente: z.string().optional(),
  email_cliente: z.string().optional(),

  tipo_plano: z
    .union([
      z.enum(['BASICO', 'PRO', 'ENTERPRISE']),
      z.literal(''),
    ])
    .optional(),

  status: z
    .union([
      z.enum(['ATIVO', 'INATIVO']),
      z.literal(''),
    ])
    .optional(),

  data_inicio: z.string().optional(),
  valor_mensal: z.string().optional(),
})

type FiltrosForm = z.infer<typeof filtrosSchema>


// Type do contrato
type Contrato = {
  id_contrato: string
  nome_cliente: string
  email_cliente: string
  tipo_plano: string
  status: string
  data_inicio: string
  valor_mensal: number
}

function formatBRL(value: string) {
  const numeric = value.replace(/\D/g, '')
  const number = Number(numeric) / 100

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const { logged } = useLoggedFlag()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FiltrosForm>({
    resolver: zodResolver(filtrosSchema),
    defaultValues: {
      id_contrato: '',
      nome_cliente: '',
      email_cliente: '',
      tipo_plano: '',
      status: '',
      data_inicio: '',
      valor_mensal: '',
    },
  })

  // Função pra resetar os filtros
  function handleClear() {
    reset()
    setPage(1)
    loadContratos()
  }

  const valorMensal = watch('valor_mensal')

  async function loadContratos(data?: FiltrosForm) {
    setLoading(true)

    try {
      const valorNumerico = data?.valor_mensal
        ? Number(data.valor_mensal.replace(/\D/g, '')) / 100
        : undefined

      const res = await api.get('/contratos', {
        params: {
          ...data,
          valor_mensal: valorNumerico,
          page,
          limit: 20,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      setContratos(res.data.items)
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar contratos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!logged) {
      router.push('/login')
    } else {
      loadContratos()
    }
  }, [logged, page])

  function onSubmit(data: FiltrosForm) {
    setPage(1)
    loadContratos(data)
  }

  return (
    <div className="p-6">
      <Typography variant="h4" mb={3}>
        Contratos
      </Typography>

      {/* Filtros */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <TextField label="ID" {...register('id_contrato')} />
              <TextField label="Cliente" {...register('nome_cliente')} />
              <TextField label="Email" {...register('email_cliente')} />

              <TextField select label="Plano" {...register('tipo_plano')}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="BASICO">BASICO</MenuItem>
                <MenuItem value="PRO">PRO</MenuItem>
                <MenuItem value="ENTERPRISE">ENTERPRISE</MenuItem>
              </TextField>

              <TextField select label="Status" {...register('status')}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="ATIVO">ATIVO</MenuItem>
                <MenuItem value="INATIVO">INATIVO</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Data início"
                InputLabelProps={{ shrink: true }}
                {...register('data_inicio')}
              />

              <TextField
                label="Valor mensal"
                value={valorMensal ?? ''}
                onChange={(e) =>
                  setValue('valor_mensal', formatBRL(e.target.value))
                }
              />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="small"
                sx={{ borderRadius: 1 }}
              >
                Buscar
              </Button>

              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{ borderRadius: 1 }}
                onClick={router.back}
              >
                Voltar
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                size="small"
                sx={{ borderRadius: 1 }}
                onClick={handleClear}
              >
                Limpar filtros
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <CircularProgress />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Plano</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Início</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {contratos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Sem contratos ativos
                    </TableCell>
                  </TableRow>
                ) : (
                  contratos.map((c) => (
                    <TableRow key={c.id_contrato} hover>
                      <TableCell>{c.id_contrato}</TableCell>
                      <TableCell>{c.nome_cliente}</TableCell>
                      <TableCell>{c.email_cliente}</TableCell>
                      <TableCell>{c.tipo_plano}</TableCell>
                      <TableCell>{c.status}</TableCell>
                      <TableCell>
                        {new Date(c.data_inicio).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                       {Number(c.valor_mensal).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </Button>

        <Typography>Página {page}</Typography>

        <Button
          variant="outlined"
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
