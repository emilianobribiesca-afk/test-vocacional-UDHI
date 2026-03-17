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

    // Limpiar localStorage
    localStorage.removeItem('professionalVocationalResults');
    localStorage.removeItem('userInfo');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <Image
          src="/logo-udhi.webp"
          alt="UDHI - Universidad de Dolores Hidalgo"
          width={130}
          height={23}
          className="h-auto w-full max-w-[130px] logo-blue mx-auto mb-10"
          priority
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0D47A1] mb-4">
          {nombre ? `Gracias ${nombre}` : 'Gracias'}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Hemos recibido tus respuestas.
        </p>
        <p className="text-gray-500">
          La universidad se pondrá en contacto contigo.
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
