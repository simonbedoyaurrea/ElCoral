import React from 'react'

export default function AccordionDetail({title,text,openAccordion}) {
  return (
    <div>
            <button
              className="w-full flex justify-between py-3 text-left font-medium"
            >
              {title}
              <span>{openAccordion === title ? "-" : "+"}</span>
            </button>
            {openAccordion === title && (
              <div className="p-2 text-sm text-gray-600">
                {text}
              </div>
            )}
          </div>
  )
}
