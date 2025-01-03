import '@style/App.scss'

import { useState } from 'react'

import { ClipTab } from '@repo/types'

import ClipElements from '@components/ClipElements'
import ClipTabs from '@components/ClipTabs'
import useElementsStore from '@hooks/useElementsStore'

import { Info } from 'lucide-react'

export default function App() {
  const { getClipElements } = useElementsStore()
  const tabs: ClipTab[] = [
    { name: 'main', svg: Info },
    { name: 'passwords', svg: Info },
    { name: 'logins', svg: Info },
    { name: 'emails', svg: Info },
  ]

  const [activeTab, setActiveTab] = useState<string>("")
  const [elements, setElements] = useState<string[]>([])

  const handleTabChange = async (tabName: string) => {
    setActiveTab(tabName)
    const newElements = await getClipElements(tabName)
    setElements(newElements || [])
  }

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
