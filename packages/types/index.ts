import * as LucideIcons from 'lucide-react'

type ClipTab = {
  name: string
  svg: (typeof LucideIcons)[keyof typeof LucideIcons]
}

export type { ClipTab }
