/**
 * Design tokens extracted from Figma
 * File: Social Media Forum Web App Design (miaGLg9QUVP0OWDVCuycoq)
 * Component: SignUp (node-id=3941-21173)
 */

// ============================================
// COLOR TOKENS
// ============================================

export const colors = {
  // Background colors (from Figma)
  background: {
    primary: '#F7F7F7', // Secondary Color/Background 2 (logo icon bg)
    dark: {
      base: '#262D34', // Dark 3 (main background)
      surface: '#1E252B', // Dark 2 (left panel)
      elevated: '#2C353D', // Dark 4 (button background)
    },
  },

  // Brand colors (from Figma)
  brand: {
    primary: '#FF8F67', // Red/Red 60 (main accent - logo, button)
    secondary: '#FF4401', // Red/Red (full accent)
    muted: '#3F4354', // Secondary Color/Secondary 2 (divider lines)
  },

  // Text colors
  text: {
    primary: '#FFFFFF', // On dark backgrounds
    secondary: '#F7F7F7', // Secondary text
    muted: '#8A92A6',
    inverse: '#1E252B', // On light backgrounds
  },

  // Border colors
  border: {
    default: '#3F4354', // Secondary Color/Secondary 2
    focus: '#FF8F67', // Red/Red 60
    error: '#EF4444',
  },

  // Status colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

const fontFamily = {
  sans: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

const fontSize = {
  // From Figma text styles
  h1: '30px', // style_716CX1 (hero text)
  h2: '26px', // Bold 26 (logo)
  h3: '18px', // SemiBold 18 ("or" text)
  body: '14px', // Regular 14 (links)
  base: '16px',
} as const;

const fontWeight = {
  bold: '700', // Bold from Figma
  semibold: '600', // SemiBold
  medium: '500',
  regular: '400', // Regular
} as const;

const lineHeight = {
  tight: '1.33', // 1.3333333333333333 (hero text)
  normal: '1.46', // 1.4615384615384615 (logo)
  relaxed: '1.44', // 1.4444444444444444 ("or" text)
  loose: '1.57', // 1.5714285714285714 (links)
} as const;

// Text styles from Figma
const textStyle = {
  hero: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.h1,
    lineHeight: '40px', // 1.33 * 30
  },
  logo: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.h2,
    lineHeight: '38px', // 1.46 * 26
  },
  or: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.h3,
    lineHeight: '26px', // 1.44 * 18
  },
  link: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.body,
    lineHeight: '22px', // 1.57 * 14
  },
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyle,
} as const;

// ============================================
// SPACING TOKENS
// ============================================

export const spacing = {
  // Panel gap from Figma (260px between Info and Signup)
  panelGap: '260px',

  // Container padding
  containerPadding: {
    desktop: '148px', // Left offset of main content (Variant2: 148, Default: 145)
    mobile: '24px',
  },

  // Vertical spacing
  verticalGap: {
    logo: '40px', // Logo position from top
    section: '40px', // Gap between sections in Info panel
    form: '29px', // Gap between form fields
    mobileSection: '80px', // Mobile section gap
  },

  // Component padding
  padding: {
    infoCard: '20px', // Info card padding
    button: '10px 40px', // Next button padding
    socialButton: '12px 119px', // Social button padding
    logo: '4px', // Logo icon padding
  },

  // Border radius
  borderRadius: {
    sm: '4px',
    md: '6px', // Logo borderRadius
    lg: '8px', // Info cards, buttons
    xl: '12px',
    full: '9999px',
  },
} as const;

// ============================================
// LAYOUT TOKENS
// ============================================

export const layout = {
  // Container widths
  container: {
    desktop: '1440px',
    mobile: '375px',
  },

  // Panel widths
  panel: {
    half: '720px', // Background width (left panel)
    form: '420px', // Social button width
  },

  // Heights
  height: {
    desktop: '900px',
    mobile: '1120px',
  },

  // Divider
  divider: {
    width: '180px', // Line width (one side)
    gap: '21px', // Gap around "or" text
  },

  // Logo icon
  logo: {
    width: '22px',
    height: '22px',
    innerIcon: '16px',
    innerIconHeight: '20px',
  },
} as const;

// ============================================
// SHADOW TOKENS
// ============================================

export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// ============================================
// TRANSITION TOKENS
// ============================================

export const transition = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================
// THEME VARIANTS
// ============================================

export const theme = {
  dark: {
    background: colors.background.dark.base,
    surface: colors.background.dark.surface,
    elevated: colors.background.dark.elevated,
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    border: colors.border.default,
    primary: colors.brand.primary,
  },
} as const;

// ============================================
// TAILWIND CONFIG EXTENSION
// ============================================

/**
 * Use this to extend tailwind.config.js with design tokens
 */
export const tailwindThemeExtension = {
  colors: {
    // Background
    'bg-primary': colors.background.primary,
    'dark-2': colors.background.dark.surface,
    'dark-3': colors.background.dark.base,
    'dark-4': colors.background.dark.elevated,
    // Brand
    'brand-primary': colors.brand.primary,
    'brand-secondary': colors.brand.secondary,
    'brand-muted': colors.brand.muted,
    // Text
    'text-primary': colors.text.primary,
    'text-secondary': colors.text.secondary,
    'text-muted': colors.text.muted,
    'text-inverse': colors.text.inverse,
    // Border
    'border-default': colors.border.default,
    'border-focus': colors.border.focus,
  },
  fontFamily: {
    sans: [typography.fontFamily.sans],
  },
  fontSize: {
    'hero': ['30px', { lineHeight: '1.33', fontWeight: '700' }],
    'logo': ['26px', { lineHeight: '1.46', fontWeight: '700' }],
    'or': ['18px', { lineHeight: '1.44', fontWeight: '600' }],
    'link': ['14px', { lineHeight: '1.57', fontWeight: '400' }],
  },
  spacing: {
    'panel-gap': spacing.panelGap,
    'section-gap': spacing.verticalGap.section,
    'form-gap': spacing.verticalGap.form,
  },
  borderRadius: {
    'logo': spacing.borderRadius.md,
    'card': spacing.borderRadius.lg,
  },
  boxShadow: shadow,
} as const;
