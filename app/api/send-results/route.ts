import { Resend } from 'resend';
import { generateCallCenterEmailHTML } from '@/lib/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = 'gibrangoc115@gmail.com'; // demo, luego: callcenter_slp@udhi.edu.mx

export async function POST(request: Request) {
  try {
    const { userInfo, results } = await request.json();

    // Generar URL con scores codificados
    const payload = JSON.stringify({ s: results.scores });
    const encoded = Buffer.from(payload).toString('base64url');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://testvocacionaludhi.com';
    const resultsUrl = `${baseUrl}/results?d=${encoded}`;

    // Generar email HTML
    const html = generateCallCenterEmailHTML(userInfo, results, resultsUrl);

    // Enviar con Resend
    const { error } = await resend.emails.send({
      from: 'Test Vocacional UDHI <noreply@send.testvocacionaludhi.com>',
      to: [RECIPIENT],
      subject: `Nuevo Test: ${userInfo.nombre} ${userInfo.apellido} - ${results.hollandCode}`,
      html
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, message: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error al enviar email:', error);
    return Response.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
