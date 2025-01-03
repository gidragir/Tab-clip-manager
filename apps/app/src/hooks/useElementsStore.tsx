// import { load } from '@tauri-apps/plugin-store'
import { load } from '@tauri-apps/plugin-store'
import { useEffect } from 'react'

export default function useElementsStore() {

  useEffect(() => {
    async function init() {

      // const store1 = await load('main_elements.json', { autoSave: true })
      // store1.set("elements", ["Text1", "Text2", "Text3"])

      // const store2 = await load('passwords_elements.json', { autoSave: true })
      // store2.set("elements", ["Text4", "Text5", "Text6"])

      // const store3 = await load('logins_elements.json', { autoSave: true })
      // store3.set("elements", ["Text7", "Text8", "Text9", "Text10"])

      // store1.save()
      // store2.save()
      // store3.save()
    }
    init()
  }, [])

  const getClipElements = async (
    tabName: string
  ): Promise<string[] | undefined> => {
    const store = await load(`${tabName}_elements.json`)
    return await store.get<string[]>("elements") || undefined
  }
  return { getClipElements }
}
