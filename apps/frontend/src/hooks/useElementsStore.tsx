import { useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'

type ActionsMap = {
  [key: string]: () => Promise<string[]>;
};

export default function useElementsStore() {
  useEffect(() => {
    async function init() { }
    init()
  }, [])


  async function getData(): Promise<string[]> {
    const data = await invoke<string[]>('get_recent_clipboard_entries')
    return Array.isArray(data) ? data : []
  }

  const getClipElements = async (
    tabName: string
  ): Promise<string[]> => {

    const actions: ActionsMap = {
      recent: async () => await getData()
    };
    const defaultAction: () => Promise<string[]> = async () => await [];
    const result = (actions.hasOwnProperty(tabName) ? actions[tabName] : defaultAction)()
    return result
    }
    return { getClipElements }
  }
