// Automated Algorithm Validation - 18 test profiles
// Run with: npx tsx test-algorithm.ts

import {
  professionalQuestions,
  calculateProfessionalResults,
  LikertScale,
  TestAnswers,
  RIASECType
} from './lib/professionalVocationalTestV3';

const RIASEC: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

// Helper: generate answers where one category scores high, rest low
function pureProfile(highType: RIASECType, highVal: LikertScale = 5, lowVal: LikertScale = 1): TestAnswers {
  const answers: TestAnswers = {};
  professionalQuestions.forEach(q => {
    if (q.isControl) {
      if (q.controlType === 'directed' && q.directedResponse) {
        answers[q.id] = q.directedResponse;
      } else {
        answers[q.id] = 1; // correct response for infrequency
      }
    } else {
      answers[q.id] = q.category === highType ? highVal : lowVal;
    }
  });
  return answers;
}

// Helper: generate answers where two categories score high
function mixedProfile(type1: RIASECType, type2: RIASECType, highVal: LikertScale = 5, midVal: LikertScale = 3, lowVal: LikertScale = 1): TestAnswers {
  const answers: TestAnswers = {};
  professionalQuestions.forEach(q => {
    if (q.isControl) {
      if (q.controlType === 'directed' && q.directedResponse) {
        answers[q.id] = q.directedResponse;
      } else {
        answers[q.id] = 1;
      }
    } else if (q.category === type1) {
      answers[q.id] = highVal;
    } else if (q.category === type2) {
      answers[q.id] = midVal;
    } else {
      answers[q.id] = lowVal;
    }
  });
  return answers;
}

// Helper: all same value
function flatProfile(val: LikertScale): TestAnswers {
  const answers: TestAnswers = {};
  professionalQuestions.forEach(q => {
    if (q.isControl) {
      if (q.controlType === 'directed' && q.directedResponse) {
        answers[q.id] = q.directedResponse;
      } else {
        answers[q.id] = 1;
      }
    } else {
      answers[q.id] = val;
    }
  });
  return answers;
}

// Helper: invalid control responses
function invalidControlProfile(): TestAnswers {
  const answers: TestAnswers = {};
  professionalQuestions.forEach(q => {
    if (q.isControl) {
      answers[q.id] = 5; // wrong for all controls
    } else {
      answers[q.id] = 3;
    }
  });
  return answers;
}

// Helper: tie between two types
function tiedProfile(type1: RIASECType, type2: RIASECType): TestAnswers {
  const answers: TestAnswers = {};
  professionalQuestions.forEach(q => {
    if (q.isControl) {
      if (q.controlType === 'directed' && q.directedResponse) {
        answers[q.id] = q.directedResponse;
      } else {
        answers[q.id] = 1;
      }
    } else if (q.category === type1 || q.category === type2) {
      answers[q.id] = 5;
    } else {
      answers[q.id] = 1;
    }
  });
  return answers;
}

interface TestCase {
  name: string;
  answers: TestAnswers;
  expect: {
    hollandCodeStarts?: string;
    hollandCode?: string;
    topCareerArea?: string;
    validation?: 'VALID' | 'CAUTION' | 'INVALID';
    differentiationRange?: [number, number];
    percentageRange?: [number, number]; // for top category
  };
}

const testCases: TestCase[] = [
  // === 6 PURE PROFILES ===
  { name: '1. Pure R (Realista)', answers: pureProfile('R'),
    expect: { hollandCodeStarts: 'R', topCareerArea: 'Ingenierías', validation: 'VALID', differentiationRange: [30, 100] } },
  { name: '2. Pure I (Investigador)', answers: pureProfile('I'),
    expect: { hollandCodeStarts: 'I', validation: 'VALID', differentiationRange: [30, 100] } },
  { name: '3. Pure A (Artístico)', answers: pureProfile('A'),
    expect: { hollandCodeStarts: 'A', validation: 'VALID', differentiationRange: [30, 100] } },
  { name: '4. Pure S (Social)', answers: pureProfile('S'),
    expect: { hollandCodeStarts: 'S', validation: 'VALID', differentiationRange: [30, 100] } },
  { name: '5. Pure E (Emprendedor)', answers: pureProfile('E'),
    expect: { hollandCodeStarts: 'E', validation: 'VALID', differentiationRange: [30, 100] } },
  { name: '6. Pure C (Convencional)', answers: pureProfile('C'),
    expect: { hollandCodeStarts: 'C', validation: 'VALID', differentiationRange: [30, 100] } },

  // === 6 MIXED PROFILES ===
  { name: '7. Mix S+I (Enfermería/Nutrición)', answers: mixedProfile('S', 'I'),
    expect: { hollandCodeStarts: 'S', validation: 'VALID' } },
  { name: '8. Mix E+C (Negocios/Admin)', answers: mixedProfile('E', 'C'),
    expect: { hollandCodeStarts: 'E', validation: 'VALID' } },
  { name: '9. Mix A+R (Arquitectura/Diseño)', answers: mixedProfile('A', 'R'),
    expect: { hollandCodeStarts: 'A', validation: 'VALID' } },
  { name: '10. Mix I+R (Ingeniería Sistemas)', answers: mixedProfile('I', 'R'),
    expect: { hollandCodeStarts: 'I', validation: 'VALID' } },
  { name: '11. Mix S+E (Derecho/Gestión)', answers: mixedProfile('S', 'E'),
    expect: { hollandCodeStarts: 'S', validation: 'VALID' } },
  { name: '12. Mix A+S (Educación/Idiomas)', answers: mixedProfile('A', 'S'),
    expect: { hollandCodeStarts: 'A', validation: 'VALID' } },

  // === 2 FLAT PROFILES ===
  { name: '13. Flat 3 (todo neutral)', answers: flatProfile(3),
    expect: { validation: 'CAUTION', differentiationRange: [0, 5] } },
  { name: '14. Flat 5 (todo máximo)', answers: flatProfile(5),
    expect: { validation: 'CAUTION', differentiationRange: [0, 5] } },

  // === 2 INVALID CONTROL ===
  { name: '15. Control inválido (todo 5)', answers: invalidControlProfile(),
    expect: { validation: 'INVALID' } },
  { name: '16. Control parcial inválido', answers: (() => {
    const a = flatProfile(3);
    a[73] = 5; a[74] = 5; // 2 infrequency fails
    return a;
  })(),
    expect: { validation: 'CAUTION' } },

  // === 2 TIE-BREAKING ===
  { name: '17. Tie R=I (RIASEC order: R wins)', answers: tiedProfile('R', 'I'),
    expect: { hollandCodeStarts: 'R', validation: 'VALID' } },
  { name: '18. Tie S=E (RIASEC order: S wins)', answers: tiedProfile('S', 'E'),
    expect: { hollandCodeStarts: 'S', validation: 'VALID' } },
];

// === RUN TESTS ===
console.log('='.repeat(80));
console.log('VALIDACIÓN ALGORÍTMICA DEL TEST VOCACIONAL UDHI - 18 PERFILES');
console.log('='.repeat(80));
console.log('');

let passed = 0;
let failed = 0;
const failures: string[] = [];

testCases.forEach(tc => {
  const results = calculateProfessionalResults(tc.answers);
  const errors: string[] = [];

  // Check Holland code starts with expected
  if (tc.expect.hollandCodeStarts && !results.hollandCode.startsWith(tc.expect.hollandCodeStarts)) {
    errors.push(`Holland code: expected starts with "${tc.expect.hollandCodeStarts}", got "${results.hollandCode}"`);
  }

  // Check exact Holland code
  if (tc.expect.hollandCode && results.hollandCode !== tc.expect.hollandCode) {
    errors.push(`Holland code: expected "${tc.expect.hollandCode}", got "${results.hollandCode}"`);
  }

  // Check validation
  if (tc.expect.validation && results.validation.recommendation !== tc.expect.validation) {
    errors.push(`Validation: expected "${tc.expect.validation}", got "${results.validation.recommendation}"`);
  }

  // Check differentiation range
  if (tc.expect.differentiationRange) {
    const [min, max] = tc.expect.differentiationRange;
    if (results.differentiation < min || results.differentiation > max) {
      errors.push(`Differentiation: expected ${min}-${max}, got ${results.differentiation}`);
    }
  }

  // Check top career area
  if (tc.expect.topCareerArea && results.topCareers[0]?.area !== tc.expect.topCareerArea) {
    errors.push(`Top career area: expected "${tc.expect.topCareerArea}", got "${results.topCareers[0]?.area}"`);
  }

  // Check percentage range for top category
  if (tc.expect.percentageRange) {
    const topPct = results.percentages[0].percentage;
    const [min, max] = tc.expect.percentageRange;
    if (topPct < min || topPct > max) {
      errors.push(`Top percentage: expected ${min}-${max}%, got ${topPct}%`);
    }
  }

  const status = errors.length === 0;
  if (status) {
    passed++;
    console.log(`✅ ${tc.name}`);
  } else {
    failed++;
    console.log(`❌ ${tc.name}`);
    errors.forEach(e => console.log(`   → ${e}`));
    failures.push(tc.name);
  }

  // Print key metrics
  const scores = RIASEC.map(t => `${t}:${results.scores[t]}`).join(' ');
  console.log(`   Code: ${results.hollandCode} | Scores: ${scores}`);
  console.log(`   Diff: ${results.differentiation}% | Valid: ${results.validation.recommendation}`);
  console.log(`   Top 3 careers: ${results.topCareers.slice(0, 3).map(c => `${c.name}(${c.matchPercentage}%)`).join(', ')}`);
  if (results.alternativeHollandCodes?.length) {
    console.log(`   Alt codes: ${results.alternativeHollandCodes.join(', ')}`);
  }
  console.log('');
});

console.log('='.repeat(80));
console.log(`RESULTADO: ${passed}/${testCases.length} pasaron | ${failed} fallaron`);
if (failures.length > 0) {
  console.log(`FALLOS: ${failures.join(', ')}`);
}
console.log('='.repeat(80));
