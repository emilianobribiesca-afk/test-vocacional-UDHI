import { DetailedResults, riasecCategories } from './professionalVocationalTestV3';

function escapeHtml(text: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return (text || '').replace(/[&<>"']/g, m => map[m]);
}

export function getArchetype(code: string): { name: string; tagline: string } {
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

export interface UserInfo {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export function generateCallCenterEmailHTML(
  userInfo: UserInfo,
  results: DetailedResults,
  resultsUrl: string
): string {
  const archetype = getArchetype(results.hollandCode);
  const top3 = results.percentages.slice(0, 3);
  const topCareers = results.topCareers.slice(0, 5);

  const barsHTML = top3.map(p => {
    const cat = riasecCategories.find(c => c.id === p.category)!;
    return `<tr><td style="padding:8px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="36" style="padding-right:12px;">
          <div style="width:36px;height:36px;background:#1565C0;border-radius:8px;color:#fff;font-weight:bold;font-size:14px;line-height:36px;text-align:center;">${p.category}</div>
        </td>
        <td>
          <div style="font-size:14px;font-weight:600;color:#1f2937;margin-bottom:4px;">${cat.name} <span style="color:#6b7280;font-weight:400;">${p.percentage}%</span></div>
          <div style="background:#f3f4f6;border-radius:99px;height:8px;overflow:hidden;">
            <div style="background:#1565C0;height:8px;border-radius:99px;width:${p.percentage}%;"></div>
          </div>
        </td>
      </tr></table>
    </td></tr>`;
  }).join('');

  const careersHTML = topCareers.map((c, i) => `<tr><td style="padding:14px 0;border-bottom:1px solid #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="32" valign="top" style="padding-right:12px;">
        <div style="width:28px;height:28px;background:${i < 3 ? '#1565C0' : '#f3f4f6'};color:${i < 3 ? '#fff' : '#6b7280'};border-radius:50%;font-size:13px;font-weight:bold;line-height:28px;text-align:center;">${i + 1}</div>
      </td>
      <td>
        <div style="font-size:14px;font-weight:600;color:#1f2937;">${c.name}</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px;">${c.area} · ${c.duration}</div>
        <div style="font-size:12px;color:#4b5563;margin-top:4px;font-style:italic;">${c.primaryReason}</div>
      </td>
      <td width="50" style="text-align:right;vertical-align:top;">
        <span style="font-size:16px;font-weight:700;color:#1565C0;">${c.matchPercentage}%</span>
      </td>
    </tr></table>
  </td></tr>`).join('');

  const lettersHTML = top3.map(p => {
    const cat = riasecCategories.find(c => c.id === p.category)!;
    return `<td style="text-align:center;padding:0 20px;">
      <div style="font-size:52px;font-weight:900;color:#0D47A1;line-height:1;">${p.category}</div>
      <div style="font-size:13px;color:#6b7280;margin-top:6px;">${cat.name}</div>
      <div style="font-size:12px;color:#9ca3af;">${p.percentage}%</div>
    </td>`;
  }).join('');

  const now = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Nuevo Test Vocacional - ${userInfo.nombre} ${userInfo.apellido}</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;">
<tr><td align="center" style="padding:32px 16px;">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

  <!-- Datos del Estudiante + CTA -->
  <tr>
    <td style="padding:24px 40px;background:#eff6ff;border-bottom:2px solid #1565C0;">
      <div style="font-size:16px;font-weight:700;color:#1565C0;margin-bottom:12px;">Datos del Estudiante</div>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#1f2937;">
        <tr><td style="font-weight:600;padding:3px 16px 3px 0;">Nombre:</td><td>${escapeHtml(userInfo.nombre)} ${escapeHtml(userInfo.apellido)}</td></tr>
        <tr><td style="font-weight:600;padding:3px 16px 3px 0;">Email:</td><td>${escapeHtml(userInfo.email)}</td></tr>
        <tr><td style="font-weight:600;padding:3px 16px 3px 0;">Teléfono:</td><td>${escapeHtml(userInfo.telefono)}</td></tr>
        <tr><td style="font-weight:600;padding:3px 16px 3px 0;">Fecha:</td><td>${now}</td></tr>
      </table>
      <div style="margin-top:16px;">
        <a href="${resultsUrl}" style="display:inline-block;background:#1565C0;color:#ffffff;font-size:14px;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;">Ver resultados completos</a>
      </div>
    </td>
  </tr>

  <!-- Hero -->
  <tr>
    <td style="background:#ffffff;padding:40px;text-align:center;border-bottom:1px solid #e5e7eb;">
      <div style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px;">Perfil Vocacional</div>
      <div style="font-size:36px;font-weight:800;color:#0D47A1;margin-bottom:8px;">${archetype.name}</div>
      <div style="font-size:16px;color:#4b5563;margin-bottom:28px;">${archetype.tagline}</div>
      <table cellpadding="0" cellspacing="0" border="0" align="center"><tr>${lettersHTML}</tr></table>
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td style="padding:32px 40px 16px;">
      <div style="font-size:18px;font-weight:700;color:#1f2937;">Resultados del test de ${escapeHtml(userInfo.nombre)} ${escapeHtml(userInfo.apellido)}</div>
      <div style="font-size:14px;color:#6b7280;margin-top:8px;line-height:1.6;">El estudiante completó el Test Vocacional UDHI. A continuación se presentan los resultados.</div>
    </td>
  </tr>

  <!-- Top 3 bars -->
  <tr>
    <td style="padding:16px 40px 24px;">
      <div style="font-size:15px;font-weight:700;color:#1f2937;margin-bottom:12px;">Intereses principales</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">${barsHTML}</table>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="padding:0 40px;"><div style="border-top:1px solid #e5e7eb;"></div></td></tr>

  <!-- Top careers -->
  <tr>
    <td style="padding:24px 40px 16px;">
      <div style="font-size:15px;font-weight:700;color:#1f2937;margin-bottom:12px;">Carreras recomendadas</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">${careersHTML}</table>
    </td>
  </tr>

  <!-- Spacer -->
  <tr><td style="padding:8px 0;"></td></tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td>
          <div style="font-size:14px;font-weight:700;color:#1f2937;">UDHI</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Universidad de Dolores Hidalgo</div>
        </td>
        <td style="text-align:right;">
          <div style="font-size:11px;color:#9ca3af;">Test Vocacional · Modelo RIASEC</div>
        </td>
      </tr></table>
    </td>
  </tr>

</table>

</td></tr>
</table>

</body>
</html>`;
}
