import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'build/**', 'dist/**', 'next-env.d.ts', 'out/**'],
  },
]

export default config
