
export default function AccordionItem({title,text,color}) {
  return (
   <details className= {`color rounded-lg p-4 shadow border-[1px] border-gray-900`} >
          <summary className="cursor-pointer font-semibold">
            {title}
          </summary>
          <p className="mt-2 text-sm text-neutral-600">
            {text}
          </p>
    </details>
  )
}
