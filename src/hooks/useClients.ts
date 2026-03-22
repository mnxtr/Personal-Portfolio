import { useQuery } from '@tanstack/react-query'
import { services } from '@/data/clients'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      return services
    },
  })
}
