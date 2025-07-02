import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Tailwind CSS v4 Integration', () => {
  it('should have Tailwind CSS import in global styles', () => {
    const globalStyles = readFileSync(resolve(__dirname, '../global.css'), 'utf-8')

    expect(globalStyles).toContain('@import "tailwindcss"')
  })

  it('should not have old @tailwind directives', () => {
    const globalStyles = readFileSync(resolve(__dirname, '../global.css'), 'utf-8')

    expect(globalStyles).not.toContain('@tailwind base')
    expect(globalStyles).not.toContain('@tailwind components')
    expect(globalStyles).not.toContain('@tailwind utilities')
  })
})
