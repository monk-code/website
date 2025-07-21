import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

describe('GitHub Workflows', () => {
  describe('CI Workflow', () => {
    const getCIWorkflow = () => {
      const workflowPath = join(process.cwd(), '.github/workflows/ci.yml')
      const workflowContent = readFileSync(workflowPath, 'utf-8')
      return parse(workflowContent)
    }

    it('should have valid YAML configuration', () => {
      expect(() => getCIWorkflow()).not.toThrow()
    })

    it('should have correct workflow name', () => {
      const workflow = getCIWorkflow()
      expect(workflow.name).toBe('CI')
    })

    it('should run on push and pull_request events', () => {
      const workflow = getCIWorkflow()
      expect(workflow.on).toBeDefined()
      expect(workflow.on.push).toBeDefined()
      expect(workflow.on.pull_request).toBeDefined()
      expect(workflow.on.push.branches).toContain('main')
      expect(workflow.on.pull_request.branches).toContain('main')
    })

    it('should have a test job', () => {
      const workflow = getCIWorkflow()
      expect(workflow.jobs?.test).toBeDefined()
      expect(workflow.jobs.test['runs-on']).toBe('ubuntu-latest')
    })

    it('should checkout code as first step', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      expect(steps[0]?.uses).toBe('actions/checkout@v4')
    })

    it('should setup Node.js 18', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const nodeStep = steps.find((step: any) => step.uses?.includes('actions/setup-node'))
      expect(nodeStep).toBeDefined()
      expect(nodeStep.with?.['node-version']).toBe('18')
    })

    it('should install pnpm', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const pnpmStep = steps.find((step: any) => step.uses?.includes('pnpm/action-setup'))
      expect(pnpmStep).toBeDefined()
      expect(pnpmStep.with?.version).toBe(8)
    })

    it('should cache pnpm dependencies', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const cacheStep = steps.find(
        (step: any) => step.name?.includes('Get pnpm store directory') || step.id === 'pnpm-cache',
      )
      expect(cacheStep).toBeDefined()
    })

    it('should install dependencies', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const installStep = steps.find(
        (step: any) =>
          step.name?.includes('Install dependencies') || step.run?.includes('pnpm install'),
      )
      expect(installStep).toBeDefined()
      expect(installStep.run).toContain('pnpm install --frozen-lockfile')
    })

    it('should run type checking', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const typeCheckStep = steps.find(
        (step: any) => step.name?.includes('Type check') || step.run?.includes('pnpm types:check'),
      )
      expect(typeCheckStep).toBeDefined()
    })

    it('should run linting', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const lintStep = steps.find(
        (step: any) => step.name?.includes('Lint') || step.run?.includes('pnpm lint'),
      )
      expect(lintStep).toBeDefined()
    })

    it('should run tests', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const testStep = steps.find(
        (step: any) => step.name?.includes('Run tests') || step.run?.includes('pnpm test:run'),
      )
      expect(testStep).toBeDefined()
    })

    it('should build the project', () => {
      const workflow = getCIWorkflow()
      const steps = workflow.jobs?.test?.steps || []
      const buildStep = steps.find(
        (step: any) => step.name?.includes('Build') || step.run?.includes('pnpm build'),
      )
      expect(buildStep).toBeDefined()
    })
  })

  describe('Deploy Workflow', () => {
    const getDeployWorkflow = () => {
      const workflowPath = join(process.cwd(), '.github/workflows/deploy.yml')
      const workflowContent = readFileSync(workflowPath, 'utf-8')
      return parse(workflowContent)
    }

    it('should have valid YAML configuration', () => {
      expect(() => getDeployWorkflow()).not.toThrow()
    })

    it('should have correct workflow name', () => {
      const workflow = getDeployWorkflow()
      expect(workflow.name).toBe('Deploy to Vercel')
    })

    it('should only run on push to main branch', () => {
      const workflow = getDeployWorkflow()
      expect(workflow.on?.push?.branches).toEqual(['main'])
      expect(workflow.on?.pull_request).toBeUndefined()
    })

    it('should have deploy job that needs test job', () => {
      const workflow = getDeployWorkflow()
      expect(workflow.jobs?.deploy).toBeDefined()
      expect(workflow.jobs.deploy.needs).toContain('test')
    })

    it('should use Vercel deployment action', () => {
      const workflow = getDeployWorkflow()
      const steps = workflow.jobs?.deploy?.steps || []
      const deployStep = steps.find(
        (step: any) =>
          step.uses?.includes('amondnet/vercel-action') || step.name?.includes('Deploy to Vercel'),
      )
      expect(deployStep).toBeDefined()
    })

    it('should have required Vercel secrets configured', () => {
      const workflow = getDeployWorkflow()
      const steps = workflow.jobs?.deploy?.steps || []
      const deployStep = steps.find(
        (step: any) =>
          step.uses?.includes('amondnet/vercel-action') || step.name?.includes('Deploy to Vercel'),
      )

      expect(deployStep?.with?.['vercel-token']).toContain('VERCEL_TOKEN')
      expect(deployStep?.with?.['vercel-org-id']).toContain('VERCEL_ORG_ID')
      expect(deployStep?.with?.['vercel-project-id']).toContain('VERCEL_PROJECT_ID')
    })
  })
})
