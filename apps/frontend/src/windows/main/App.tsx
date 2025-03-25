import '@style/App.css'

import { useState } from 'react'

import { ClipTab } from '@repo/types'

import ClipElements from '@components/ClipElements'
import ClipTabs from '@components/ClipTabs'
import useElementsStore from '@hooks/useElementsStore'
import useWindowOpenListener from '@hooks/useWindowOpenListener'
import useEscapeKeyListener from '@hooks/useEscapeKeyListener'

import { Info } from 'lucide-react'

const tabs: ClipTab[] = [
  { name: 'recent', svg: Info },
  { name: 'passwords', svg: Info },
  { name: 'logins', svg: Info },
  { name: 'emails', svg: Info },
]

// async function setData(newData: string) {
//   await invoke('set_data', { newData })
//   console.log('Data updated!')
// }

// setData('Hello, Tauri!')

export default function App() {
  const { getClipElements } = useElementsStore()

  const [activeTab, setActiveTab] = useState<string>('recent')
  const [elements, setElements] = useState<string[]>([])

  const handleTabChange = async (tabName: string) => {
    setActiveTab(tabName)
    const newElements = await getClipElements(tabName)
    setElements(newElements || [])
  }

  useWindowOpenListener(handleTabChange)
  useEscapeKeyListener()

  return (
    <main className="container content-center text-center rounded-sm display-flex-col background-main">
      <ClipTabs
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <ClipElements elements={elements} />
    </main>
  )
}
