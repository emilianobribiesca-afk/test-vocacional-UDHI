import { Resend } from 'resend';
import { generateCallCenterEmailHTML } from '@/lib/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = 'gibrangoc15@gmail.com'; // demo, luego: callcenter_slp@udhi.edu.mx

export async function POST(request: Request) {
  try {
    const { userInfo, results } = await request.json();

    // Generar URL con scores y nombre codificados
    const payload = JSON.stringify({ s: results.scores, n: `${userInfo.nombre} ${userInfo.apellido}` });
    const encoded = Buffer.from(payload).toString('base64url');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://testvocacionaludhi.com';
    const resultsUrl = `${baseUrl}/results?d=${encoded}`;

    // Generar email HTML
    const html = generateCallCenterEmailHTML(userInfo, results, resultsUrl);

    // Enviar con Resend
    console.log('Sending email to:', RECIPIENT, 'from:', 'noreply@send.testvocacionaludhi.com');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Test Vocacional UDHI <noreply@testvocacionaludhi.com>',
      to: [RECIPIENT],
      subject: `Nuevo Test: ${userInfo.nombre} ${userInfo.apellido} - ${results.hollandCode}`,
      html
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return Response.json({ success: false, message: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error al enviar email:', error);
    return Response.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
