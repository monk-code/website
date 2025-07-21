import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Compression Configuration', () => {
  it('should have astro-compress installed', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

    const hasCompressInDeps = packageJson.dependencies?.['astro-compress'] !== undefined
    const hasCompressInDevDeps = packageJson.devDependencies?.['astro-compress'] !== undefined

    expect(hasCompressInDeps || hasCompressInDevDeps).toBe(true)
  })

  it('should have astro-compress configured in astro.config.mjs', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toContain("import compress from 'astro-compress'")
    expect(configContent).toContain('compress(')
  })

  it('should configure HTML compression', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toMatch(/html:\s*{[^}]*removeComments:\s*true/)
  })

  it('should configure CSS compression', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toMatch(/css:\s*true/)
  })

  it('should configure JavaScript compression', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toMatch(/js:\s*true/)
  })

  it('should configure image optimization', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toMatch(/img:\s*(true|{[^}]*})/)
  })

  it('should configure SVG optimization', () => {
    const configPath = join(process.cwd(), 'astro.config.mjs')
    const configContent = readFileSync(configPath, 'utf-8')

    expect(configContent).toMatch(/svg:\s*(true|{[^}]*})/)
  })
})
