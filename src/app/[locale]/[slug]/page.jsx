import { notFound } from 'next/navigation';

export default function Page({ params }) {
  const { locale, slug } = params;

  // مثال على جلب بيانات الرحلة
  const tours = [
    { slug: 'luxor-temple', title: 'معبد الأقصر', description: 'رحلة ساحرة في قلب التاريخ' },
    { slug: 'nile-cruise', title: 'رحلة نيلية', description: 'استمتع بجمال النيل' },
  ];

  const tour = tours.find(t => t.slug === slug);

  if (!tour) {
    notFound(); // توجيه المستخدم إلى not-found.jsx داخل [locale]
  }

  return (
    <div>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
    </div>
  );
}
