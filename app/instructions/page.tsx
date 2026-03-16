'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Instructions() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      router.push('/register');
      return;
    }
    const user = JSON.parse(userInfo);
    setUserName(user.nombre);
  }, [router]);

  const handleStart = () => {
    router.push('/test');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 lg:px-12 py-4 flex items-center">
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

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0D47A1] to-[#1565C0] text-white px-6 lg:px-12 py-12 lg:py-20">
        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            ¡Hola, {userName}!
          </h1>
          <p className="text-lg sm:text-xl text-blue-100">
            Estás por comenzar el Test Vocacional UDHI
          </p>
        </div>
      </div>

      {/* Instructions - full width grid */}
      <div className="flex-1 px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {/* Card 1 */}
          <div className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#1565C0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Responde con honestidad</h3>
              <p className="text-gray-600">
                No hay respuestas correctas o incorrectas. Lo importante es que refleje tus verdaderos intereses y preferencias.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#1565C0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">80 preguntas</h3>
              <p className="text-gray-600 mb-2">
                Sobre actividades, competencias y ocupaciones. Piensa: <span className="italic">&quot;¿Qué tan interesante me parece esto?&quot;</span>
              </p>
            </div>
          </div>

          {/* Card 3 - Escala */}
          <div className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#1565C0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Escala del 1 al 5</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"><strong className="text-[#1565C0]">1</strong> Nada</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"><strong className="text-[#1565C0]">2</strong> Poco</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"><strong className="text-[#1565C0]">3</strong> Algo</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"><strong className="text-[#1565C0]">4</strong> Interesante</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"><strong className="text-[#1565C0]">5</strong> Mucho</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#1565C0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">18-25 minutos</h3>
              <p className="text-gray-600">
                No hay límite de tiempo. Responde con tu primera impresión, sin pensarlo demasiado.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-bold text-lg rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Comenzar Test
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="text-xs text-gray-400 mt-4">Responde todas las preguntas con atención para obtener resultados precisos</p>
        </div>
      </div>
    </div>
  );
}
