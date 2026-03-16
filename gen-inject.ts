import { professionalQuestions, calculateProfessionalResults, LikertScale, TestAnswers } from './lib/professionalVocationalTestV3';

const answers: TestAnswers = {};
professionalQuestions.forEach(q => {
  if (q.isControl) {
    answers[q.id] = (q.controlType === 'directed' && q.directedResponse ? q.directedResponse : 1) as LikertScale;
  } else if (q.category === 'R') { answers[q.id] = 5; }
  else if (q.category === 'I') { answers[q.id] = 4; }
  else if (q.category === 'E') { answers[q.id] = 4; }
  else if (q.category === 'A') { answers[q.id] = 2; }
  else if (q.category === 'C') { answers[q.id] = 3; }
  else { answers[q.id] = 1; }
});

const results = calculateProfessionalResults(answers, { startTime: Date.now() - 900000, endTime: Date.now() });
const u = JSON.stringify({ nombre: 'Gibran', apellido: 'Gomez', email: 'test@test.com', telefono: '' });
const r = JSON.stringify(results);
console.log(`localStorage.setItem("professionalVocationalResults",${JSON.stringify(r)});localStorage.setItem("userInfo",${JSON.stringify(u)});location.href="/results";`);
