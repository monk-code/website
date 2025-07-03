import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CTAButton from '../CTAButton.vue';

describe('CTAButton', () => {
  describe('Component Type', () => {
    it('renders as an anchor tag when href is provided', () => {
      const wrapper = mount(CTAButton, {
        props: { href: '#projects' },
        slots: { default: 'View Projects' }
      });
      
      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBe('#projects');
    });

    it('renders as a button when no href or to prop is provided', () => {
      const wrapper = mount(CTAButton, {
        slots: { default: 'Click Me' }
      });
      
      expect(wrapper.element.tagName).toBe('BUTTON');
    });
  });

  describe('Variants', () => {
    it('applies primary variant classes by default', () => {
      const wrapper = mount(CTAButton);
      
      expect(wrapper.classes()).toContain('bg-button-primary');
      expect(wrapper.classes()).toContain('text-button-primary-text');
    });

    it('applies secondary variant classes when specified', () => {
      const wrapper = mount(CTAButton, {
        props: { variant: 'secondary' }
      });
      
      expect(wrapper.classes()).toContain('bg-transparent');
      expect(wrapper.classes()).toContain('text-primary');
      expect(wrapper.classes()).toContain('border-2');
      expect(wrapper.classes()).toContain('border-primary');
    });

    it('applies ghost variant classes when specified', () => {
      const wrapper = mount(CTAButton, {
        props: { variant: 'ghost' }
      });
      
      expect(wrapper.classes()).toContain('bg-transparent');
      expect(wrapper.classes()).toContain('text-muted-foreground');
    });
  });

  describe('Sizes', () => {
    it('applies medium size classes by default', () => {
      const wrapper = mount(CTAButton);
      
      expect(wrapper.classes()).toContain('px-6');
      expect(wrapper.classes()).toContain('py-3');
      expect(wrapper.classes()).toContain('text-base');
    });

    it('applies small size classes when specified', () => {
      const wrapper = mount(CTAButton, {
        props: { size: 'sm' }
      });
      
      expect(wrapper.classes()).toContain('px-4');
      expect(wrapper.classes()).toContain('py-2');
      expect(wrapper.classes()).toContain('text-sm');
    });

    it('applies large size classes when specified', () => {
      const wrapper = mount(CTAButton, {
        props: { size: 'lg' }
      });
      
      expect(wrapper.classes()).toContain('px-8');
      expect(wrapper.classes()).toContain('py-4');
      expect(wrapper.classes()).toContain('text-lg');
    });
  });

  describe('Click Handling', () => {
    it('calls onClick handler when clicked', async () => {
      const onClick = vi.fn();
      const wrapper = mount(CTAButton, {
        props: { onClick }
      });
      
      await wrapper.trigger('click');
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('passes event object to onClick handler', async () => {
      const onClick = vi.fn();
      const wrapper = mount(CTAButton, {
        props: { onClick }
      });
      
      await wrapper.trigger('click');
      
      expect(onClick).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  describe('Slot Content', () => {
    it('renders slot content inside a span with proper z-index', () => {
      const wrapper = mount(CTAButton, {
        slots: { default: 'Button Text' }
      });
      
      const span = wrapper.find('span');
      expect(span.exists()).toBe(true);
      expect(span.classes()).toContain('relative');
      expect(span.classes()).toContain('z-10');
      expect(span.text()).toBe('Button Text');
    });
  });

  describe('Base Classes', () => {
    it('applies all base classes for styling and transitions', () => {
      const wrapper = mount(CTAButton);
      
      const expectedClasses = [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-semibold',
        'transition-all',
        'duration-base',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary',
        'focus:ring-offset-2',
        'focus:ring-offset-background',
        'rounded-md',
        'relative',
        'overflow-hidden',
        'group'
      ];
      
      expectedClasses.forEach(className => {
        expect(wrapper.classes()).toContain(className);
      });
    });
  });

  describe('Prop Validation', () => {
    it('accepts valid variant values', () => {
      const validVariants = ['primary', 'secondary', 'ghost'] as const;
      
      validVariants.forEach(variant => {
        const wrapper = mount(CTAButton, {
          props: { variant }
        });
        expect(wrapper.props('variant')).toBe(variant);
      });
    });

    it('accepts valid size values', () => {
      const validSizes = ['sm', 'md', 'lg'] as const;
      
      validSizes.forEach(size => {
        const wrapper = mount(CTAButton, {
          props: { size }
        });
        expect(wrapper.props('size')).toBe(size);
      });
    });
  });
});