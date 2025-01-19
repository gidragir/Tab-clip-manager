import { useEffect } from 'react'

export default function useElementsStore() {
  useEffect(() => {
    async function init() {}
    init()
  }, [])

  const getClipElements = async (
    tabName: string
  ): Promise<string[] | undefined> => {
    console.log(tabName)
    return undefined
  }
  return { getClipElements }
}
