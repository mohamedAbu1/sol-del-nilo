export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-orange-500">
      <h1 className="text-4xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
      <p className="text-lg text-center max-w-md">
        يبدو أنك وصلت إلى مسار غير صحيح أو أن المحتوى غير متوفر حاليًا.
      </p>
    </div>
  );
}
