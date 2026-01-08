# Hutmuts Design Guidelines

## Design Approach
**Reference-Based**: Drawing from professional two-sided marketplace leaders like Airbnb (trust-building) and Linear (clean professionalism), adapted for the property rental vertical with emphasis on credibility and simplicity.

## Core Design Principles
1. **Trust-First**: Dark, premium aesthetic that signals professionalism and security
2. **Dual Personas**: Seamless toggle between Renter and Landlord experiences
3. **Mobile-First**: Primary touchpoint for Scouts finding properties on-the-go
4. **Conversion-Focused**: Clear path from landing → persona selection → waitlist signup

## Color System (User-Specified)
- **Primary Dark**: #0f172a (Dark Navy) - backgrounds, headers
- **Accent**: #10b981 (Emerald Green) - CTAs, highlights, success states
- **Supporting**: Slate grays (from Tailwind slate palette) for text and borders
- **Neutrals**: White (#ffffff) for text on dark, Dark Navy for text on light

## Typography
- **Primary Font**: Inter (Google Fonts) - modern, professional, excellent readability
- **Headings**: Font weights 700-800, larger sizes (text-4xl to text-6xl)
- **Body**: Font weight 400-500, text-base to text-lg
- **Hierarchy**: Clear distinction between H1 (hero), H2 (sections), H3 (cards)

## Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Mobile: py-12, px-4 for sections
- Desktop: py-20 to py-24, max-w-7xl containers

## Component Library

### Navigation
- Fixed dark navbar with logo, persona toggle pill (center), and "Join Waitlist" CTA
- Mobile: Hamburger with slide-out menu

### Hero Section
- Full-width split design (60/40)
- Left: Bold headline, mission statement, dual CTA buttons (Renter/Landlord entry)
- Right: High-quality image showing physical "For Rent" sign being photographed by Scout
- Height: 85vh on desktop, auto on mobile (stacked)

### Persona Toggle
- Pill-style switch component (150px wide)
- Active state: Emerald green background with white text
- Inactive state: Transparent with slate-400 text
- Smooth slide transition (200ms)

### Dynamic Content Sections (Changes based on persona)
**For Renters**:
- How It Works (3 cards): Scouts Find → You Get Notified → Connect Direct
- Benefits grid (2x2): Hidden Listings, No Competition, Direct to Landlord, Scout-Verified

**For Landlords**:
- How It Works (3 cards): List Private → Scouts Promote → Verified Leads Only
- Benefits grid (2x2): Zero Spam, Pre-Qualified, No Agency Fees, Stay Private

### Waitlist Form (Prominent CTA Section)
- Center-aligned on dark navy background
- Input fields: Name, Email with emerald green focus rings
- Large submit button with emerald background
- Persona automatically captured from toggle state
- Success state: Checkmark animation with confirmation message

### Trust Elements
- Stats bar: "X Scouts Active • Y Properties Found • Z Verified Landlords"
- Simple testimonial cards with emerald accent border-left
- Scout verification badge (Lucide icons: Shield-Check)

### Footer
- Three columns: About, For Renters, For Landlords
- Social links, contact email, legal links
- Dark navy background, slate-400 text

## Icons (Lucide-React)
- Home, Search, Shield-Check, Users, MapPin, Bell, Mail, Check-Circle
- Size: 24px for cards, 20px for inline, 32px for hero features

## Images
**Hero Image**: Professional photo of someone holding phone photographing a "For Rent" sign on building exterior (conveys the core value prop)
**Section Images**: None - keep focus on clarity and conversion

## Animations
- Persona toggle: Smooth slide (200ms ease-in-out)
- Form submission: Gentle fade + success checkmark
- Scroll: Subtle fade-in for sections (keep minimal)
- No parallax, no complex interactions

## Mobile Responsiveness
- Hero: Stack vertically, image below text
- Cards: Single column on mobile, grid on desktop
- Toggle: Remains accessible, centered in mobile nav
- Forms: Full-width inputs with proper touch targets (min 44px height)

## Accessibility
- High contrast between emerald/white on dark navy (WCAG AAA)
- Focus rings on all interactive elements (emerald green)
- Semantic HTML, aria-labels for toggle state
- Keyboard navigation throughout