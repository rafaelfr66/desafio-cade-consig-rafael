import { useQuery, useQueryClient } from '@tanstack/react-query'

const QUERY_KEY = ['logged-flag']

function getInitialLogged(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('token')
}

export function useLoggedFlag() {
  const queryClient = useQueryClient()

  const { data = false } = useQuery<boolean>({
    queryKey: QUERY_KEY,
    queryFn: async () => getInitialLogged(),
    initialData: getInitialLogged,
    enabled: false,
    staleTime: Infinity,
  })


  function setLogged(value: boolean) {
    queryClient.setQueryData(QUERY_KEY, value)
  }

  function toggle() {
    queryClient.setQueryData(QUERY_KEY, (old: boolean = false) => !old)
  }

  return {
    logged: data,
    setLogged,
    toggle,
  }
}
