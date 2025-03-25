import { useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'

export default function useWindowOpenListener(
  handleTabChange: (tab: string) => void
) {
  useEffect(() => {
    const event = listen<string>('window_open', async () => {
      handleTabChange('recent')
    })

    return () => {
      event.then((unlisten) => unlisten())
    }
  }, [handleTabChange])
}
