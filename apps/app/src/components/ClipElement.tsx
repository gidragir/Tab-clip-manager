import { Label } from '@repo/ui/components/label'
import { Ellipsis } from 'lucide-react'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'

const ClipElement = ({ element, key }: { element: string; key: number }) => {
  return (
    <DropdownMenu key={key}>
      <div className="flex flex-row transition-all rounded-sm bg-bg_clip clip-element hover:shadow-sm hover:shadow-slate-500">
        <Label>{element}</Label>

        <DropdownMenuTrigger asChild>
          <Button className="w-1 h-1 ml-auto mr-0 right-2" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ClipElement
