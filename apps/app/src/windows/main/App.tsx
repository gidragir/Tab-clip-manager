import { load } from "@tauri-apps/plugin-store"
import "@style/App.scss"
import { Button } from "@repo/ui/components/button"
import { Label } from "@repo/ui/components/label"
import { Info, Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"


const elements_store = await load("elements.json", { autoSave: true })
// await elements_store.set("group_1", { elements: ["Text1", "Text2", "Text3", "Text4", "Text5", "Text6", "Text7", "Text8", "Text9", "Text10"]})
const group_1: {elements: string[]}| undefined = await elements_store.get<{elements: string[]}>('group_1')
const elements: string[] | undefined = group_1?.elements
await elements_store.save()

export default function App() {

  const tabs: (typeof Info)[] = [Info, Info, Info, Info, Info]

  return (
    <main className="container flex flex-col content-center text-center rounded-sm bg-bg_main">
      <div className="sticky flex flex-row gap-5 pb-2 justify-evenly top-1">
        {tabs.map((tab, index) => (
          <Button className="tab" variant="outline" size={"icon"} key={index}>
            <Info />
          </Button>
        ))}
      </div>

      <div className="flex flex-col mt-2 overflow-y-auto clip-elements text-start">
        {(Array.isArray(elements) ? elements.map((element, index) => (

          <DropdownMenu key={index}>
            <div className="flex flex-row transition-all rounded-sm bg-bg_clip clip-element hover:shadow-sm hover:shadow-slate-500" key={index}>
              <Label>
                {element}
              </Label>

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
        ))
        : [])}
      </div>
    </main>
  )
}
