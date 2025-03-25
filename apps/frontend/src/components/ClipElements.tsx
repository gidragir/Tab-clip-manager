import ClipElement from '@components/ClipElement'

const ClipElements = ({ elements }: { elements: string[] | undefined }) => {
  return (
    <div className="clip-elements">
      {Array.isArray(elements)
        ? elements.map((element, index) => (
            <ClipElement element={element} key={index} />
          ))
        : []}
    </div>
  )
}

export default ClipElements
