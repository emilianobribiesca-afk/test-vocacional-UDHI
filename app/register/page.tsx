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
          {/* Logo */}
          <div className="mb-8 sm:mb-12">
            <Image
              src="/logo-udhi.webp"
              alt="UDHI - Universidad de Dolores Hidalgo"
              width={130}
              height={23}
              className="h-auto w-full max-w-[120px] sm:max-w-[130px] drop-shadow-md logo-blue"
              priority
            />
          </div>

          {/* Header */}
          <div className="mb-8 sm:mb-10">
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

      {/* Right Panel - Info - Only on Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 items-center justify-center p-12 xl:p-16">
        <div className="max-w-lg animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6 border border-gray-200">
              <div className="w-2 h-2 bg-gradient-to-r from-[#1565C0] to-[#1E88E5] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Test Científicamente Validado</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Descubre tu vocación profesional
            </h2>
            <p className="text-lg text-gray-600">
              Basado en el modelo RIASEC de Holland, el método más utilizado en orientación vocacional a nivel mundial.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1565C0] to-[#1E88E5] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">80 preguntas validadas científicamente</h3>
                <p className="text-gray-700">Evaluación profesional con validación de consistencia</p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1565C0] to-[#1E88E5] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Análisis con percentiles</h3>
                <p className="text-gray-700">Código Holland, percentiles, consistencia y validación de respuestas</p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1565C0] to-[#1E88E5] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">18-25 minutos</h3>
                <p className="text-gray-700">Tiempo óptimo - Responde con honestidad y atención</p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1565C0] to-[#1E88E5] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Resultados por email</h3>
                <p className="text-gray-700">Recibe tu informe completo en tu correo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
