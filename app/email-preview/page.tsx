'use client';

import { useEffect, useState } from 'react';
import { DetailedResults } from '@/lib/professionalVocationalTestV3';
import { generateCallCenterEmailHTML } from '@/lib/emailTemplate';

export default function EmailPreview() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const storedResults = localStorage.getItem('professionalVocationalResults');
    const userInfoStr = localStorage.getItem('userInfo');

    if (storedResults && userInfoStr) {
      const results = JSON.parse(storedResults) as DetailedResults;
      const userInfo = JSON.parse(userInfoStr);
      setHtml(generateCallCenterEmailHTML(userInfo, results, '#'));
    } else {
      setHtml('<div style="padding:40px;text-align:center;font-family:Arial;color:#666;">No hay resultados. Haz el test primero en /register</div>');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-[660px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-4 p-4">
          <p className="text-sm text-gray-500">Preview del email que recibe el call center</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
