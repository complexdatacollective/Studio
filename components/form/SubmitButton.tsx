'use client'
 
import { useFormStatus } from 'react-dom'
import { Button } from '~/components/ui/Button'
 
export function SubmitButton({ children }: React.PropsWithChildren) {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  )
}