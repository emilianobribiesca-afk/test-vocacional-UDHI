'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DetailedResults, riasecCategories, RIASECType, reconstructResultsFromScores } from '@/lib/professionalVocationalTestV3';
import Image from 'next/image';

// Hexágono grande y limpio
function HexagonChart({ percentages }: { percentages: DetailedResults['percentages'] }) {
  const size = 460;
  const center = size / 2;
  const radius = size / 2 - 50;

  // Always render in RIASEC order for the hexagon shape
  const riasecOrder: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const orderedData = riasecOrder.map(type => {
    const found = percentages.find(p => p.category === type);
    return found || { category: type, percentage: 0, percentile: 0, rawScore: 0 };
  });

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  const resultPoints = orderedData
    .map((p, i) => {
      const point = getPoint(i, p.percentage);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  const categoryNames: Record<string, string> = {
    R: 'Realista', I: 'Investigador', A: 'Artístico',
    S: 'Social', E: 'Emprendedor', C: 'Convencional'
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[460px] mx-auto">
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
      </defs>

      {/* Grid hexagons */}
      {[0.25, 0.5, 0.75, 1].map((factor, fi) => {
        const points = Array.from({ length: 6 }, (_, i) => {
          const pt = getPoint(i, factor * 100);
          return `${pt.x},${pt.y}`;
        }).join(' ');
        return (
          <polygon key={fi} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />
        );
      })}

      {/* Radial lines */}
      {Array.from({ length: 6 }, (_, i) => {
        const point = getPoint(i, 100);
        return (
          <line key={i} x1={center} y1={center} x2={point.x} y2={point.y} stroke="#e5e7eb" strokeWidth="1" />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={resultPoints}
        fill="url(#hexGradient)"
        fillOpacity="0.2"
        stroke="#1565C0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {orderedData.map((p, i) => {
        const point = getPoint(i, p.percentage);
        return (
          <circle key={i} cx={point.x} cy={point.y} r="5" fill="#1565C0" stroke="white" strokeWidth="2.5" />
        );
      })}

      {/* Labels with category name + percentage */}
      {orderedData.map((p, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const labelDistance = radius + 35;
        const x = center + labelDistance * Math.cos(angle);
        const y = center + labelDistance * Math.sin(angle);

        return (
          <g key={i}>
            <text x={x} y={y - 7} textAnchor="middle" dominantBaseline="middle"
              className="text-sm font-bold fill-gray-900">
              {p.category}
            </text>
            <text x={x} y={y + 9} textAnchor="middle" dominantBaseline="middle"
              className="text-[11px] fill-gray-500">
              {categoryNames[p.category]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Sistema de arquetipos: nombre + tagline por tipo primario + secundario
function getArchetype(code: string): { name: string; tagline: string; emoji: string } {
  const primary = code[0];
  const secondary = code[1];

  const archetypes: Record<string, { name: string; tagline: string; emoji: string }> = {
    'RI': { name: 'El Ingeniero', tagline: 'Construyes soluciones con lógica y precisión', emoji: '⚙️' },
    'RA': { name: 'El Artesano', tagline: 'Creas con tus manos y tu visión', emoji: '🛠️' },
    'RS': { name: 'El Protector', tagline: 'Ayudas a otros con acción práctica y directa', emoji: '🛡️' },
    'RE': { name: 'El Constructor', tagline: 'Lideras proyectos que transforman el mundo físico', emoji: '🏗️' },
    'RC': { name: 'El Técnico', tagline: 'Dominas sistemas y procesos con precisión', emoji: '🔧' },
    'IR': { name: 'El Científico', tagline: 'Descubres cómo funciona el mundo y lo mejoras', emoji: '🔬' },
    'IA': { name: 'El Visionario', tagline: 'Combinas ideas innovadoras con pensamiento profundo', emoji: '💡' },
    'IS': { name: 'El Sanador', tagline: 'Usas el conocimiento para cuidar y transformar vidas', emoji: '🩺' },
    'IE': { name: 'El Estratega', tagline: 'Analizas datos para tomar las mejores decisiones', emoji: '📊' },
    'IC': { name: 'El Analista', tagline: 'Encuentras patrones donde otros ven caos', emoji: '🧮' },
    'AR': { name: 'El Diseñador', tagline: 'Transformas ideas en objetos y espacios únicos', emoji: '✏️' },
    'AI': { name: 'El Innovador', tagline: 'Tu creatividad se alimenta de conocimiento profundo', emoji: '🎨' },
    'AS': { name: 'El Comunicador', tagline: 'Inspiras y conectas personas a través del arte', emoji: '🎭' },
    'AE': { name: 'El Director', tagline: 'Lideras proyectos creativos con visión y pasión', emoji: '🎬' },
    'AC': { name: 'El Curador', tagline: 'Organizas la belleza y la creatividad con método', emoji: '🖼️' },
    'SR': { name: 'El Terapeuta', tagline: 'Sanas cuerpos y mentes con empatía y técnica', emoji: '💪' },
    'SI': { name: 'El Mentor', tagline: 'Enseñas con conocimiento profundo y calidez humana', emoji: '📚' },
    'SA': { name: 'El Inspirador', tagline: 'Motivas a otros con creatividad y conexión genuina', emoji: '✨' },
    'SE': { name: 'El Líder Social', tagline: 'Movilizas personas para causas que importan', emoji: '🤝' },
    'SC': { name: 'El Organizador Social', tagline: 'Cuidas a tu comunidad con estructura y corazón', emoji: '🏥' },
    'ER': { name: 'El Emprendedor', tagline: 'Conviertes ideas en negocios que funcionan', emoji: '🚀' },
    'EI': { name: 'El Consultor', tagline: 'Resuelves problemas complejos con visión de negocio', emoji: '💼' },
    'EA': { name: 'El Productor', tagline: 'Conviertes la creatividad en proyectos rentables', emoji: '🎯' },
    'ES': { name: 'El Negociador', tagline: 'Conectas personas e intereses para lograr acuerdos', emoji: '🤝' },
    'EC': { name: 'El Ejecutivo', tagline: 'Gestionas recursos y equipos con eficiencia', emoji: '📈' },
    'CR': { name: 'El Inspector', tagline: 'Garantizas calidad y precisión en cada detalle', emoji: '🔍' },
    'CI': { name: 'El Investigador de Datos', tagline: 'Conviertes números en conocimiento útil', emoji: '📋' },
    'CA': { name: 'El Archivista', tagline: 'Preservas y organizas el conocimiento con cuidado', emoji: '📁' },
    'CS': { name: 'El Administrador', tagline: 'Mantienes todo funcionando para que otros puedan brillar', emoji: '🏛️' },
    'CE': { name: 'El Controller', tagline: 'Controlas los números que hacen crecer organizaciones', emoji: '💰' },
  };

  const key = primary + secondary;
  return archetypes[key] || { name: 'El Explorador', tagline: 'Tu camino profesional es único', emoji: '🧭' };
}

export default function Results() {
  const router = useRouter();
  const [results, setResults] = useState<DetailedResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllCareers, setShowAllCareers] = useState(false);
  const [fromLink, setFromLink] = useState(false);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // 1. Intentar cargar desde URL param (link del call center)
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('d');
      if (encoded) {
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        const decoded = JSON.parse(atob(base64));
        const reconstructed = reconstructResultsFromScores(decoded.s);
        setResults(reconstructed);
        setFromLink(true);
        if (decoded.n) setStudentName(decoded.n);
        setLoading(false);
        return;
      }

      // 2. Fallback: localStorage
      const storedResults = localStorage.getItem('professionalVocationalResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
        setLoading(false);
      } else {
        router.push('/register');
      }
    } catch (e) {
      console.error('Error loading results:', e);
      router.push('/register');
    }
  }, [router]);

  const handleRestart = () => {
    localStorage.removeItem('professionalVocationalResults');
    localStorage.removeItem('userInfo');
    router.push('/register');
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analizando resultados...</p>
        </div>
      </div>
    );
  }

  const visibleCareers = showAllCareers ? results.topCareers : results.topCareers.slice(0, 5);
  const topType = riasecCategories.find(c => c.id === results.percentages[0].category)!;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-10 bg-white print-no-sticky">
        <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
          <Image
            src="/logo-udhi.webp"
            alt="UDHI - Universidad de Dolores Hidalgo"
            width={110}
            height={19}
            className="h-auto w-full max-w-[110px] logo-blue"
            priority
          />
          <span className={`text-sm font-medium ${studentName ? 'text-gray-900' : 'text-gray-500'}`}>{studentName ? `Resultados de ${studentName}` : 'Resultados del Test'}</span>
        </div>
      </div>

      {/* Validation Alert - only if not valid */}
      {results.validation && results.validation.recommendation !== 'VALID' && (
        <div className="px-6 lg:px-12 py-4">
          <div className={`rounded-xl p-4 border ${
            results.validation.recommendation === 'CAUTION'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">
              {results.validation.recommendation === 'CAUTION'
                ? 'Se detectaron algunas inconsistencias menores. Resultados utilizables con precaución.'
                : 'Se detectaron múltiples inconsistencias. Te recomendamos retomar el test.'}
            </p>
            {results.validation.recommendation === 'INVALID' && (
              <button onClick={() => router.push('/register')}
                className="mt-2 px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                Retomar Test
              </button>
            )}
          </div>
        </div>
      )}

      {/* REVEAL - pantalla completa */}
      {(() => {
        const archetype = getArchetype(results.hollandCode);
        return (
          <div className="min-h-[80vh] flex items-center px-6 lg:px-16 py-16 bg-[#f0f4ff] print-hero-compact">
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
              {/* Left: Name + tagline */}
              <div className="lg:flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.25em] mb-4">Tu Perfil Vocacional</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight text-[#0D47A1]">{archetype.name}</h1>
                <p className="text-xl sm:text-2xl text-gray-500 max-w-lg leading-relaxed">{archetype.tagline}</p>
              </div>

              {/* Right: Code + types */}
              <div className="text-center lg:text-right">
                <div className="flex items-end justify-center lg:justify-end gap-8 lg:gap-12">
                  {results.percentages.slice(0, 3).map((p, i) => {
                    const cat = riasecCategories.find(c => c.id === p.category)!;
                    return (
                      <div key={i} className="text-center">
                        <div className="text-7xl lg:text-8xl font-black text-[#0D47A1] mb-2">
                          {p.category}
                        </div>
                        <div className="text-sm font-semibold text-gray-600">{cat.name}</div>
                        <div className="text-xs text-gray-400">{p.percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Top 3 tipos - cards grandes dedicadas */}
      <div className="px-6 lg:px-12 py-10 lg:py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tu Top 3</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {results.percentages.slice(0, 3).map((p, i) => {
              const cat = riasecCategories.find(c => c.id === p.category)!;
              return (
                <div key={i} className={`rounded-2xl p-6 lg:p-8 border-2 print-no-break ${
                  i === 0 ? 'border-[#1565C0] bg-blue-50' : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                      i === 0 ? 'bg-[#1565C0] text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {p.category}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cat.fullName}</h3>
                      <p className="text-sm text-gray-500">{p.percentage}% de afinidad</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-5">{cat.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {cat.characteristics.map((char, ci) => (
                      <span key={ci} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        i === 0 ? 'bg-white text-[#1565C0]' : 'bg-gray-50 text-gray-700'
                      }`}>
                        {char}
                      </span>
                    ))}
                  </div>

                  <div className={`rounded-xl p-4 ${i === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500 mb-1 font-medium">Ambiente laboral</p>
                    <p className="text-sm text-gray-700">{cat.workEnvironment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hexágono + Barras */}
      <div className="px-6 lg:px-12 py-10 lg:py-16 border-b border-gray-100 print-keep-together">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tus Intereses</h2>

          {/* Hexágono */}
          <div className="mb-10">
            <HexagonChart percentages={results.percentages} />
          </div>

          {/* Barras horizontales */}
          <div className="space-y-4">
            {results.percentages.map((p, i) => {
              const cat = riasecCategories.find(c => c.id === p.category)!;
              return (
                <div key={i} className="flex items-center gap-4 print-no-break">
                  <div className="w-8 h-8 rounded-lg bg-[#1565C0] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {p.category}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      <span className="text-sm font-bold text-gray-900">{p.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1565C0] rounded-full transition-all duration-700"
                        style={{ width: `${p.percentage}%`, opacity: 0.4 + (p.percentage / 100) * 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Carreras UDHI */}
      <div className="px-6 lg:px-12 py-10 lg:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carreras UDHI para ti</h2>
          <p className="text-gray-500 mb-8">Ordenadas por compatibilidad con tu perfil {results.hollandCode}</p>

          <div className="space-y-4">
            {visibleCareers.map((career, index) => (
              <div key={index} className="p-5 border border-gray-200 rounded-xl hover:border-[#1565C0] transition-colors print-no-break">
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 ${
                    index < 3 ? 'bg-[#1565C0] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-gray-900 text-base">{career.name}</h4>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                          <div className="h-full bg-[#1565C0] rounded-full" style={{ width: `${career.matchPercentage}%` }} />
                        </div>
                        <span className="text-base font-bold text-[#1565C0]">{career.matchPercentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>{career.area}</span>
                      <span>·</span>
                      <span>{career.duration}</span>
                      {career.modalities && (
                        <>
                          <span>·</span>
                          <span>{career.modalities.join(', ')}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{career.primaryReason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="print-hide">
            {!showAllCareers && results.topCareers.length > 5 && (
              <button
                onClick={() => setShowAllCareers(true)}
                className="w-full mt-4 py-3 text-sm font-medium text-[#1565C0] border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Ver todas las carreras ({results.topCareers.length - 5} más)
              </button>
            )}
            {showAllCareers && (
              <button
                onClick={() => setShowAllCareers(false)}
                className="w-full mt-4 py-3 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Ver menos
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-6 lg:px-12 py-10 lg:py-16 print-hide">
        <div className="max-w-6xl mx-auto flex justify-center">
          <button
            onClick={() => {
              setShowAllCareers(true);
              setTimeout(() => window.print(), 100);
            }}
            className="px-8 py-3.5 bg-[#1565C0] text-white font-semibold rounded-xl hover:bg-[#0D47A1] transition-colors"
          >
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 lg:px-12 py-6 print-hide">
        <p className="text-center text-xs text-gray-400">
          Test Vocacional UDHI · Modelo RIASEC de John L. Holland
        </p>
      </div>
    </div>
  );
}
