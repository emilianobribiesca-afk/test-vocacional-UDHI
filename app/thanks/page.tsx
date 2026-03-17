'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThanksContent() {
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const n = searchParams.get('nombre');
    if (n) setNombre(n);

    localStorage.removeItem('professionalVocationalResults');
    localStorage.removeItem('userInfo');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 lg:px-12 py-4">
          <Image
            src="/logo-udhi.webp"
            alt="UDHI - Universidad de Dolores Hidalgo"
            width={110}
            height={19}
            className="h-auto w-full max-w-[110px] logo-blue"
            priority
          />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          {/* Check icon */}
          <div className="w-20 h-20 bg-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] mb-4">
            {nombre ? `Gracias, ${nombre}` : 'Gracias'}
          </h1>

          <p className="text-xl text-gray-600 mb-3">
            Hemos recibido tus respuestas.
          </p>

          <p className="text-gray-400 mb-12">
            Un asesor de UDHI se pondrá en contacto contigo para compartirte tus resultados y orientarte en tu elección de carrera.
          </p>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-400 mb-1">¿Tienes dudas?</p>
            <p className="text-sm text-gray-500">Contáctanos en <span className="text-[#1565C0] font-medium">callcenter_slp@udhi.edu.mx</span></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 lg:px-12 py-6">
        <p className="text-center text-xs text-gray-400">
          Test Vocacional UDHI · Universidad de Dolores Hidalgo
        </p>
      </div>
    </div>
  );
}

export default function Thanks() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    }>
      <ThanksContent />
    </Suspense>
  );
}
