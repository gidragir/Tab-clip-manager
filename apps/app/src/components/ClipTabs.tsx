import { Button } from "@repo/ui/components/button"
import { Info } from "lucide-react"

import { ClipTab } from "@repo/types"

type Props = {
  tabs: ClipTab[];
  activeTab: string;
  handleTabChange: (tab: string) => void
}

const ClipTabs = ({tabs, activeTab, handleTabChange}: Props) => {

  return (
    <div className="sticky flex flex-row gap-5 pb-2 justify-evenly top-1">
      {tabs.map((tab, index) => (
        <Button className={`tab ${activeTab === tab.name ? 'bg-white' : 'bg_clip'}`}
          variant="outline"
          size={"icon"}
          key={index}
          onClick={() => handleTabChange(tab.name)}>
          <Info />
        </Button>
      ))}
    </div>
  )
}

export default ClipTabs
