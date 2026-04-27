import { Resend } from 'resend';
import { generateCallCenterEmailHTML } from '@/lib/emailTemplate';
import type { DetailedResults } from '@/lib/professionalVocationalTestV3';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = 'gibrangoc15@gmail.com'; // demo, luego: callcenter_slp@udhi.edu.mx

const RIASEC_KEYS = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quita CR/LF/TAB y recorta longitud — previene header injection en el subject
function sanitizeLine(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLen);
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!isPlainObject(body)) {
      return Response.json({ success: false, message: 'Payload inválido' }, { status: 400 });
    }

    const rawUserInfo = isPlainObject(body.userInfo) ? body.userInfo : null;
    const rawResults = isPlainObject(body.results) ? body.results : null;
    if (!rawUserInfo || !rawResults) {
      return Response.json({ success: false, message: 'Payload inválido' }, { status: 400 });
    }

    const nombre = sanitizeLine(rawUserInfo.nombre, 80);
    const apellido = sanitizeLine(rawUserInfo.apellido, 80);
    const email = sanitizeLine(rawUserInfo.email, 120);
    const telefono = sanitizeLine(rawUserInfo.telefono, 20);
    const consentAccepted = rawUserInfo.consentAccepted === true;

    if (!nombre || !apellido || !email || !telefono) {
      return Response.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ success: false, message: 'Correo inválido' }, { status: 400 });
    }
    if (!consentAccepted) {
      return Response.json({ success: false, message: 'Falta consentimiento' }, { status: 400 });
    }

    const rawScores = isPlainObject(rawResults.scores) ? rawResults.scores : null;
    if (!rawScores) {
      return Response.json({ success: false, message: 'Resultados inválidos' }, { status: 400 });
    }
    const scores: Record<string, number> = {};
    for (const k of RIASEC_KEYS) {
      const v = rawScores[k];
      if (typeof v !== 'number' || !Number.isFinite(v)) {
        return Response.json({ success: false, message: 'Resultados inválidos' }, { status: 400 });
      }
      scores[k] = v;
    }

    const hollandCode = sanitizeLine(rawResults.hollandCode, 6);
    if (!/^[RIASEC]{2,3}$/.test(hollandCode)) {
      return Response.json({ success: false, message: 'Código Holland inválido' }, { status: 400 });
    }

    const userInfo = { nombre, apellido, email, telefono, consentAccepted };
    const results = { ...rawResults, scores, hollandCode } as unknown as DetailedResults;

    const payload = JSON.stringify({ s: scores, n: `${nombre} ${apellido}` });
    const encoded = Buffer.from(payload).toString('base64url');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://testvocacionaludhi.com';
    const resultsUrl = `${baseUrl}/results?d=${encoded}`;

    const html = generateCallCenterEmailHTML(userInfo, results, resultsUrl);

    const { error } = await resend.emails.send({
      from: 'Test Vocacional UDHI <noreply@testvocacionaludhi.com>',
      to: [RECIPIENT],
      subject: `Nuevo Test: ${nombre} ${apellido} - ${hollandCode}`,
      html
    });

    if (error) {
      return Response.json({ success: false, message: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
