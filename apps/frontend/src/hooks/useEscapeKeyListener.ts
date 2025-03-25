import { useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'

export default function useEscapeKeyListener() {
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key === 'Escape') {
        await getCurrentWindow().close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
