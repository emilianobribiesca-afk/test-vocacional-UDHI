// Test Vocacional Profesional V3 - 72 Preguntas RIASEC + 8 Control
// Basado en O*NET Interest Profiler, SDS, validaciones mexicanas
// 12 items por dimensión (4 actividades + 4 competencias + 4 ocupaciones)

import { udhiCareers, UDHICareer, calculateCareerMatch } from './udhiCareers';

export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export type Question = {
  id: number;
  text: string;
  category: RIASECType;
  isControl?: boolean;
  consistencyPair?: number;
  domain?: 'activity' | 'competency' | 'occupation';
  controlType?: 'infrequency' | 'directed';
  directedResponse?: LikertScale;
};

export type LikertScale = 1 | 2 | 3 | 4 | 5;

export type TestAnswers = {
  [questionId: number]: LikertScale;
};

// ==================== 72 PREGUNTAS RIASEC + 8 CONTROL ====================
// 12 preguntas por dimensión: 4 actividades + 4 competencias + 4 ocupaciones

export const professionalQuestions: Question[] = [
  // ==================== REALISTIC (R) - IDs 1-12 ====================
  { id: 1, text: 'Me gustaría reparar el motor de un automóvil', category: 'R', domain: 'activity' },
  { id: 2, text: 'Me gustaría cultivar hortalizas en un terreno agrícola', category: 'R', domain: 'activity' },
  { id: 3, text: 'Me gustaría armar un mueble de madera con herramientas manuales', category: 'R', domain: 'activity' },
  { id: 4, text: 'Me gustaría cablear una instalación eléctrica en una casa', category: 'R', domain: 'activity' },
  { id: 5, text: 'Soy bueno/a resolviendo fallas en aparatos electrónicos', category: 'R', domain: 'competency' },
  { id: 6, text: 'Soy bueno/a usando herramientas como taladro, sierra o soldadora', category: 'R', domain: 'competency' },
  { id: 7, text: 'Soy bueno/a armando y desarmando objetos mecánicos', category: 'R', domain: 'competency' },
  { id: 8, text: 'Soy bueno/a realizando actividades que requieren fuerza o resistencia física', category: 'R', domain: 'competency' },
  { id: 9, text: 'Me gustaría trabajar como técnico de mantenimiento industrial', category: 'R', domain: 'occupation' },
  { id: 10, text: 'Me gustaría trabajar como operador de maquinaria de construcción', category: 'R', domain: 'occupation' },
  { id: 11, text: 'Me gustaría trabajar como electricista o plomero profesional', category: 'R', domain: 'occupation' },
  { id: 12, text: 'Me gustaría trabajar como mecánico automotriz', category: 'R', domain: 'occupation' },

  // ==================== INVESTIGATIVE (I) - IDs 13-24 ====================
  { id: 13, text: 'Me gustaría realizar experimentos en un laboratorio de ciencias', category: 'I', domain: 'activity' },
  { id: 14, text: 'Me gustaría analizar datos estadísticos para encontrar patrones', category: 'I', domain: 'activity' },
  { id: 15, text: 'Me gustaría observar organismos al microscopio', category: 'I', domain: 'activity' },
  { id: 16, text: 'Me gustaría leer artículos de investigación sobre avances científicos', category: 'I', domain: 'activity' },
  { id: 17, text: 'Soy bueno/a resolviendo problemas matemáticos complejos', category: 'I', domain: 'competency' },
  { id: 18, text: 'Soy bueno/a formulando hipótesis y comprobándolas con evidencia', category: 'I', domain: 'competency' },
  { id: 19, text: 'Soy bueno/a interpretando gráficas y tablas de datos', category: 'I', domain: 'competency' },
  { id: 20, text: 'Soy bueno/a entendiendo cómo funcionan los procesos químicos o biológicos', category: 'I', domain: 'competency' },
  { id: 21, text: 'Me gustaría trabajar como investigador/a en un centro de ciencias', category: 'I', domain: 'occupation' },
  { id: 22, text: 'Me gustaría trabajar como analista de datos en una empresa', category: 'I', domain: 'occupation' },
  { id: 23, text: 'Me gustaría trabajar como biólogo/a o químico/a', category: 'I', domain: 'occupation' },
  { id: 24, text: 'Me gustaría trabajar como médico/a especialista en diagnóstico', category: 'I', domain: 'occupation' },

  // ==================== ARTISTIC (A) - IDs 25-36 ====================
  { id: 25, text: 'Me gustaría pintar un cuadro o hacer una escultura', category: 'A', domain: 'activity' },
  { id: 26, text: 'Me gustaría actuar en una obra de teatro o cortometraje', category: 'A', domain: 'activity' },
  { id: 27, text: 'Me gustaría componer canciones o tocar un instrumento musical', category: 'A', domain: 'activity' },
  { id: 28, text: 'Me gustaría escribir cuentos, poesía o guiones', category: 'A', domain: 'activity' },
  { id: 29, text: 'Soy bueno/a combinando colores, formas y texturas en mis trabajos', category: 'A', domain: 'competency' },
  { id: 30, text: 'Soy bueno/a expresando ideas o emociones a través del arte', category: 'A', domain: 'competency' },
  { id: 31, text: 'Soy bueno/a tomando fotografías con composición artística', category: 'A', domain: 'competency' },
  { id: 32, text: 'Soy bueno/a improvisando o creando algo original sin un plan rígido', category: 'A', domain: 'competency' },
  { id: 33, text: 'Me gustaría trabajar como artista visual o ilustrador/a', category: 'A', domain: 'occupation' },
  { id: 34, text: 'Me gustaría trabajar como músico/a, actor/actriz o bailarín/a', category: 'A', domain: 'occupation' },
  { id: 35, text: 'Me gustaría trabajar como director/a de cine o productor/a audiovisual', category: 'A', domain: 'occupation' },
  { id: 36, text: 'Me gustaría trabajar como chef creativo/a o estilista de moda', category: 'A', domain: 'occupation' },

  // ==================== SOCIAL (S) - IDs 37-48 ====================
  { id: 37, text: 'Me gustaría enseñar una materia a un grupo de estudiantes', category: 'S', domain: 'activity' },
  { id: 38, text: 'Me gustaría escuchar y aconsejar a una persona con problemas emocionales', category: 'S', domain: 'activity' },
  { id: 39, text: 'Me gustaría organizar una campaña de salud en una comunidad rural', category: 'S', domain: 'activity' },
  { id: 40, text: 'Me gustaría mediar un conflicto entre dos personas para llegar a un acuerdo', category: 'S', domain: 'activity' },
  { id: 41, text: 'Soy bueno/a explicando temas difíciles de forma que otros los entiendan', category: 'S', domain: 'competency' },
  { id: 42, text: 'Soy bueno/a haciendo que las personas se sientan escuchadas y comprendidas', category: 'S', domain: 'competency' },
  { id: 43, text: 'Soy bueno/a trabajando en equipo y motivando a los demás', category: 'S', domain: 'competency' },
  { id: 44, text: 'Soy bueno/a cuidando personas enfermas o con necesidades especiales', category: 'S', domain: 'competency' },
  { id: 45, text: 'Me gustaría trabajar como maestro/a o capacitador/a', category: 'S', domain: 'occupation' },
  { id: 46, text: 'Me gustaría trabajar como psicólogo/a o consejero/a', category: 'S', domain: 'occupation' },
  { id: 47, text: 'Me gustaría trabajar como enfermero/a o terapeuta', category: 'S', domain: 'occupation' },
  { id: 48, text: 'Me gustaría trabajar como trabajador/a social o defensor/a de derechos humanos', category: 'S', domain: 'occupation' },

  // ==================== ENTERPRISING (E) - IDs 49-60 ====================
  { id: 49, text: 'Me gustaría liderar un equipo para lograr un objetivo importante', category: 'E', domain: 'activity' },
  { id: 50, text: 'Me gustaría convencer a un grupo de personas de apoyar un proyecto', category: 'E', domain: 'activity' },
  { id: 51, text: 'Me gustaría negociar un contrato o acuerdo comercial', category: 'E', domain: 'activity' },
  { id: 52, text: 'Me gustaría lanzar mi propio negocio o emprendimiento', category: 'E', domain: 'activity' },
  { id: 53, text: 'Soy bueno/a tomando decisiones rápidas bajo presión', category: 'E', domain: 'competency' },
  { id: 54, text: 'Soy bueno/a hablando en público y presentando ideas', category: 'E', domain: 'competency' },
  { id: 55, text: 'Soy bueno/a detectando oportunidades donde otros no las ven', category: 'E', domain: 'competency' },
  { id: 56, text: 'Soy bueno/a motivando a otros para que den su mejor esfuerzo', category: 'E', domain: 'competency' },
  { id: 57, text: 'Me gustaría trabajar como gerente o director/a de una empresa', category: 'E', domain: 'occupation' },
  { id: 58, text: 'Me gustaría trabajar como ejecutivo/a de ventas o marketing', category: 'E', domain: 'occupation' },
  { id: 59, text: 'Me gustaría trabajar como político/a o líder de una organización', category: 'E', domain: 'occupation' },
  { id: 60, text: 'Me gustaría trabajar como organizador/a de eventos o productor/a de espectáculos', category: 'E', domain: 'occupation' },

  // ==================== CONVENTIONAL (C) - IDs 61-72 ====================
  { id: 61, text: 'Me gustaría llevar el registro contable de ingresos y gastos de un negocio', category: 'C', domain: 'activity' },
  { id: 62, text: 'Me gustaría clasificar y archivar documentos importantes en orden', category: 'C', domain: 'activity' },
  { id: 63, text: 'Me gustaría revisar que un informe no tenga errores antes de entregarlo', category: 'C', domain: 'activity' },
  { id: 64, text: 'Me gustaría preparar una hoja de cálculo con datos financieros', category: 'C', domain: 'activity' },
  { id: 65, text: 'Soy bueno/a detectando errores en documentos o números', category: 'C', domain: 'competency' },
  { id: 66, text: 'Soy bueno/a siguiendo instrucciones y procedimientos paso a paso', category: 'C', domain: 'competency' },
  { id: 67, text: 'Soy bueno/a organizando información en carpetas, tablas o bases de datos', category: 'C', domain: 'competency' },
  { id: 68, text: 'Soy bueno/a trabajando con precisión y sin saltar pasos', category: 'C', domain: 'competency' },
  { id: 69, text: 'Me gustaría trabajar como contador/a o auditor/a', category: 'C', domain: 'occupation' },
  { id: 70, text: 'Me gustaría trabajar como asistente administrativo/a o secretario/a ejecutivo/a', category: 'C', domain: 'occupation' },
  { id: 71, text: 'Me gustaría trabajar como especialista en nóminas o impuestos', category: 'C', domain: 'occupation' },
  { id: 72, text: 'Me gustaría trabajar como encargado/a de inventarios o control de calidad', category: 'C', domain: 'occupation' },

  // ==================== PREGUNTAS DE CONTROL (IDs 73-80) ====================
  // Infrecuencia (73-78): respuesta esperada = 1
  { id: 73, text: 'He viajado personalmente a otro planeta', category: 'R', isControl: true, controlType: 'infrequency' },
  { id: 74, text: 'Puedo ver a través de las paredes con mi vista', category: 'I', isControl: true, controlType: 'infrequency' },
  { id: 75, text: 'Puedo respirar debajo del agua sin ningún equipo', category: 'A', isControl: true, controlType: 'infrequency' },
  { id: 76, text: 'He ganado una medalla olímpica en tres deportes diferentes', category: 'S', isControl: true, controlType: 'infrequency' },
  { id: 77, text: 'Puedo comunicarme telepáticamente con animales', category: 'E', isControl: true, controlType: 'infrequency' },
  { id: 78, text: 'He leído absolutamente todos los libros que existen', category: 'C', isControl: true, controlType: 'infrequency' },
  // Respuesta dirigida (79-80)
  { id: 79, text: 'Para esta pregunta selecciona \'Interesante\'', category: 'R', isControl: true, controlType: 'directed', directedResponse: 4 },
  { id: 80, text: 'Para esta pregunta selecciona \'Algo interesante\'', category: 'I', isControl: true, controlType: 'directed', directedResponse: 3 },
];

// Orden de presentación intercalado (80 posiciones)
// Nunca 2 items consecutivos de la misma dimensión
// Control questions distribuidas en posiciones ~10, 20, 30, 40, 50, 60, 70, 80
export const questionOrder: number[] = [
  1, 13, 25, 37, 49, 61,     // Pos 1-6
  5, 17, 73, 29,              // Pos 7-10 (CTRL-73 at pos 9)
  41, 53, 65, 2, 14, 26,     // Pos 11-16
  38, 50, 62, 74,             // Pos 17-20 (CTRL-74 at pos 20)
  9, 21, 33, 45, 57, 69,     // Pos 21-26
  6, 18, 30, 75,              // Pos 27-30 (CTRL-75 at pos 30)
  42, 54, 66, 3, 15, 27,     // Pos 31-36
  39, 51, 63, 76,             // Pos 37-40 (CTRL-76 at pos 40)
  10, 22, 34, 46, 58, 70,    // Pos 41-46
  7, 19, 31, 77,              // Pos 47-50 (CTRL-77 at pos 50)
  43, 55, 67, 4, 16, 28,     // Pos 51-56
  40, 52, 64, 78,             // Pos 57-60 (CTRL-78 at pos 60)
  11, 23, 35, 47, 59, 71,    // Pos 61-66
  8, 20, 44, 79,              // Pos 67-70 (CTRL-79 at pos 70)
  56, 68, 12, 24, 36, 48,    // Pos 71-76
  60, 72, 32, 80              // Pos 77-80 (CTRL-80 at pos 80)
];

// Escala Likert 5 puntos - Etiquetas de interés (Fix #3)
export const likertOptions = [
  { value: 1 as LikertScale, label: 'Nada interesante', shortLabel: 'Nada' },
  { value: 2 as LikertScale, label: 'Poco interesante', shortLabel: 'Poco' },
  { value: 3 as LikertScale, label: 'Algo interesante', shortLabel: 'Algo' },
  { value: 4 as LikertScale, label: 'Interesante', shortLabel: 'Interesante' },
  { value: 5 as LikertScale, label: 'Muy interesante', shortLabel: 'Mucho' },
];

// Pares de consistencia
export const consistencyPairs = [
  { q1: 1, q2: 7, description: 'Ambas sobre habilidades mecánicas (R)' },
  { q1: 13, q2: 18, description: 'Ambas sobre método científico (I)' },
  { q1: 25, q2: 30, description: 'Ambas sobre expresión artística (A)' },
  { q1: 37, q2: 41, description: 'Ambas sobre enseñanza/explicación (S)' },
  { q1: 49, q2: 56, description: 'Ambas sobre liderazgo/motivación (E)' },
  { q1: 61, q2: 65, description: 'Ambas sobre precisión con datos (C)' },
];

// ==================== TIPOS Y INTERFACES ====================

export interface RIASECCategory {
  id: RIASECType;
  name: string;
  fullName: string;
  description: string;
  characteristics: string[];
  workEnvironment: string;
  values: string[];
  developmentTips: string[];
}

export interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  recommendation: 'VALID' | 'CAUTION' | 'INVALID';
  details: {
    infrequencyScore: number;
    inconsistencyCount: number;
    responseVariance: number;
    completionTime?: number;
    directedFailCount: number;
  };
}

export interface DetailedResults {
  scores: RIASECScores;
  percentages: {
    category: RIASECType;
    percentage: number;
    percentile: number;
    rawScore: number;
  }[];
  hollandCode: string;
  alternativeHollandCodes?: string[];
  consistency: number;
  differentiation: number;
  predigerDimensions?: { peopleVsThings: number; ideasVsData: number };
  primaryType: RIASECCategory;
  secondaryType: RIASECCategory;
  tertiaryType: RIASECCategory;
  recommendations: string[];
  topCareers: {
    name: string;
    description: string;
    matchPercentage: number;
    primaryReason: string;
    area?: string;
    duration?: string;
    modalities?: string[];
  }[];
  validation: ValidationResult;
}

// Categorías RIASEC
export const riasecCategories: RIASECCategory[] = [
  {
    id: 'R',
    name: 'Realista',
    fullName: 'Realista (Hacedor)',
    description: 'Personas prácticas y orientadas a la acción que prefieren trabajar con herramientas, máquinas y objetos físicos. Disfrutan resolver problemas concretos con resultados tangibles.',
    characteristics: [
      'Habilidades técnicas y manuales',
      'Pensamiento práctico y concreto',
      'Preferencia por actividades físicas',
      'Trabajo independiente',
      'Atención a detalles técnicos'
    ],
    workEnvironment: 'Talleres, laboratorios, exteriores, fábricas. Ambientes con herramientas y equipos especializados.',
    values: ['Resultados tangibles', 'Autonomía', 'Habilidad técnica', 'Practicidad'],
    developmentTips: [
      'Desarrolla habilidades técnicas especializadas',
      'Busca certificaciones en áreas técnicas',
      'Practica con herramientas y tecnología'
    ]
  },
  {
    id: 'I',
    name: 'Investigador',
    fullName: 'Investigador (Pensador)',
    description: 'Personas analíticas e intelectuales que disfrutan la investigación, el análisis y la resolución de problemas complejos. Orientadas al pensamiento científico y abstracto.',
    characteristics: [
      'Pensamiento analítico y crítico',
      'Curiosidad intelectual',
      'Método científico',
      'Trabajo independiente',
      'Resolución de problemas complejos'
    ],
    workEnvironment: 'Laboratorios, centros de investigación, universidades, hospitales. Ambientes de análisis profundo.',
    values: ['Conocimiento', 'Innovación', 'Rigor científico', 'Descubrimiento'],
    developmentTips: [
      'Desarrolla habilidades de investigación',
      'Practica el método científico',
      'Participa en proyectos de investigación'
    ]
  },
  {
    id: 'A',
    name: 'Artístico',
    fullName: 'Artístico (Creador)',
    description: 'Personas creativas e innovadoras que valoran la expresión personal y la originalidad. Disfrutan crear, diseñar y encontrar soluciones donde puedan aportar su visión propia.',
    characteristics: [
      'Creatividad e imaginación',
      'Pensamiento original',
      'Sensibilidad estética',
      'Expresión personal',
      'Flexibilidad'
    ],
    workEnvironment: 'Estudios creativos, agencias, medios, talleres. Ambientes flexibles y no rutinarios.',
    values: ['Expresión personal', 'Originalidad', 'Belleza', 'Innovación'],
    developmentTips: [
      'Desarrolla tu portafolio creativo',
      'Explora diferentes medios artísticos',
      'Busca feedback de profesionales'
    ]
  },
  {
    id: 'S',
    name: 'Social',
    fullName: 'Social (Ayudador)',
    description: 'Personas orientadas a las relaciones interpersonales que disfrutan ayudar, enseñar, cuidar y servir a otros. Valoran la cooperación y el impacto social.',
    characteristics: [
      'Empatía y comprensión',
      'Habilidades interpersonales',
      'Orientación al servicio',
      'Comunicación efectiva',
      'Trabajo en equipo'
    ],
    workEnvironment: 'Escuelas, hospitales, organizaciones sociales, centros comunitarios. Ambientes colaborativos.',
    values: ['Ayudar a otros', 'Relaciones significativas', 'Bienestar social', 'Cooperación'],
    developmentTips: [
      'Desarrolla habilidades de comunicación',
      'Practica la escucha activa',
      'Participa en voluntariado'
    ]
  },
  {
    id: 'E',
    name: 'Emprendedor',
    fullName: 'Emprendedor (Persuasor)',
    description: 'Personas ambiciosas y persuasivas que disfrutan liderar, influir y tomar decisiones estratégicas. Orientadas al logro y los resultados.',
    characteristics: [
      'Liderazgo y persuasión',
      'Orientación a resultados',
      'Toma de decisiones',
      'Asunción de riesgos',
      'Visión estratégica'
    ],
    workEnvironment: 'Oficinas corporativas, ventas, negocios, política. Ambientes competitivos y dinámicos.',
    values: ['Éxito', 'Poder e influencia', 'Liderazgo', 'Reconocimiento'],
    developmentTips: [
      'Desarrolla habilidades de liderazgo',
      'Practica la negociación',
      'Construye red de contactos'
    ]
  },
  {
    id: 'C',
    name: 'Convencional',
    fullName: 'Convencional (Organizador)',
    description: 'Personas ordenadas y precisas que disfrutan trabajar con datos, números y procedimientos establecidos. Valoran la estructura, la eficiencia y la exactitud.',
    characteristics: [
      'Organización y método',
      'Atención al detalle',
      'Precisión y exactitud',
      'Seguimiento de procedimientos',
      'Confiabilidad'
    ],
    workEnvironment: 'Oficinas, bancos, administración, contabilidad. Entornos estructurados y organizados.',
    values: ['Orden', 'Eficiencia', 'Precisión', 'Estabilidad'],
    developmentTips: [
      'Perfecciona habilidades organizacionales',
      'Domina software especializado',
      'Desarrolla atención al detalle'
    ]
  }
];

// ==================== FUNCIONES DE VALIDACIÓN ====================

/**
 * Valida la calidad de las respuestas del test (Fix #9)
 * 6 items infrecuencia + 2 items respuesta dirigida
 */
export function validateTestResponses(
  answers: TestAnswers,
  timeData?: { startTime: number; endTime: number }
): ValidationResult {
  const warnings: string[] = [];

  // 1. Validar preguntas de infrecuencia (IDs 73-78): flag si respuesta >= 4
  const infrequencyQuestions = professionalQuestions.filter(q => q.controlType === 'infrequency');
  let infrequencyScore = 0;

  infrequencyQuestions.forEach(q => {
    const response = answers[q.id];
    if (response && response >= 4) {
      infrequencyScore++;
    }
  });

  // 2. Validar respuesta dirigida (IDs 79-80): flag si no coincide exactamente
  const directedQuestions = professionalQuestions.filter(q => q.controlType === 'directed');
  let directedFailCount = 0;

  directedQuestions.forEach(q => {
    const response = answers[q.id];
    if (response && q.directedResponse && response !== q.directedResponse) {
      directedFailCount++;
    }
  });

  // Umbral INVALID: >= 4 infrecuencia fails O >= 2 directed fails
  // Umbral CAUTION: >= 2 infrecuencia fails O >= 1 directed fail
  if (infrequencyScore >= 4 || directedFailCount >= 2) {
    warnings.push('INFREQUENCY_HIGH');
  } else if (infrequencyScore >= 2 || directedFailCount >= 1) {
    warnings.push('INFREQUENCY_MODERATE');
  }

  // 3. Validar consistencia interna (pares de preguntas similares)
  let inconsistencyCount = 0;

  consistencyPairs.forEach(pair => {
    const resp1 = answers[pair.q1];
    const resp2 = answers[pair.q2];

    if (resp1 && resp2) {
      const difference = Math.abs(resp1 - resp2);
      if (difference > 2) {
        inconsistencyCount++;
      }
    }
  });

  if (inconsistencyCount >= 4) {
    warnings.push('INCONSISTENCY_HIGH');
  } else if (inconsistencyCount >= 2) {
    warnings.push('INCONSISTENCY_MODERATE');
  }

  // 4. Validar varianza de respuestas (solo regulares)
  const regularQuestions = professionalQuestions.filter(q => !q.isControl);
  const responses = regularQuestions
    .map(q => answers[q.id])
    .filter((r): r is LikertScale => r !== undefined);
  const mean = responses.reduce((sum, r) => sum + r, 0) / responses.length;
  const variance = responses.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / responses.length;

  if (variance < 0.5) {
    warnings.push('LOW_VARIANCE');
  }

  // 5. Detectar acquiescence bias
  const highResponses = responses.filter(r => r >= 4).length;
  const lowResponses = responses.filter(r => r <= 2).length;
  const totalResponses = responses.length;

  if (highResponses / totalResponses > 0.85) {
    warnings.push('ACQUIESCENCE_HIGH');
  } else if (lowResponses / totalResponses > 0.85) {
    warnings.push('ACQUIESCENCE_LOW');
  }

  // 6. Validar tiempo de completación
  let completionTime: number | undefined;
  if (timeData) {
    completionTime = (timeData.endTime - timeData.startTime) / 1000;
    const avgTimePerItem = completionTime / Object.keys(answers).length;

    if (avgTimePerItem < 3) {
      warnings.push('TOO_FAST');
    } else if (completionTime > 3600) {
      warnings.push('TOO_SLOW');
    }
  }

  // Determinar recomendación final
  let recommendation: 'VALID' | 'CAUTION' | 'INVALID';

  if (infrequencyScore >= 4 || directedFailCount >= 2) {
    recommendation = 'INVALID';
  } else if (infrequencyScore >= 2 || directedFailCount >= 1 || warnings.length > 2) {
    recommendation = 'CAUTION';
  } else if (warnings.length === 0) {
    recommendation = 'VALID';
  } else {
    recommendation = 'CAUTION';
  }

  return {
    isValid: recommendation !== 'INVALID',
    warnings,
    recommendation,
    details: {
      infrequencyScore,
      inconsistencyCount,
      responseVariance: variance,
      completionTime,
      directedFailCount
    }
  };
}

// ==================== FUNCIONES DE CÁLCULO ====================

const RIASEC_ORDER: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
const MIN_SCORE_PER_CATEGORY = 12; // 12 items × 1 punto
const MAX_SCORE_PER_CATEGORY = 60; // 12 items × 5 puntos

/**
 * Scoring corregido (Fix #1): percentage = (raw - min) / (max - min) * 100
 */
function calculatePercentage(rawScore: number): number {
  return Math.round(((rawScore - MIN_SCORE_PER_CATEGORY) / (MAX_SCORE_PER_CATEGORY - MIN_SCORE_PER_CATEGORY)) * 100);
}

/**
 * Scoring ipsativo (Fix #2): Z-score dentro del perfil del propio estudiante
 */
function calculateIpsativePercentile(rawScore: number, allScores: number[]): number {
  const mean = allScores.reduce((s, v) => s + v, 0) / allScores.length;
  const sd = Math.sqrt(allScores.reduce((s, v) => s + (v - mean) ** 2, 0) / allScores.length);
  return Math.max(0, Math.min(100, Math.round(50 + ((rawScore - mean) / (sd || 1)) * 25)));
}

/**
 * Consistencia hexagonal
 */
function calculateConsistency(hollandCode: string): number {
  const hexagon = RIASEC_ORDER;
  const first = hollandCode[0];
  const second = hollandCode[1];

  const idx1 = hexagon.indexOf(first as RIASECType);
  const idx2 = hexagon.indexOf(second as RIASECType);

  const distance = Math.min(
    Math.abs(idx1 - idx2),
    6 - Math.abs(idx1 - idx2)
  );

  if (distance === 1) return 3;
  if (distance === 2) return 2;
  return 1;
}

/**
 * Diferenciación basada en SD (Fix #2 mejora)
 */
function calculateDifferentiation(rawScores: number[]): number {
  const mean = rawScores.reduce((s, v) => s + v, 0) / rawScores.length;
  const sd = Math.sqrt(rawScores.reduce((s, v) => s + (v - mean) ** 2, 0) / rawScores.length);
  // max SD teórica ~20, normalizada a 0-100, clamped
  return Math.min(100, Math.round((sd / 20) * 100));
}

/**
 * Holland Code con tie-breaking (Fix #10)
 * Sort por rawScore desc, empates por orden RIASEC (R<I<A<S<E<C)
 * Genera alternativeHollandCodes si diferencia < 3 puntos
 */
function generateHollandCode(scores: RIASECScores): { code: string; alternatives: string[] } {
  const sorted = RIASEC_ORDER
    .map(type => ({ type, score: scores[type] }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tie-break by RIASEC order
      return RIASEC_ORDER.indexOf(a.type) - RIASEC_ORDER.indexOf(b.type);
    });

  const code = sorted.slice(0, 3).map(s => s.type).join('');

  // Generate alternatives: "Regla de 3"
  const alternatives: string[] = [];
  const top3 = sorted.slice(0, 3);
  const fourth = sorted[3];

  // Check if position 2-3 or 3-4 differ by < 3 points
  if (Math.abs(top3[1].score - top3[2].score) < 3) {
    // Swap positions 2 and 3
    const alt = [top3[0].type, top3[2].type, top3[1].type].join('');
    if (alt !== code) alternatives.push(alt);
  }
  if (fourth && Math.abs(top3[2].score - fourth.score) < 3) {
    // Replace position 3 with position 4
    const alt = [top3[0].type, top3[1].type, fourth.type].join('');
    if (alt !== code && !alternatives.includes(alt)) alternatives.push(alt);
  }

  return { code, alternatives };
}

/**
 * Dimensiones Prediger
 */
function calculatePredigerDimensions(scores: RIASECScores): { peopleVsThings: number; ideasVsData: number } {
  // People vs Things: (S+E) - (R+I) normalized to -100..+100
  const maxDiff = MAX_SCORE_PER_CATEGORY * 2; // theoretical max difference
  const peopleVsThings = Math.round(((scores.S + scores.E) - (scores.R + scores.I)) / maxDiff * 100);

  // Ideas vs Data: (I+A) - (C+E) normalized to -100..+100
  const ideasVsData = Math.round(((scores.I + scores.A) - (scores.C + scores.E)) / maxDiff * 100);

  return {
    peopleVsThings: Math.max(-100, Math.min(100, peopleVsThings)),
    ideasVsData: Math.max(-100, Math.min(100, ideasVsData))
  };
}

/**
 * Genera recomendaciones personalizadas
 */
function generateRecommendations(
  percentages: { category: RIASECType; percentage: number; percentile: number }[],
  consistency: number,
  differentiation: number
): string[] {
  const recommendations: string[] = [];
  const topCategory = riasecCategories.find(c => c.id === percentages[0].category)!;
  const topPercentile = percentages[0].percentile;

  // Recomendaciones basadas en percentil ipsativo
  if (topPercentile >= 75) {
    recommendations.push(
      `Tu perfil ${topCategory.name} es muy definido (fuerza relativa ${topPercentile}). Tienes un interés muy marcado en esta área.`
    );
  } else if (topPercentile >= 50) {
    recommendations.push(
      `Tu perfil ${topCategory.name} está bien definido (fuerza relativa ${topPercentile}). Muestras un interés significativo en esta área.`
    );
  } else {
    recommendations.push(
      `Tu perfil muestra intereses diversificados. No hay un área dominante clara, lo que te da flexibilidad para explorar múltiples opciones.`
    );
  }

  // Recomendaciones basadas en consistencia
  if (consistency === 3) {
    recommendations.push(
      'Tus intereses principales son muy coherentes entre sí, lo que facilitará encontrar una carrera que te satisfaga plenamente.'
    );
  } else if (consistency === 2) {
    recommendations.push(
      'Tus intereses principales tienen buena compatibilidad. Considera carreras que integren ambas áreas.'
    );
  } else {
    recommendations.push(
      'Tus intereses principales son diversos. Busca carreras interdisciplinarias o considera desarrollar diferentes facetas de tu personalidad profesional.'
    );
  }

  // Recomendaciones basadas en diferenciación
  if (differentiation >= 40) {
    recommendations.push(
      'Tienes un perfil especializado con intereses muy definidos. Enfócate en carreras específicas que aprovechen tus fortalezas principales.'
    );
  } else if (differentiation >= 25) {
    recommendations.push(
      'Tu perfil muestra especialización moderada. Tienes intereses claros pero también versatilidad para adaptarte a diferentes contextos.'
    );
  } else {
    recommendations.push(
      'Tienes un perfil generalista con intereses amplios. Esto te da gran versatilidad - considera carreras que te permitan desarrollar múltiples habilidades.'
    );
  }

  // Tip de desarrollo
  const tip = topCategory.developmentTips[0];
  recommendations.push(tip);

  // Recomendación sobre tipo secundario
  const secondCategory = riasecCategories.find(c => c.id === percentages[1].category)!;
  if (percentages[1].percentile >= 60) {
    recommendations.push(
      `También muestras interés significativo en el área ${secondCategory.name}. Explora carreras que combinen ${topCategory.name} y ${secondCategory.name}.`
    );
  }

  return recommendations;
}

/**
 * Genera matching con carreras UDHI usando C-Index (Fix #8)
 */
function generateCareerMatches(
  scores: RIASECScores,
  hollandCode: string
): {
  name: string;
  description: string;
  matchPercentage: number;
  primaryReason: string;
  area?: string;
  duration?: string;
  modalities?: string[];
}[] {
  const studentHollandCode = hollandCode.split('');

  const matches = udhiCareers.map(career => {
    const scoreRecord: { [key: string]: number } = {
      R: scores.R, I: scores.I, A: scores.A,
      S: scores.S, E: scores.E, C: scores.C
    };
    const matchPercentage = calculateCareerMatch(
      scoreRecord,
      career,
      studentHollandCode
    );

    // Generar razón específica según nivel de match
    const topCompetencies = career.competencies.slice(0, 2).join(' y ').toLowerCase();
    const studentTop3 = hollandCode.split('');
    const sharedTypes = career.primaryTypes.filter(t => studentTop3.includes(t));
    const matchedTypeName: Record<string, string> = {
      R: 'lo técnico y práctico', I: 'la investigación y el análisis',
      A: 'la creatividad y el diseño', S: 'el trato con personas',
      E: 'el liderazgo y la gestión', C: 'la organización y los datos'
    };

    let primaryReason: string;
    if (matchPercentage >= 80) {
      primaryReason = `Muy afín a tu perfil. Combina ${topCompetencies}, que conectan directamente con tus intereses.`;
    } else if (matchPercentage >= 60) {
      primaryReason = `Buena opción. Tu interés en ${matchedTypeName[sharedTypes[0]] || 'este campo'} se alinea con ${topCompetencies}.`;
    } else if (matchPercentage >= 40) {
      primaryReason = `Opción parcial. Conecta con tu lado ${matchedTypeName[sharedTypes[0]] || 'exploratorio'}, aunque no es tu área principal.`;
    } else {
      primaryReason = `Poco afín a tu perfil actual. Esta carrera se enfoca en ${topCompetencies}, que no están entre tus intereses más fuertes.`;
    }

    return {
      name: career.name,
      description: career.description,
      matchPercentage,
      primaryReason,
      area: career.area,
      duration: career.duration,
      modalities: career.modalities
    };
  });

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

/**
 * Función principal: Calcula resultados del test con validación
 */
export function calculateProfessionalResults(
  answers: TestAnswers,
  timeData?: { startTime: number; endTime: number }
): DetailedResults {
  // 1. Validar respuestas
  const validation = validateTestResponses(answers, timeData);

  // 2. Calcular puntajes brutos por dimensión RIASEC (solo regulares)
  const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  const regularQuestions = professionalQuestions.filter(q => !q.isControl);

  regularQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      scores[question.category] += answer;
    }
  });

  // 3. Calcular porcentajes y percentiles ipsativos
  const rawValues = RIASEC_ORDER.map(type => scores[type]);

  const percentages = RIASEC_ORDER
    .map(category => ({
      category,
      rawScore: scores[category],
      percentage: calculatePercentage(scores[category]),
      percentile: calculateIpsativePercentile(scores[category], rawValues)
    }))
    .sort((a, b) => {
      if (b.rawScore !== a.rawScore) return b.rawScore - a.rawScore;
      return RIASEC_ORDER.indexOf(a.category) - RIASEC_ORDER.indexOf(b.category);
    });

  // 4. Holland Code con tie-breaking
  const { code: hollandCode, alternatives: alternativeHollandCodes } = generateHollandCode(scores);

  // 5. Métricas de perfil
  const consistency = calculateConsistency(hollandCode);
  const differentiation = calculateDifferentiation(rawValues);
  const predigerDimensions = calculatePredigerDimensions(scores);

  // 6. Categorías principales
  const primaryType = riasecCategories.find(c => c.id === percentages[0].category)!;
  const secondaryType = riasecCategories.find(c => c.id === percentages[1].category)!;
  const tertiaryType = riasecCategories.find(c => c.id === percentages[2].category)!;

  // 7. Recomendaciones
  const recommendations = generateRecommendations(percentages, consistency, differentiation);

  // 8. Matches con carreras UDHI (C-Index)
  const topCareers = generateCareerMatches(scores, hollandCode);

  return {
    scores,
    percentages,
    hollandCode,
    alternativeHollandCodes: alternativeHollandCodes.length > 0 ? alternativeHollandCodes : undefined,
    consistency,
    differentiation,
    predigerDimensions,
    primaryType,
    secondaryType,
    tertiaryType,
    recommendations,
    topCareers,
    validation
  };
}

/**
 * Reconstruye resultados completos desde solo los 6 scores RIASEC.
 * Usado para cargar resultados desde URL (link del call center).
 */
export function reconstructResultsFromScores(scores: RIASECScores): DetailedResults {
  const rawValues = RIASEC_ORDER.map(type => scores[type]);

  const percentages = RIASEC_ORDER
    .map(category => ({
      category,
      rawScore: scores[category],
      percentage: calculatePercentage(scores[category]),
      percentile: calculateIpsativePercentile(scores[category], rawValues)
    }))
    .sort((a, b) => {
      if (b.rawScore !== a.rawScore) return b.rawScore - a.rawScore;
      return RIASEC_ORDER.indexOf(a.category) - RIASEC_ORDER.indexOf(b.category);
    });

  const { code: hollandCode, alternatives: alternativeHollandCodes } = generateHollandCode(scores);
  const consistency = calculateConsistency(hollandCode);
  const differentiation = calculateDifferentiation(rawValues);
  const predigerDimensions = calculatePredigerDimensions(scores);
  const primaryType = riasecCategories.find(c => c.id === percentages[0].category)!;
  const secondaryType = riasecCategories.find(c => c.id === percentages[1].category)!;
  const tertiaryType = riasecCategories.find(c => c.id === percentages[2].category)!;
  const recommendations = generateRecommendations(percentages, consistency, differentiation);
  const topCareers = generateCareerMatches(scores, hollandCode);

  return {
    scores,
    percentages,
    hollandCode,
    alternativeHollandCodes: alternativeHollandCodes.length > 0 ? alternativeHollandCodes : undefined,
    consistency,
    differentiation,
    predigerDimensions,
    primaryType,
    secondaryType,
    tertiaryType,
    recommendations,
    topCareers,
    validation: {
      isValid: true,
      warnings: [],
      recommendation: 'VALID',
      details: { infrequencyScore: 0, inconsistencyCount: 0, responseVariance: 0, directedFailCount: 0 }
    }
  };
}
