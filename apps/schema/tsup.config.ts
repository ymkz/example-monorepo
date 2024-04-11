import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['build/index.ts'],
  format: 'esm',
  dts: true,
  bundle: true,
  treeshake: true,
})
