import { Label } from '@repo/ui/components/label'
import { Ellipsis } from 'lucide-react'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'

const ClipElement = ({ element }: { element: string }) => {
  return (
    <DropdownMenu>
      <div className="clip-element">
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
