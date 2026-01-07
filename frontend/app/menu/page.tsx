'use client'

import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useLoggedFlag } from '@/queries/loggedFlag'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from 'react-toastify'

export default function MenuPage() {
  const { logged } = useLoggedFlag()
  const router = useRouter()

  useEffect(() => {
    if (!logged) {
      router.push('/login')
    }
  }, [logged, router])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={4}
        border="2px dashed"
        borderColor="grey.400"
        borderRadius={4}
        minWidth={320}
      >

        <Button
          variant="contained"
          color="success"
          startIcon={<DescriptionIcon />}
          sx={{ mt: 1 }}
          onClick={() => router.push('/contratos')}
        >
          Ver contratos
        </Button>

        <Button
          variant="contained"
          color="warning"
          startIcon={<UploadFileIcon />}
          sx={{ mt: 1 }}
          onClick={() => router.push('/upload')}
        >
           Upload de CSV
        </Button>
      </Box>
    </Box>
  )
}
