import { useEffect } from 'react'

export default function useElementsStore() {
  useEffect(() => {
    async function init() {}
    init()
  }, [])

  const getClipElements = async (
    tabName: string
  ): Promise<string[] | undefined> => {
    return undefined
  }
  return { getClipElements }
}
