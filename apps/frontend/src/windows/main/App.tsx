import '@style/App.css'

import { useEffect, useState } from 'react'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { ClipTab } from '@repo/types'

import ClipElements from '@components/ClipElements'
import ClipTabs from '@components/ClipTabs'
import useElementsStore from '@hooks/useElementsStore'

import { Info } from 'lucide-react'

const tabs: ClipTab[] = [
  { name: 'main', svg: Info },
  { name: 'passwords', svg: Info },
  { name: 'logins', svg: Info },
  { name: 'emails', svg: Info },
]

// async function setData(newData: string) {
//   await invoke('set_data', { newData })
//   console.log('Data updated!')
// }

// setData('Hello, Tauri!')

async function getData() {
  const data = await invoke('get_recent_clipboard_entries')
  console.log('Current data:', data)
}

export default function App() {
  const { getClipElements } = useElementsStore()

  const [activeTab, setActiveTab] = useState<string>('')
  const [elements, setElements] = useState<string[]>([])

  const handleTabChange = async (tabName: string) => {
    setActiveTab(tabName)
    const newElements = await getClipElements(tabName)
    setElements(newElements || [])
    getData()
  }

  useEffect(() => {
    const event = listen<string>('window_open', async () => {
      handleTabChange(tabs[0].name)
    })
    return () => {
      event.then((unlisten) => unlisten())
    }
  })

  return (
    <main className="container flex flex-col content-center text-center rounded-sm bg-bg_main">
      <ClipTabs
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <ClipElements elements={elements} />
    </main>
  )
}
