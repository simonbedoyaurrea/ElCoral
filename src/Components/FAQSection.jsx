import React from 'react'
import AccordionItem from './AccordionItem';
import aceite from '../assets/AceiteDeCoco.png'
import coco from '../assets/coco.png'


export default function FAQSection() {
  return (
    <section className="grid md:grid-cols-3 gap-8 items-center p-8 bg-[rgb(234,216,192)] h-[85dvh]" >
      {/* Lado izquierdo: texto */}
      <div className="space-y-4 col-span-1">
        <h2 className="text-2xl font-bold">Te respondemos!</h2>
        <p className="text-neutral-600">
          Estamos aquí para resolver todas tus dudas sobre nuestros productos.
Queremos que tengas la confianza de conocer cada detalle antes de elegirnos.
Tu tranquilidad y satisfacción son nuestra prioridad.
        </p>
        <button className="px-6 py-3 bg-black text-white rounded-full">
            Mira Más Preguntas Frecuentes
        </button>
      </div>

      {/* Centro: producto */}
      <div className="flex justify-center col-span-1 relative">
        <img 
          src={aceite} 
          alt="Imagen del aceite de coco" 
          className="h-[440px] object-contain"
        />
        <img 
          src={coco} 
          alt="imagen de un coco" 
          className="h-[240px] object-contain absolute bottom-0 right-20 rotate-10"
          
        />
      </div>

      {/* Derecha: FAQ / Accordion */}
      <div className="col-span-1 space-y-2">
        <AccordionItem color="bg-[rgb(234,216,192)]" title={"How long does shipping take?"} text="Shipping usually takes 37 business days, depending on your location. Expedited shipping options are available for faster delivery"  />
        <AccordionItem color="bg-[rgb(234,216,192)]" title="Does my piece come in any packaging?" text=" Yes, each product is securely packaged with eco-friendly materials." />
        <AccordionItem color="bg-[rgb(234,216,192)]" title="Do you ship internationally?" text="Yes, we offer worldwide shipping." />
      </div>

    </section>
  );
}
