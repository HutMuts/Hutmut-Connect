# Hut Muts Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Zillow's professional real estate aesthetic combined with two-sided marketplace leaders like Airbnb (trust-building), adapted for the property rental vertical with emphasis on credibility, warmth, and simplicity.

## Core Design Principles
1. **Trust-First**: Clean, professional aesthetic that signals credibility and security
2. **Dual Personas**: Seamless toggle between Renter and Landlord experiences
3. **Mobile-First**: Primary touchpoint for Muts scouting out properties on-the-go
4. **Conversion-Focused**: Clear path from landing - persona selection - waitlist signup
5. **Inviting**: Generous spacing and subtle shadows create a welcoming feel

## Color System (Zillow-Inspired)
- **Primary**: #006AFF (Zillow Blue) - CTAs, highlights, active states
- **Background**: #FFFFFF (White) - clean, professional main background
- **Text Primary**: #2A2A33 (Dark Charcoal) - high readability text
- **Text Secondary**: Slate grays for muted content
- **Accent**: Light blue tints for hover states and highlights
- **Cards**: Slightly off-white (#FAFAFA) for subtle elevation

## Typography
- **Primary Font**: Inter (Google Fonts) - modern, professional, excellent readability
- **Headings**: Font weights 600-700, larger sizes (text-4xl to text-6xl)
- **Body**: Font weight 400-500, text-base to text-lg
- **Hierarchy**: Clear distinction between H1 (hero), H2 (sections), H3 (cards)

## Layout System
**Spacing**: Generous padding for breathing room
- Mobile: py-20, px-4-6 for sections
- Desktop: py-32, max-w-7xl containers
- Increased vertical spacing between sections for an "inviting" feel

## Component Library

### Buttons & Cards
- Border radius: 8px (rounded-md) on all buttons and cards
- Buttons use primary color (#006AFF) with white text
- Cards have subtle border and background differentiation

### Navigation
- Fixed light navbar with logo, persona toggle pill (center), and "Join Waitlist" CTA
- Mobile: Hamburger with slide-out menu
- Background blur effect for modern feel

### Hero Section
- Full-width split design (60/40)
- Left: Bold headline, mission statement, dual CTA buttons (Renter/Landlord entry)
- Right: Visual representation with floating stat markers
- Generous padding: pt-40 pb-32 on desktop

### Persona Toggle
- Pill-style switch component
- Active state: Primary blue background with white text
- Inactive state: Muted background with gray text
- Smooth slide transition (200ms)

### Floating Map Markers
- Stats cards appear to "float" above content
- Subtle drop shadow (marker-shadow class)
- Creates depth and visual interest
- Shadow: 0 4px 12px with low opacity

### Waitlist Form
- Center-aligned on light background section
- Input fields with clear labels and primary focus rings
- Large submit button with primary color
- Success state: Checkmark animation with confirmation message

### Footer
- Four columns: Brand, For Renters, For Landlords, Contact
- Light background, muted text
- Proper spacing and hierarchy

## Icons (Lucide-React)
- Home, Search, Shield-Check, Users, MapPin, Bell, Mail, Check-Circle
- Size: 24px for cards, 20px for inline, 32px for hero features

## Shadows
- Cards: Subtle shadow (shadow-sm to shadow-md)
- Floating markers: marker-shadow class for floating effect
- Creates depth without being overwhelming

## Mobile Responsiveness
- Hero: Stack vertically on mobile
- Cards: Single column on mobile, grid on desktop
- Toggle: Remains accessible, centered in mobile nav
- Forms: Full-width inputs with proper touch targets (min 44px height)
- Consistent horizontal padding across breakpoints

## Accessibility
- High contrast between blue and white (WCAG AAA)
- Focus rings on all interactive elements (primary blue)
- Semantic HTML, aria-labels for toggle state
- Keyboard navigation throughout
