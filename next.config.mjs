/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();


const nextConfig = {
  images: {
    domains: ['normplov-api.shinoshike.studio','www.aupp.edu.kh','rupp.edu.kh','foodstem-euproject.itc.edu.kh','www.aub.edu.kh','136.228.158.126','normplov-api.istad.co',], // Add the external domain for images
  },
};

export default withNextIntl(nextConfig);
