'use client'

import { useEffect } from 'react'
import { api } from '../services/api'
import { useLoggedFlag } from '@/queries/loggedFlag';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { logged } = useLoggedFlag();
  const router = useRouter();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const form = new FormData()
    form.append('file', e.target.files[0])

    await api.post('/contratos/upload', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  useEffect(() => {
    if (!logged) {
      router.push('/login');
    }
  });

  return <input type="file" accept=".csv" onChange={handleUpload} />
}
