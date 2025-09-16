import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    domains: ["your-image-domain.com"], // ← هذا داخل images فقط
  },
  // يمكنك إضافة إعدادات أخرى هنا مثل redirects أو headers
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
