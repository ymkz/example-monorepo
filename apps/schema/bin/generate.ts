import { writeFileSync } from 'node:fs'
import { CodeGenerator } from '@himenon/openapi-typescript-code-generator'
import { template } from './route.ts'

const input = 'spec/openapi.yaml'
const output = '../../apps/api/src/presentation/route/index.ts'

const run = () => {
  const codeGenerator = new CodeGenerator(input)
  const code = codeGenerator.generateCode([template])

  writeFileSync(output, code, { encoding: 'utf-8' })
}

run()
