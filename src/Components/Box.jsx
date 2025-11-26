import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useBoxStore from '../context/BoxContext'
import { FaBox } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { GiBoxUnpacking } from 'react-icons/gi'

export default function Box() {
  const [isOpen, setIsOpen] = useState(false)
  const cart = useBoxStore((s) => s.cart)
  const removeFromCart = useBoxStore((s) => s.removeFromCart)
  const updateQuantity = useBoxStore((s) => s.updateQuantity)
  const clearCart = useBoxStore((s) => s.clearCart)
  const total = useBoxStore((s) => s.total)

  const phoneNumber = "573044467119"; 
  const message = "Hola, estoy interesado en tus productos:\n";


  const sendBox = () => {
  let productsMessage = "🛒 *Pedido:* \n\n";

  cart.forEach(item => {
    productsMessage += `• *${item.name}*\n  Cantidad: ${item.quantity}\n  Precio: $${item.price}\n  Subtotal: $${item.price * item.quantity}\n\n`;
  });

  productsMessage += `---------------------\n`;
  productsMessage += `*Total:* $${total().toLocaleString()}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(productsMessage)}`;
  window.open(url, "_blank");
};


  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-cyan-600 cursor-pointer hover:bg-blue-700 text-white rounded-full p-4 shadow-xl flex items-center justify-center transition-all z-40"
      >
        <FaBox />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        )}
      </button>

      {/* Fondo oscuro */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar flotante */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-40 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-xl font-semibold text-black">Tu caja ({cart.length})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 rounded-full p-2 transition hover:bg-red-200 hover:text-red-600"
              >
                <CgClose />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {(!cart || cart.length === 0) ? (
                <div className="text-center text-gray-500 mt-20">
                   Tu caja está vacía
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border rounded-xl p-3 hover:shadow-md transition"
                  >
                    <img
                      src={ item.image || "https://img.freepik.com/foto-gratis/productos-belleza-surtido-destinatarios-sobre-piedras-beige_23-2148761387.jpg?semt=ais_hybrid&w=740&q=80"  }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price} COP</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="px-3 text-black">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        className="text-sm text-red-500 hover:underline"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                      <p className="font-semibold text-gray-800">
                        ${( (item.price ?? item.precio) * item.quantity ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-5 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="text-sm text-gray-600 hover:text-red-500"
                    onClick={() => clearCart()}
                  >
                   <GiBoxUnpacking /> Vaciar caja
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total estimado</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${total().toLocaleString()} COP
                    </p>
                  </div>
                </div>
                <button onClick={sendBox} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
                  enviar caja 
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
 