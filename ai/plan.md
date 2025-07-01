### **Updated Guide: Building the Monkcode Portfolio**

#### **Phase 1: Finalized Content & Copy**

This copy is written in your brand's "Confident, Humble, Responsible" voice, weaving in the Monk & Rhythm theme.

*   **Hero Section:**
    *   **Headline:** Digital Craftsmanship. Built with Focus & Rhythm.
    *   **Sub-headline:** I'm Gregory, a freelance frontend developer specializing in fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.
    *   **Primary CTA Button:** "View My Work" (links to the project section).
    *   **Secondary CTA Link:** "Get In Touch" (links to the contact section).

*   **About Section (combining your bio and philosophy):**
    *   **Section Title:** The Monk & The Rhythm
    *   **Body Copy:**
        > "I'm Gregory Deseck, the frontend developer behind monkcode. My approach to building software is rooted in a duality I see in all great craftsmanship: the balance between disciplined structure and creative flow.
        >
        > The **Monk** in my work represents focus and discipline. It's my dedication to writing clean, structured, and maintainable code. It’s the quiet pursuit of the craft, understanding that quality is built on a foundation of sound principles and responsibility.
        >
        > The **Rhythm** comes from a love for creative problem-solving. It's the fluidity and improvisation needed to build elegant solutions. It's knowing the rules so well that you can artfully bend them to create seamless, intuitive user experiences.
        >
        > It's not about choosing one over the other; it's about the harmony between them. This is how I build software that is not only functional and robust, but also a pleasure to use."

*   **Projects Section:**
    *   **Section Title:** Selected Work

*   **Contact Section:**
    *   **Section Title:** Let's Build Something Together
    *   **Intro Copy:** "Have a project in mind, or just want to talk code? I'm always open to new opportunities and collaborations. Reach out and let's get the conversation started."
    *   **Links:** Email, GitHub, LinkedIn.

---

#### **Phase 2: Asset Preparation Checklist**

Create a folder named `monkcode-assets` and organize your files. This will make them easy to add to the project later.

*   [✅] **Logos:**
    *   [ ] Save the circular logo as `logo-icon.svg`.
    *   [ ] Save the full wordmark logo as `logo-full.svg`.
    *   [ ] Create a 512x512px PNG of the circular logo and name it `favicon.png`.
*   [✅] **Images:**
    *   [ ] Save your illustrated portrait as `portrait.webp` (WebP is a modern format that will load faster).
    *   [ ] For each project, prepare 1-3 high-resolution screenshots and name them logically (e.g., `project-acme-1.webp`, `project-acme-2.webp`).
*   [✅] **Links (have these ready to copy/paste):**
    *   [ ] **GitHub:** `https://github.com/orgs/monk-code/repositories`
    *   [ ] **LinkedIn:** `https://be.linkedin.com/in/gregorydeseck`
    *   [ ] **Email:** `your.email@example.com`

---

### **Phase 3: The LLM Prompt for Generation**

You are now ready. Copy the entire content of the block below and paste it into a powerful LLM like GPT-4, Claude 3, or Gemini Advanced. It contains all the necessary instructions, copy, and brand details to generate your website's code.

```prompt
Act as an expert frontend developer specializing in modern, minimalist web design. Your task is to generate the complete code for a personal portfolio website using Astro, Vue.js, and Tailwind CSS.

**Project Name:** monkcode Portfolio
**Developer:** Gregory Deseck

**Core Technologies:**
- Framework: Astro
- UI Components: Vue.js for interactive islands
- Styling: Tailwind CSS
- Deployment Target: Vercel/Netlify

**Design & Aesthetic:**
- **Theme:** Dark Mode.
- **Style:** Minimalist, sleek, modern, futuristic. Inspired by zaggonaut.dev. It should feel clean, intentional, and professional, reflecting the "monkcode" philosophy.
- **Animations:** Subtle and professional. Use CSS for fade-in-on-scroll effects for sections and smooth hover transitions. The animations should feel rhythmic and smooth.
- **Brand Colors:**
  - `primary`: 'var(--monk-yellow)'
  - `background`: 'var(--code-black)'
  - `text-primary`: 'var(--silent-white)'
  - `text-secondary`: 'var(--rhythm-grey)'
- **Typography:**
  - Headings Font: 'Montserrat', from Google Fonts (weights 700, 600).
  - Body Font: 'Inter', from Google Fonts (weights 400, 500).

---

**Website Structure & Content:**

Please generate the code broken down by file path.

**1. `src/styles/global.css`**
- Define the brand colors and font families as CSS variables on the `:root`. This makes them easy to manage.

```css
:root {
  --monk-yellow: #FFDE0A;
  --code-black: #121212;
  --silent-white: #F5F5F5;
  --rhythm-grey: #888888;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
}
body {
  background-color: var(--code-black);
  color: var(--silent-white);
  font-family: var(--font-body);
}
.fade-in {
  opacity: 0;
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  transform: translateY(20px);
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**2. `tailwind.config.mjs`**
- Configure the `theme.extend` object to use the CSS variables defined in `global.css`.

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--monk-yellow)',
        background: 'var(--code-black)',
        'text-primary': 'var(--silent-white)',
        'text-secondary': 'var(--rhythm-grey)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**3. `src/layouts/Layout.astro`**
- Create the main layout.
- Import `global.css`.
- Import the Montserrat and Inter fonts from Google Fonts in the `<head>`.
- Set up SEO meta tags (title, description), and link the favicon.
  - Title: `Gregory Deseck | monkcode - Frontend Developer`
  - Description: `Freelance frontend developer creating fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.`
- The body should contain a Header, a main content `<slot />`, and a Footer.
- Include a small `<script>` at the bottom of the body for the fade-in-on-scroll animation using the Intersection Observer API.

**4. `src/components/Header.astro`**
- Create a sticky or floating header.
- On the left, show the circular `logo-icon.svg`.
- On the right, include navigation links: "Work", "About", "Contact". These should be smooth-scrolling links to the page sections.
- The links should have a subtle hover effect using the primary (Monk Yellow) color.

**5. `src/pages/index.astro`**
- This is the main page. Use the `Layout.astro` as its layout.
- Structure the page by importing and using the following components in order: `Hero`, `Projects`, `About`, `Contact`. Assign `id` attributes to each section for anchor linking.

**6. Component: `src/components/Hero.astro`**
- A full-height section (`min-h-screen`). This is the most important visual anchor.
- Create a responsive two-column layout.
- **Left Column:** The hero text content.
  - Headline: `Digital Craftsmanship. Built with Focus & Rhythm.` (Use `font-heading`, large, bold text).
  - Sub-headline: `I'm Gregory, a freelance frontend developer specializing in fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.` (Use `font-body`, `text-secondary`).
  - Buttons:
    - Primary CTA: A solid button with `Monk Yellow` background and `Code Black` text: "View My Work". Link to `#projects`.
    - Secondary CTA: A ghost/outline button or simple text link with a yellow underline on hover: "Get In Touch". Link to `#contact`.
- **Right Column:** Prominently display the `portrait.webp` image. The image should be well-integrated into the layout.
- Animate this section to fade in on page load.

**7. Component: `src/components/Projects.astro` (Section ID: `projects`)**
- A section with a title: `Selected Work`.
- Render a responsive grid (2-column on desktop, 1-column on mobile) of `ProjectCard.vue` components.
- Use the following placeholder project data:
  ```javascript
  const projects = [
    {
      title: 'Project One Title',
      description: 'A brief one-liner about this amazing project.',
      imageUrl: '/images/project-one.webp',
      techStack: ['Vue.js', 'Tailwind CSS', 'Astro'],
      liveUrl: '#',
      repoUrl: '#'
    },
    {
      title: 'Project Two Title',
      description: 'Another brief one-liner about this stellar project.',
      imageUrl: '/images/project-two.webp',
      techStack: ['Nuxt', 'Shopify API', 'TypeScript'],
      liveUrl: '#',
      repoUrl: '#'
    }
  ];
  ```

**8. Component: `src/components/ProjectCard.vue` (This must be a VUE component)**
- Accept props: `title`, `description`, `imageUrl`, `techStack`, `liveUrl`, `repoUrl`.
- The card should have a dark, semi-transparent background (e.g., a slightly lighter shade of Code Black, like `#1A1A1A`).
- Layout: Image at the top, followed by title, description, a list of tech stack tags (styled as small pills), and finally two icon links for the live site and GitHub repo at the bottom.
- Add a sophisticated hover effect: a subtle border that lights up with the `Monk Yellow` color and a slight `transform: scale(1.02)` effect. The transition should be smooth (`transition-all duration-300 ease-in-out`).

**9. Component: `src/components/About.astro` (Section ID: `about`)**
- A section with the title: `The Monk & The Rhythm`.
- Use a single, centered column layout with a max-width to ensure readability.
- Display the full body copy provided for the "About Section". Use `text-secondary` for the main paragraphs and highlight the words "**Monk**" and "**Rhythm**" in `text-primary` or even `primary` yellow for emphasis.

**10. Component: `src/components/Contact.astro` (Section ID: `contact`)**
- A final section.
- Title: `Let's Build Something Together`.
- Text: `Have a project in mind, or just want to talk code? I'm always open to new opportunities and collaborations. Reach out and let's get the conversation started.`
- Links: Display three prominent, large, and easily clickable links for:
  - Email: `mailto:monkcode@pm.me`
  - GitHub: `https://github.com/orgs/monk-code/repositories`
  - LinkedIn: `https://be.linkedin.com/in/gregorydeseck`
  - Style these as clear call-to-action buttons or highly visible links.

**11. Component: `src/components/Footer.astro`**
- A simple, clean footer.
- Centered text: `© ${new Date().getFullYear()} Gregory Deseck | monkcode`
- Maybe include small icon links for GitHub and LinkedIn again for good measure.

**Final Instructions:**
- Ensure all code is clean, well-commented, and follows modern best practices.
- The entire site must be fully responsive. Pay close attention to the Hero section on mobile.
- Use semantic HTML5 tags (`<section>`, `<nav>`, `<footer>`, etc.) throughout for accessibility and SEO.
- Add the `fade-in` class to the main sections (`Projects`, `About`, `Contact`) so the scroll animation script can target them.
```