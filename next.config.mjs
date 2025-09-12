import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  // هنا تقدر تضيف أي إعدادات إضافية مثل الصور أو إعادة التوجيه
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

