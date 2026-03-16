'use client';

import { useEffect, useState } from 'react';
import { DetailedResults, riasecCategories } from '@/lib/professionalVocationalTestV3';

function getArchetype(code: string): { name: string; tagline: string } {
  const archetypes: Record<string, { name: string; tagline: string }> = {
    'RI': { name: 'El Ingeniero', tagline: 'Construyes soluciones con lógica y precisión' },
    'RA': { name: 'El Artesano', tagline: 'Creas con tus manos y tu visión' },
    'RS': { name: 'El Protector', tagline: 'Ayudas a otros con acción práctica y directa' },
    'RE': { name: 'El Constructor', tagline: 'Lideras proyectos que transforman el mundo físico' },
    'RC': { name: 'El Técnico', tagline: 'Dominas sistemas y procesos con precisión' },
    'IR': { name: 'El Científico', tagline: 'Descubres cómo funciona el mundo y lo mejoras' },
    'IA': { name: 'El Visionario', tagline: 'Combinas ideas innovadoras con pensamiento profundo' },
    'IS': { name: 'El Sanador', tagline: 'Usas el conocimiento para cuidar y transformar vidas' },
    'IE': { name: 'El Estratega', tagline: 'Analizas datos para tomar las mejores decisiones' },
    'IC': { name: 'El Analista', tagline: 'Encuentras patrones donde otros ven caos' },
    'AR': { name: 'El Diseñador', tagline: 'Transformas ideas en objetos y espacios únicos' },
    'AI': { name: 'El Innovador', tagline: 'Tu creatividad se alimenta de conocimiento profundo' },
    'AS': { name: 'El Comunicador', tagline: 'Inspiras y conectas personas a través del arte' },
    'AE': { name: 'El Director', tagline: 'Lideras proyectos creativos con visión y pasión' },
    'AC': { name: 'El Curador', tagline: 'Organizas la belleza y la creatividad con método' },
    'SR': { name: 'El Terapeuta', tagline: 'Sanas cuerpos y mentes con empatía y técnica' },
    'SI': { name: 'El Mentor', tagline: 'Enseñas con conocimiento profundo y calidez humana' },
    'SA': { name: 'El Inspirador', tagline: 'Motivas a otros con creatividad y conexión genuina' },
    'SE': { name: 'El Líder Social', tagline: 'Movilizas personas para causas que importan' },
    'SC': { name: 'El Organizador Social', tagline: 'Cuidas a tu comunidad con estructura y corazón' },
    'ER': { name: 'El Emprendedor', tagline: 'Conviertes ideas en negocios que funcionan' },
    'EI': { name: 'El Consultor', tagline: 'Resuelves problemas complejos con visión de negocio' },
    'EA': { name: 'El Productor', tagline: 'Conviertes la creatividad en proyectos rentables' },
    'ES': { name: 'El Negociador', tagline: 'Conectas personas e intereses para lograr acuerdos' },
    'EC': { name: 'El Ejecutivo', tagline: 'Gestionas recursos y equipos con eficiencia' },
    'CR': { name: 'El Inspector', tagline: 'Garantizas calidad y precisión en cada detalle' },
    'CI': { name: 'El Investigador de Datos', tagline: 'Conviertes números en conocimiento útil' },
    'CA': { name: 'El Archivista', tagline: 'Preservas y organizas el conocimiento con cuidado' },
    'CS': { name: 'El Administrador', tagline: 'Mantienes todo funcionando para que otros puedan brillar' },
    'CE': { name: 'El Controller', tagline: 'Controlas los números que hacen crecer organizaciones' },
  };
  return archetypes[code.substring(0, 2)] || { name: 'El Explorador', tagline: 'Tu camino profesional es único' };
}

// Generate the email HTML string (reusable for Resend later)
export function generateEmailHTML(userName: string, results: DetailedResults): string {
  const archetype = getArchetype(results.hollandCode);
  const top3 = results.percentages.slice(0, 3);
  const topCareers = results.topCareers.slice(0, 5);

  const barHTML = top3.map(p => {
    const cat = riasecCategories.find(c => c.id === p.category)!;
    return `
      <tr>
        <td style="padding:8px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="36" style="padding-right:12px;">
                <div style="width:36px;height:36px;background:#1565C0;border-radius:8px;color:#fff;font-weight:bold;font-size:14px;line-height:36px;text-align:center;">${p.category}</div>
              </td>
              <td>
                <div style="font-size:14px;font-weight:600;color:#1f2937;margin-bottom:4px;">${cat.name} <span style="color:#6b7280;font-weight:400;">${p.percentage}%</span></div>
                <div style="background:#f3f4f6;border-radius:99px;height:8px;overflow:hidden;">
                  <div style="background:#1565C0;height:8px;border-radius:99px;width:${p.percentage}%;"></div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  const careersHTML = topCareers.map((c, i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;">
              <div style="width:28px;height:28px;background:${i < 3 ? '#1565C0' : '#f3f4f6'};color:${i < 3 ? '#fff' : '#6b7280'};border-radius:50%;font-size:13px;font-weight:bold;line-height:28px;text-align:center;">${i + 1}</div>
            </td>
            <td>
              <div style="font-size:14px;font-weight:600;color:#1f2937;">${c.name}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:2px;">${c.area} · ${c.duration}</div>
            </td>
            <td width="50" style="text-align:right;">
              <span style="font-size:15px;font-weight:700;color:#1565C0;">${c.matchPercentage}%</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;">
<tr><td align="center" style="padding:32px 16px;">

<!-- Container -->
<table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

  <!-- Hero -->
  <tr>
    <td style="background:linear-gradient(135deg,#0a1628 0%,#0D47A1 40%,#1565C0 100%);padding:48px 40px;text-align:center;">
      <div style="font-size:11px;font-weight:600;color:#93c5fd;text-transform:uppercase;letter-spacing:3px;margin-bottom:16px;">Tu Perfil Vocacional</div>
      <div style="font-size:36px;font-weight:800;color:#ffffff;margin-bottom:8px;">${archetype.name}</div>
      <div style="font-size:16px;color:#bfdbfe;margin-bottom:24px;">${archetype.tagline}</div>
      <table cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          ${top3.map(p => {
            const cat = riasecCategories.find(c => c.id === p.category)!;
            return `<td style="text-align:center;padding:0 16px;">
              <div style="font-size:48px;font-weight:900;color:#ffffff;line-height:1;">${p.category}</div>
              <div style="font-size:12px;color:#93c5fd;margin-top:4px;">${cat.name}</div>
              <div style="font-size:11px;color:#60a5fa;">${p.percentage}%</div>
            </td>`;
          }).join('')}
        </tr>
      </table>
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td style="padding:32px 40px 16px;">
      <div style="font-size:20px;font-weight:700;color:#1f2937;">Hola ${userName},</div>
      <div style="font-size:15px;color:#6b7280;margin-top:8px;line-height:1.6;">Completaste el Test Vocacional UDHI. Aquí tienes un resumen de tus resultados.</div>
    </td>
  </tr>

  <!-- Top 3 bars -->
  <tr>
    <td style="padding:16px 40px 24px;">
      <div style="font-size:14px;font-weight:700;color:#1f2937;margin-bottom:12px;">Tus intereses principales</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${barHTML}
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="padding:0 40px;"><div style="border-top:1px solid #e5e7eb;"></div></td></tr>

  <!-- Top careers -->
  <tr>
    <td style="padding:24px 40px 16px;">
      <div style="font-size:14px;font-weight:700;color:#1f2937;margin-bottom:8px;">Carreras recomendadas para ti</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${careersHTML}
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:24px 40px 32px;text-align:center;">
      <div style="font-size:13px;color:#6b7280;margin-bottom:16px;">Consulta tus resultados completos y descarga tu reporte en PDF.</div>
      <a href="#" style="display:inline-block;background:#1565C0;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;">Ver resultados completos</a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <div style="font-size:13px;font-weight:700;color:#1f2937;">UDHI</div>
            <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Universidad de Dolores Hidalgo</div>
          </td>
          <td style="text-align:right;">
            <div style="font-size:11px;color:#9ca3af;">Test Vocacional · Modelo RIASEC de Holland</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
<!-- /Container -->

</td></tr>
</table>
<!-- /Wrapper -->

</body>
</html>`;
}

export default function EmailPreview() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const storedResults = localStorage.getItem('professionalVocationalResults');
    const userInfo = localStorage.getItem('userInfo');

    if (storedResults && userInfo) {
      const results = JSON.parse(storedResults) as DetailedResults;
      const user = JSON.parse(userInfo);
      setHtml(generateEmailHTML(user.nombre, results));
    } else {
      setHtml('<div style="padding:40px;text-align:center;font-family:Arial;color:#666;">No hay resultados. Haz el test primero en /register</div>');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-[660px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-4 p-4">
          <p className="text-sm text-gray-500">Preview de la plantilla de email — así le llegará al estudiante</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
