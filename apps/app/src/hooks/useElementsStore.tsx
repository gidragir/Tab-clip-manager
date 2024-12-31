import { load, Store } from '@tauri-apps/plugin-store'
import { useEffect, useState } from 'react'

export default function useElementsStore() {
  const [elements, setElements] = useState<Store>()

  useEffect(() => {
    async function init() {
      const store = await load('elements.json', { autoSave: true })
      // await store.set("main", { elements: ["Text1", "Text2", "Text3"]}
      // )
      // await store.set(
      //   "passwords", { elements: ["Text4", "Text5", "Text6"]}
      // )
      // await store.set(
      //   "logins", { elements: ["Text7", "Text8", "Text9", "Text10"]}
      // )
      // await store.save()
      setElements(store)
    }
    init()
  }, [])

  const getClipElements = async (
    tabName: string
  ): Promise<string[] | undefined> => {
    if (!elements) return []
    const data = await elements.get<{ elements: string[] }>(tabName)
    console.log('getClipElements')
    return data?.elements || undefined
  }
  return { getClipElements }
}
