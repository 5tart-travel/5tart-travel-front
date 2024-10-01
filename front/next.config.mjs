const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'res.cloudinary.com',
      's.gravatar.com',
      'cdn.auth0.com',
      'via.placeholder.com',
      'flowbite.com',
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
