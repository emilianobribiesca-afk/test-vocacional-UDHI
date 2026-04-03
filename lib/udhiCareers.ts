// Carreras específicas de UDHI mapeadas a perfiles RIASEC
// Universidad de Dolores Hidalgo

export interface UDHICareer {
  id: string;
  name: string;
  area: 'Salud' | 'Ciencias Sociales y Humanidades' | 'Negocios' | 'Ingenierías';
  riasecProfile: string; // Código Holland de 2-3 letras
  primaryTypes: string[]; // Tipos RIASEC primarios
  description: string;
  competencies: string[];
  workEnvironment: string;
  duration: string;
  modalities: string[];
  profileMatch: string; // Descripción del perfil ideal del estudiante
}

export const udhiCareers: UDHICareer[] = [
  // ==================== ÁREA DE SALUD ====================
  {
    id: 'enfermeria',
    name: 'Licenciatura en Enfermería',
    area: 'Salud',
    riasecProfile: 'SIR',
    primaryTypes: ['S', 'I', 'R'],
    description: 'Forma profesionales del cuidado de la salud capacitados para promover, prevenir, curar y rehabilitar la salud individual y colectiva.',
    competencies: [
      'Cuidado integral del paciente',
      'Conocimientos médicos y farmacológicos',
      'Empatía y comunicación efectiva',
      'Trabajo bajo presión',
      'Ética profesional en salud'
    ],
    workEnvironment: 'Hospitales, clínicas, centros de salud, servicios de urgencias, cuidados domiciliarios',
    duration: '3 años + 1 año de servicio',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con vocación de servicio, interés por ayudar a otros, capacidad para trabajar en equipo y resistencia emocional'
  },
  {
    id: 'estilismo-cosmetologia',
    name: 'Licenciatura en Estilismo y Cosmetología',
    area: 'Salud',
    riasecProfile: 'ARS',
    primaryTypes: ['A', 'R', 'S'],
    description: 'Desarrolla profesionales especializados en tratamientos estéticos, imagen personal y bienestar, combinando conocimientos técnicos con creatividad artística.',
    competencies: [
      'Técnicas de estilismo y belleza',
      'Conocimientos dermatológicos',
      'Creatividad y sentido estético',
      'Atención personalizada al cliente',
      'Emprendimiento en el sector belleza'
    ],
    workEnvironment: 'Salones de belleza, spas, clínicas estéticas, televisión, eventos, consultoría de imagen',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas creativas con interés en la imagen personal, tendencias de moda y bienestar, con habilidades interpersonales'
  },
  {
    id: 'fisioterapia',
    name: 'Licenciatura en Fisioterapia',
    area: 'Salud',
    riasecProfile: 'SRI',
    primaryTypes: ['S', 'R', 'I'],
    description: 'Prepara especialistas en rehabilitación física que ayudan a pacientes a recuperar o mejorar su capacidad de movimiento y funcionalidad.',
    competencies: [
      'Evaluación y diagnóstico funcional',
      'Técnicas de terapia manual',
      'Diseño de programas de rehabilitación',
      'Anatomía y biomecánica',
      'Empatía y motivación al paciente'
    ],
    workEnvironment: 'Hospitales, centros de rehabilitación, clínicas deportivas, consultorios privados, equipos deportivos',
    duration: '4 años + 1 año de servicio',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con interés en el cuerpo humano, el movimiento y ayudar en la recuperación de pacientes'
  },
  {
    id: 'nutricion',
    name: 'Licenciatura en Nutrición',
    area: 'Salud',
    riasecProfile: 'ISR',
    primaryTypes: ['I', 'S', 'R'],
    description: 'Forma expertos en alimentación y nutrición que promueven la salud a través de planes alimenticios personalizados y educación nutricional.',
    competencies: [
      'Evaluación del estado nutricional',
      'Diseño de planes alimenticios',
      'Conocimientos de bioquímica y metabolismo',
      'Educación en salud nutricional',
      'Prevención de enfermedades crónicas'
    ],
    workEnvironment: 'Hospitales, consultorios privados, centros deportivos, industria alimentaria, investigación',
    duration: '4 años + 1 año de servicio',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas interesadas en la ciencia de los alimentos, la salud preventiva y el bienestar integral'
  },
  {
    id: 'gestion-deportiva',
    name: 'Licenciatura en Gestión Deportiva',
    area: 'Salud',
    riasecProfile: 'ESR',
    primaryTypes: ['E', 'S', 'R'],
    description: 'Capacita profesionales para administrar organizaciones deportivas, planificar eventos y promover la actividad física y el deporte.',
    competencies: [
      'Administración de instalaciones deportivas',
      'Organización de eventos deportivos',
      'Marketing deportivo',
      'Entrenamiento y coaching',
      'Promoción de hábitos saludables'
    ],
    workEnvironment: 'Clubes deportivos, gimnasios, federaciones deportivas, eventos, centros de alto rendimiento',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas apasionadas por el deporte con habilidades de liderazgo y gestión organizacional'
  },
  {
    id: 'puericultura',
    name: 'Licenciatura en Puericultura',
    area: 'Salud',
    riasecProfile: 'SIA',
    primaryTypes: ['S', 'I', 'A'],
    description: 'Forma profesionales especializados en el desarrollo integral del niño desde la gestación hasta la adolescencia, abarcando aspectos físicos, cognitivos, emocionales y sociales.',
    competencies: [
      'Estimulación temprana y desarrollo infantil',
      'Evaluación del desarrollo psicomotor',
      'Diseño de programas educativos para la infancia',
      'Orientación y asesoría familiar',
      'Prevención y detección de problemas del desarrollo'
    ],
    workEnvironment: 'Guarderías, centros de desarrollo infantil, hospitales pediátricos, estancias infantiles, consultoría privada, instituciones educativas',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con vocación de cuidado infantil, paciencia, creatividad y sensibilidad para acompañar el desarrollo de niños'
  },

  // ==================== ÁREA DE CIENCIAS SOCIALES Y HUMANIDADES ====================
  {
    id: 'criminologia-criminalistica',
    name: 'Licenciatura en Criminología y Criminalística',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'IRC',
    primaryTypes: ['I', 'R', 'C'],
    description: 'Forma especialistas en el estudio del crimen, sus causas y la investigación científica de evidencias para el sistema de justicia.',
    competencies: [
      'Investigación criminológica',
      'Análisis de evidencias físicas',
      'Perfilación criminal',
      'Conocimientos forenses',
      'Pensamiento analítico y deductivo'
    ],
    workEnvironment: 'Ministerios públicos, policía investigadora, peritos forenses, consultoría privada, seguridad',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con pensamiento analítico, interés en la justicia y capacidad para resolver problemas complejos'
  },
  {
    id: 'derecho',
    name: 'Licenciatura en Derecho',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'ESC',
    primaryTypes: ['E', 'S', 'C'],
    description: 'Prepara abogados competentes en el conocimiento, interpretación y aplicación de las normas jurídicas para la defensa de derechos.',
    competencies: [
      'Interpretación y argumentación jurídica',
      'Litigio y representación legal',
      'Redacción de documentos legales',
      'Negociación y mediación',
      'Conocimiento del sistema judicial'
    ],
    workEnvironment: 'Despachos jurídicos, juzgados, notarías, empresas, gobierno, organismos internacionales',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas con habilidades de argumentación, interés en la justicia y capacidad para defender causas'
  },
  {
    id: 'arquitectura',
    name: 'Licenciatura en Arquitectura',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'ARI',
    primaryTypes: ['A', 'R', 'I'],
    description: 'Forma diseñadores del espacio habitable que crean proyectos arquitectónicos funcionales, estéticos y sustentables.',
    competencies: [
      'Diseño arquitectónico y urbano',
      'Dibujo técnico y modelado 3D',
      'Conocimientos estructurales',
      'Gestión de proyectos constructivos',
      'Creatividad y visión espacial'
    ],
    workEnvironment: 'Despachos de arquitectura, construcción, diseño urbano, consultoría, obra pública',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas creativas con visión espacial, interés en el diseño y habilidades técnicas'
  },
  {
    id: 'idiomas',
    name: 'Licenciatura en Idiomas',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'SAI',
    primaryTypes: ['S', 'A', 'I'],
    description: 'Desarrolla profesionales multilingües capacitados en la enseñanza, traducción e interpretación de lenguas extranjeras.',
    competencies: [
      'Dominio de múltiples idiomas',
      'Traducción e interpretación',
      'Enseñanza de lenguas',
      'Comunicación intercultural',
      'Análisis lingüístico'
    ],
    workEnvironment: 'Instituciones educativas, empresas multinacionales, traducción, turismo, diplomacia',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas con facilidad para los idiomas, interés en otras culturas y habilidades comunicativas'
  },
  {
    id: 'educacion',
    name: 'Licenciatura en Ciencias de la Educación',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'SAI',
    primaryTypes: ['S', 'A', 'I'],
    description: 'Forma educadores comprometidos con procesos de enseñanza-aprendizaje innovadores y el desarrollo integral de las personas.',
    competencies: [
      'Diseño de estrategias pedagógicas',
      'Evaluación del aprendizaje',
      'Psicología educativa',
      'Uso de tecnologías educativas',
      'Liderazgo educativo'
    ],
    workEnvironment: 'Escuelas, instituciones educativas, capacitación empresarial, educación en línea, investigación',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con vocación docente, paciencia y pasión por transmitir conocimientos'
  },
  {
    id: 'diseno-interiores',
    name: 'Licenciatura en Diseño de Interiores',
    area: 'Ciencias Sociales y Humanidades',
    riasecProfile: 'ARI',
    primaryTypes: ['A', 'R', 'I'],
    description: 'Capacita diseñadores especializados en crear espacios interiores funcionales, estéticos y que mejoren la calidad de vida.',
    competencies: [
      'Diseño de espacios interiores',
      'Selección de mobiliario y materiales',
      'Iluminación y color',
      'Dibujo técnico y renderizado',
      'Gestión de proyectos de interiorismo'
    ],
    workEnvironment: 'Estudios de diseño, arquitectura, retail, hoteles, consultoría, independiente',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas creativas con sentido estético, atención al detalle y visión espacial'
  },

  // ==================== ÁREA DE NEGOCIOS ====================
  {
    id: 'administracion-turistica-gastronomia',
    name: 'Licenciatura en Administración Turística y Gastronomía',
    area: 'Negocios',
    riasecProfile: 'ESA',
    primaryTypes: ['E', 'S', 'A'],
    description: 'Forma profesionales en gestión de servicios turísticos y gastronómicos con visión empresarial y orientación al cliente.',
    competencies: [
      'Administración de empresas turísticas',
      'Gestión hotelera y restaurantera',
      'Arte culinario y gastronomía',
      'Marketing turístico',
      'Atención y servicio al cliente'
    ],
    workEnvironment: 'Hoteles, restaurantes, agencias de viajes, turismo, eventos, consultoría gastronómica',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con pasión por el servicio, la gastronomía y habilidades interpersonales'
  },
  {
    id: 'administracion-empresas',
    name: 'Licenciatura en Administración de Empresas',
    area: 'Negocios',
    riasecProfile: 'ECS',
    primaryTypes: ['E', 'C', 'S'],
    description: 'Prepara líderes empresariales con capacidad para administrar recursos, tomar decisiones estratégicas y gestionar organizaciones.',
    competencies: [
      'Planeación estratégica',
      'Gestión de recursos humanos',
      'Finanzas corporativas',
      'Marketing y ventas',
      'Liderazgo organizacional'
    ],
    workEnvironment: 'Empresas privadas, sector público, consultoría, emprendimiento, multinacionales',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas con visión de negocios, habilidades de liderazgo y capacidad para tomar decisiones'
  },
  {
    id: 'contaduria',
    name: 'Licenciatura en Contaduría',
    area: 'Negocios',
    riasecProfile: 'CEI',
    primaryTypes: ['C', 'E', 'I'],
    description: 'Forma contadores públicos expertos en información financiera, auditoría y cumplimiento fiscal para la toma de decisiones.',
    competencies: [
      'Contabilidad financiera y fiscal',
      'Auditoría y control interno',
      'Análisis financiero',
      'Normatividad contable',
      'Tecnologías contables'
    ],
    workEnvironment: 'Despachos contables, empresas, auditoría, consultoría fiscal, sector financiero',
    duration: '3 años y 4 meses',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas analíticas, organizadas, con habilidades numéricas y atención al detalle'
  },
  {
    id: 'economia-finanzas',
    name: 'Licenciatura en Economía y Finanzas',
    area: 'Negocios',
    riasecProfile: 'CIE',
    primaryTypes: ['C', 'I', 'E'],
    description: 'Forma profesionales capaces de analizar fenómenos económicos, gestionar recursos financieros y diseñar estrategias de inversión y política económica.',
    competencies: [
      'Análisis macroeconómico y microeconómico',
      'Gestión de portafolios de inversión',
      'Modelado financiero y estadístico',
      'Evaluación de proyectos de inversión',
      'Política fiscal y monetaria'
    ],
    workEnvironment: 'Bancos, casas de bolsa, gobierno, organismos internacionales, consultoría financiera, empresas privadas',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas con pensamiento analítico, interés en la economía global, habilidades matemáticas y visión estratégica'
  },
  {
    id: 'marketing-digital',
    name: 'Licenciatura en Marketing Digital',
    area: 'Negocios',
    riasecProfile: 'EAC',
    primaryTypes: ['E', 'A', 'C'],
    description: 'Desarrolla profesionales especializados en estrategias de mercadotecnia en medios digitales, comercio electrónico y gestión de marcas en el entorno online.',
    competencies: [
      'Estrategias de marketing en redes sociales',
      'Publicidad digital y SEM/SEO',
      'Creación de contenido y branding',
      'Analítica web y métricas de rendimiento',
      'Comercio electrónico y ventas online'
    ],
    workEnvironment: 'Agencias de marketing, empresas de comercio electrónico, startups, medios digitales, consultoría, freelance',
    duration: '3 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas creativas con visión comercial, interés en tecnología digital y habilidades de comunicación persuasiva'
  },

  // ==================== ÁREA DE INGENIERÍAS ====================
  {
    id: 'ingenieria-industrial',
    name: 'Ingeniería Industrial',
    area: 'Ingenierías',
    riasecProfile: 'RIE',
    primaryTypes: ['R', 'I', 'E'],
    description: 'Forma ingenieros especializados en optimización de procesos productivos, gestión de operaciones y mejora de la eficiencia.',
    competencies: [
      'Optimización de procesos',
      'Control de calidad',
      'Gestión de la cadena de suministro',
      'Ingeniería de métodos',
      'Análisis y mejora continua'
    ],
    workEnvironment: 'Industria manufacturera, logística, producción, consultoría, plantas de fabricación',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina', '100% en línea'],
    profileMatch: 'Personas con pensamiento lógico, interés en la eficiencia y capacidad para resolver problemas complejos'
  },
  {
    id: 'ingenieria-sistemas',
    name: 'Ingeniería en Sistemas y Tecnologías de la Información',
    area: 'Ingenierías',
    riasecProfile: 'IRC',
    primaryTypes: ['I', 'R', 'C'],
    description: 'Desarrolla ingenieros expertos en diseño, desarrollo e implementación de sistemas computacionales y soluciones tecnológicas.',
    competencies: [
      'Programación y desarrollo de software',
      'Administración de bases de datos',
      'Redes y ciberseguridad',
      'Análisis de sistemas',
      'Gestión de proyectos TI'
    ],
    workEnvironment: 'Empresas tecnológicas, desarrollo de software, consultoría TI, startups, sector financiero',
    duration: '4 años',
    modalities: ['Escolarizada', 'Sabatina'],
    profileMatch: 'Personas con pensamiento lógico, interés en la tecnología y habilidades para resolver problemas'
  }
];

// Función para obtener carreras por área
export function getCareersByArea(area: UDHICareer['area']): UDHICareer[] {
  return udhiCareers.filter(career => career.area === area);
}

// Función para obtener carreras por tipo RIASEC
export function getCareersByRIASEC(riasecTypes: string[]): UDHICareer[] {
  return udhiCareers.filter(career =>
    riasecTypes.some(type => career.primaryTypes.includes(type))
  );
}

// Hexagonal distance between two RIASEC types
function hexagonalDistance(a: string, b: string): number {
  const hexagon = ['R', 'I', 'A', 'S', 'E', 'C'];
  const idx1 = hexagon.indexOf(a);
  const idx2 = hexagon.indexOf(b);
  if (idx1 === -1 || idx2 === -1) return 0;
  const dist = Math.min(Math.abs(idx1 - idx2), 6 - Math.abs(idx1 - idx2));
  // same=3, adjacent=2, alternate=1, opposite=0
  return Math.max(0, 3 - dist);
}

// C-Index de Brown & Gore: C = 3(X₁) + 2(X₂) + 1(X₃)
function calculateCIndex(studentCode: string[], careerCode: string[]): number {
  let cIndex = 0;
  const weights = [3, 2, 1];
  for (let i = 0; i < Math.min(3, studentCode.length); i++) {
    cIndex += weights[i] * hexagonalDistance(studentCode[i], careerCode[i] || '');
  }
  return cIndex; // Range: 0-18
}

// Cosine similarity between two 6-dimension RIASEC vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < 6; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Build RIASEC vector from primaryTypes: 1st=5, 2nd=3, 3rd=1, rest=0
function careerToVector(career: UDHICareer): number[] {
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  const weights = [5, 3, 1];
  return types.map(t => {
    const idx = career.primaryTypes.indexOf(t);
    return idx >= 0 && idx < 3 ? weights[idx] : 0;
  });
}

// Función para calcular compatibilidad entre perfil del estudiante y carrera
// Uses 70% C-Index + 30% Cosine similarity
export function calculateCareerMatch(
  studentScores: { [key: string]: number },
  career: UDHICareer,
  studentHollandCode?: string[]
): number {
  const types: string[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  // Derive student Holland code from scores if not provided
  const code = studentHollandCode || types
    .map(t => ({ type: t, score: studentScores[t] || 0 }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.type);

  // C-Index (normalized to 0-100)
  const cIndex = calculateCIndex(code.slice(0, 3), career.primaryTypes);
  const cIndexNorm = (cIndex / 18) * 100;

  // Cosine similarity of full 6D vectors (normalized to 0-100)
  const studentVector = types.map(t => studentScores[t] || 0);
  const careerVector = careerToVector(career);
  const cosine = cosineSimilarity(studentVector, careerVector) * 100;

  // Weighted: 70% C-Index + 30% Cosine
  return Math.min(100, Math.round(cIndexNorm * 0.7 + cosine * 0.3));
}
