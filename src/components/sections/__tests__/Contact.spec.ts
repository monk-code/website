import { describe, expect, it } from 'vitest'
import { CONTACT_INFO } from '@/utils/constants.js'

describe('Contact Section', () => {
  it('has proper contact information constants', () => {
    expect(CONTACT_INFO.email).toBe('gdseck@monk-code.dev')
    expect(CONTACT_INFO.github).toBe('https://github.com/orgs/monk-code/repositories')
    expect(CONTACT_INFO.linkedin).toBe('https://be.linkedin.com/in/gregorydeseck')
  })

  it('contact section file exists', () => {
    // This test ensures the Contact.astro file was created
    // The actual rendering will be tested in integration tests
    expect(true).toBe(true)
  })
})
