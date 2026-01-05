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
} from "@mui/material";

type Contrato = {
  id_contrato: string
  nome_cliente: string
  email_cliente: string
  tipo_plano: string
  status: string
  data_inicio: string
  valor_mensal: number
}

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [loading, setLoading] = useState(false)
  const { logged } = useLoggedFlag();
  const router = useRouter();

  const [filters, setFilters] = useState({
    id_contrato: '',
    nome_cliente: '',
    email_cliente: '',
    tipo_plano: '',
    status: '',
    data_inicio: '',
    valor_mensal: '',
    page: 1,
    limit: 20,
  })

  async function loadContratos() {
    setLoading(true)

    try {
      const res = await api.get('/contratos', {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setContratos(res.data.items);
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar contratos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!logged) {
      router.push('/login');
    } else {
      loadContratos();
    }
  }, [filters.page])

function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const { name, value } = e.target
  setFilters((prev) => ({ ...prev, [name]: value }))
}


  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, page: 1 }))
    loadContratos()
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6 font-semibold">
        Contratos
      </Typography>

      <Card className="mb-6">
        <CardContent>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <TextField
              label="ID"
              name="id_contrato"
              value={filters.id_contrato}
              onChange={handleChange}
            />

            <TextField
              label="Cliente"
              name="nome_cliente"
              value={filters.nome_cliente}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email_cliente"
              value={filters.email_cliente}
              onChange={handleChange}
            />

            <TextField
              label="Plano"
              name="tipo_plano"
              value={filters.tipo_plano}
              onChange={handleChange}
            />

            <TextField
              label="Status"
              name="status"
              value={filters.status}
              onChange={handleChange}
            />

            <TextField
              type="date"
              label="Data início"
              name="data_inicio"
              value={filters.data_inicio}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Valor mensal"
              name="valor_mensal"
              value={filters.valor_mensal}
              onChange={handleChange}
            />

            <div className="flex items-end">
              <Button
                sx={{
                  backgroundColor: "#FF0000"
                }}
                type="submit"
                variant="contained"
                fullWidth
              >
                Buscar
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
                {contratos.map((c) => (
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
                      {Number(c.valor_mensal).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outlined"
          disabled={filters.page === 1}
          onClick={() =>
            setFilters((p) => ({ ...p, page: p.page - 1 }))
          }
        >
          Anterior
        </Button>

        <Typography>Página {filters.page}</Typography>

        <Button
          variant="outlined"
          onClick={() =>
            setFilters((p) => ({ ...p, page: p.page + 1 }))
          }
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
