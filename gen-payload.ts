import { professionalQuestions, calculateProfessionalResults, LikertScale, TestAnswers } from './lib/professionalVocationalTestV3';
import { writeFileSync } from 'fs';

const answers: TestAnswers = {};
professionalQuestions.forEach(q => {
  if (q.isControl) {
    answers[q.id] = (q.controlType === 'directed' && q.directedResponse ? q.directedResponse : 1) as LikertScale;
  } else if (q.category === 'S') { answers[q.id] = 5; }
  else if (q.category === 'A') { answers[q.id] = 4; }
  else if (q.category === 'I') { answers[q.id] = 3; }
  else if (q.category === 'E') { answers[q.id] = 2; }
  else { answers[q.id] = 1; }
});

const results = calculateProfessionalResults(answers, { startTime: Date.now() - 1200000, endTime: Date.now() });
const userInfo = { nombre: 'Maria', apellido: 'Lopez Torres', email: 'maria.lopez@test.com', telefono: '4421234567' };

writeFileSync('test-payload.json', JSON.stringify({ userInfo, results }));
console.log('Payload saved. Size:', JSON.stringify({ userInfo, results }).length, 'bytes');
