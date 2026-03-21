/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dxpbyrcbklqrjlytmkum.supabase.co", // أول دومين
      "pqeliprhapbghcczgyru.supabase.co", // الدومين الجديد اللي ظهر في الخطأ
    ],
  },
};

export default nextConfig;
