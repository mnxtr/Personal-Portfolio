import { useState } from 'react'
import type { ContactFormData } from '@/schemas/contact.schema'

interface ContactState {
  status: 'idle' | 'sending' | 'success' | 'error'
}

export function useContact() {
  const [state, setState] = useState<ContactState>({ status: 'idle' })

  const submit = async (data: ContactFormData) => {
    setState({ status: 'sending' })
    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Contact form submitted:', data)
    setState({ status: 'success' })
    setTimeout(() => setState({ status: 'idle' }), 3000)
  }

  return { ...state, submit }
}
