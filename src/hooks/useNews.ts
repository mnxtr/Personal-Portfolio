import { useQuery } from '@tanstack/react-query'
import { blogPosts } from '@/data/blog'

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      return blogPosts
    },
  })
}
