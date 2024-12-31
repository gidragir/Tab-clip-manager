import ClipElement from "@components/ClipElement"

const ClipElements = ({ elements }: { elements: string[] | undefined }) => {
  return (
    <div className="flex flex-col mt-2 overflow-y-auto clip-elements text-start">
      {(Array.isArray(elements) ? elements.map((element, index) => (
        <ClipElement element={element} key={index} />
      ))
        : [])}
    </div>
  )
}

export default ClipElements
