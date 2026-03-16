'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (formData.telefono && formData.telefono.length < 10) {
      newErrors.telefono = 'El teléfono debe tener al menos 10 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    localStorage.setItem('userInfo', JSON.stringify(formData));

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/instructions');
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16 animate-fade-in">
        <div className="w-full max-w-md">
          {/* Logo + Header */}
          <div className="mb-8 sm:mb-10">
            <Image
              src="/logo-udhi.webp"
              alt="UDHI - Universidad de Dolores Hidalgo"
              width={130}
              height={23}
              className="h-auto w-full max-w-[120px] sm:max-w-[130px] drop-shadow-md logo-blue mb-4 sm:mb-5 -ml-1"
              priority
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent mb-3 sm:mb-4">
              Test Vocacional
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Descubre tu camino profesional ideal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre(s)
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:border-transparent hover:border-gray-400 transition-all text-gray-900`}
                placeholder="Juan"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                Apellido(s)
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 ${
                  errors.apellido ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:border-transparent hover:border-gray-400 transition-all text-gray-900`}
                placeholder="Pérez García"
              />
              {errors.apellido && (
                <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:border-transparent hover:border-gray-400 transition-all text-gray-900`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Recibirás tus resultados en este correo
              </p>
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-gray-400">(Opcional)</span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:border-transparent hover:border-gray-400 transition-all text-gray-900`}
                placeholder="5512345678"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#1565C0] to-[#1E88E5] hover:from-[#0D47A1] hover:to-[#1565C0] text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform text-base sm:text-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Comenzar Test
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Privacy */}
            <p className="text-xs text-gray-500 text-center">
              Tus datos serán utilizados únicamente para enviarte los resultados del test.
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Only on Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a1628] via-[#0D47A1] to-[#1565C0] items-center justify-center p-12 xl:p-16">
        <div className="max-w-lg">
          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            En UDHI queremos que elijas bien
          </h2>
          <p className="text-lg text-blue-200 mb-10 leading-relaxed">
            No la carrera más popular, ni la que te dijeron. La que va contigo. Por eso diseñamos este test: para que explores tus intereses y descubras qué camino profesional se alinea con tu forma de pensar y actuar.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-1 h-full min-h-[40px] bg-blue-400 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-white mb-1">Basado en el modelo RIASEC de Holland</h3>
                <p className="text-sm text-blue-300">El método más utilizado en orientación vocacional a nivel mundial</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-1 h-full min-h-[40px] bg-blue-400 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-white mb-1">Personalizado con las carreras UDHI</h3>
                <p className="text-sm text-blue-300">Te mostramos qué carreras de UDHI conectan con tu forma de ser</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-1 h-full min-h-[40px] bg-blue-400 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-white mb-1">20 minutos que pueden cambiar tu perspectiva</h3>
                <p className="text-sm text-blue-300">Sin respuestas correctas o incorrectas. Solo sé honesto contigo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
