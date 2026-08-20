/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // O Next só aceita os valores de `quality` declarados aqui; sem isso ele
    // ignora o prop e volta para 75.
    qualities: [75, 90],
  },
}

export default nextConfig
