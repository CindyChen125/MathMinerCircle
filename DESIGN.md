---
name: π Finder
description: A scientific instrument for personal discovery in the digits of π.
colors:
  pink: "#ff9cde"
  violet: "#bca0ff"
  gold: "#ffe798"
  bg: "#100b24"
  line: "#51406b"
  muted: "#c8bbde"
  text: "#fbf7ff"
  cyan: "#86e5ff"
  field: "#211638"
  field-border: "#6c5589"
  button-ink: "#2c1239"
  button-hover: "#ffbce9"
  secondary: "#372046"
  terminal-bar: "#2b1b43"
  error: "#ffb8ad"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(48px,5vw,72px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-3px"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-.6px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "11px"
    letterSpacing: "1px"
  digits:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "14px"
    lineHeight: 2.3
    letterSpacing: "7px"
rounded:
  control: "5px"
  secondary: "4px"
  inset: "3px"
  terminal: "6px"
  dialog: "8px"
spacing:
  compact: "8px"
  control-gap: "12px"
  mobile-gutter: "22px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text}"
    rounded: "{rounded.secondary}"
    padding: "11px 14px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    height: "46px"
    padding: "0 13px"
  terminal-bar:
    backgroundColor: "{colors.terminal-bar}"
    padding: "15px 18px"
---

# Design System: π Finder

## Overview

**Creative North Star: "Neon Spectrum"**

Deep violet carries pink and blue ambient light, a faint star field, luminous orbital geometry and precise mathematical data. The implemented world follows the user's science-exhibit direction through thin rules, an understated grid and a digit terminal.

Controls remain compact and orderly. Space Grotesk gives the exhibit its voice, DM Sans supports instructions, and IBM Plex Mono separates instrument data from prose. Pink owns primary actions and selection. Blue marks mathematical data. Lavender defines surfaces and focus context; gold highlights scores and lucky numbers.

**Key Characteristics:**
- Pink actions and blue readouts on illuminated violet.
- Thin borders and restrained luminous depth.
- Distinct display, instructional and mathematical type roles.

## Colors

A cool navy field supports one bright instrument accent and subdued blue-gray explanatory text.

### Primary
- **Electric Cyan** (`cyan`): primary actions, selected options, discoveries, scan line and active navigation underline.

### Neutral
- **Night Navy** (`bg`): page canvas.
- **Instrument Ink** (`button-ink`): dark text on the primary action.
- **Ice White** (`text`): headings and primary control text.
- **Blue-Gray** (`muted`): explanatory text and secondary labels.
- **Instrument Rule** (`line`): section divisions and terminal framing.
- **Field Navy / Field Border** (`field`, `field-border`): recessed input surfaces.
- **Terminal Bar / Secondary Navy** (`terminal-bar`, `secondary`): local surface separation.

Error messages use the warm `error` color. Rank medal colors are local leaderboard details, not additional brand accents.

**The Signal Rule.** Pink marks action and selection; blue marks data; gold marks points and lucky numbers.

## Typography

**Display Font:** Space Grotesk, sans-serif fallback.  
**Body Font:** DM Sans, sans-serif fallback.  
**Label/Mono Font:** IBM Plex Mono, monospace fallback.

Geometric headings create the futuristic voice; plain instructions and measured digits keep the instrument understandable. Georgia is used for the mathematical π symbol only.

### Hierarchy
- **Display:** the fluid frontmatter scale; mobile hero uses (53px), with tighter tracking (-2.5px).
- **Headline:** section headings use the headline token; terminal idle title uses (25px).
- **Body:** the base token supports the page; hero introduction uses (16px/1.65), while most form explanations use (11–12px).
- **Label:** mono labels and readouts generally use (11px); ordinary form labels use DM Sans (12px, 500).
- **Digits:** background stream uses the digits token; meaningful result context uses a denser mono setting (12px/2.3, 1px tracking).

**The Data Voice Rule.** Use mono for sequences, positions and instrument metadata; use sans-serif for explanations and form choices.

## Layout

Header, main and footer share a centered maximum width (1264px). At widths up to (1350px), side margins become (6%). At (650px) and below, gutters become (22px).

The desktop workspace uses a fixed form column (480px), a flexible terminal and a gap (44px). At the intermediate breakpoints (1350px, 900px), form widths become (43%, 46%) and gaps tighten (32px, 24px). At (650px), the workspace stacks with a gap (32px), and its vertical divider disappears. Date controls retain their three-column ratio (1.5fr .8fr 1fr).

The mobile home orbit recedes behind the headline with reduced opacity. The search terminal digit window shortens from (370px) to (300px); while scanning the form hides and the terminal centers in an (820px) workspace. Results now have their own page with a large cyan position, context and prediction verdict. The desktop result report and explanation use a (1.65fr / 1fr) grid; mobile stacks them. Home uses a welcome hero, entry action and a three-step journey strip, with the strip stacking on mobile. Tables scroll horizontally within their own container (minimum width 570px). Dialog actions stack on mobile.

## Elevation & Depth

Thin borders and dark tonal changes provide the structural depth. Diffuse cyan glows belong to live dots, orbital geometry and the scan line. Primary-action hover adds a soft glow; no hard offset shadow vocabulary exists.

### Shadow Vocabulary
- **Action hover:** (`0 6px 24px #86e5ff15`).
- **Live signal:** (`0 0 9px #86e5ff55`).
- **Scan line:** (`0 0 24px #86e5ff88`).

**The Instrument Light Rule.** Glow reinforces the scientific instrument and active discovery; panel boundaries remain thin and precise.

## Shapes

Controls and choice rows use gently eased corners (`control`). Terminal edges use `terminal`, inset selected segments use `inset`, secondary buttons use `secondary`, and the confirmation dialog uses `dialog`. Circular orbit lines, target marks and radio indicators are the recurring mathematical geometry. Interface crosshairs and directional arrows use thin stroke SVG; π remains mathematical notation.

## Components

### Buttons
The primary action is a cyan instrument command, with mono text (600, 11px), a fine bright border and minimum height (48px). Hover brightens the fill and adds the action glow. Disabled actions use opacity (.45) and a waiting cursor. Secondary actions use a dark surface, thin border and minimum height (42px); hover turns the border cyan. Text actions use an underline and cyan hover.

### Inputs / Fields
Recessed dark fields use the input token, a fine field border, and cyan caret. Hover strengthens the border; focus sets a cyan border and outline. The global keyboard focus treatment is a cyan outline (2px) offset (5px). Errors remain visible textual messages.

### Cards / Containers
Prediction rows are clickable labels with a dark fill, thin border and control radius. Hover strengthens the border. Checked rows use a brighter cyan border, teal fill and filled radio dot. The mode selector uses two inset segments; selection adds teal fill, cyan text and a defined border. Keyboard focus outlines both patterns.

### Navigation
Native text links connect the Home, Explorer and Leaderboard documents; `aria-current="page"` uses light text plus a cyan underline. On mobile the three destinations occupy a separate row below the brand. Search and Result include a three-stage journey indicator using `aria-current="step"`. Normal document navigation preserves browser history. The scan status receives focus when the form is hidden; interactive controls retain visible keyboard focus. Leaderboard tabs underline the selected mode and support arrow keys.

### π Sign Reading
The result sidebar offers a native reveal button, followed by a ten-point SVG digit dial, the fictional sign name, traits, prose reading and a lucky-number row. The active dial point represents the verified following digit. A visible proof explains the one-based selector position, and a separate note labels the interpretation as fictional. The reading uses the incumbent cyan data accent, sans-serif prose and monospaced numeric values; it inherits reduced-motion behavior. The catalog is a native details disclosure with a single ruled list, not ten nested cards. Mobile stacks this section beneath the discovery report.

### Digit Terminal
Framed top and bottom bars enclose the dimmed mono stream, target and idle instruction. During discovery, a luminous line sweeps vertically (1.5s, ease-in-out, alternating); results reveal over (.6s) with blur and a small rise. Reduced-motion preference disables animations and transitions and removes the scan line. Highlighted matches use cyan fill with dark text and the inset radius.

## Do's and Don'ts

### Do:
- **Do** use cyan to connect primary actions, selected states and mathematical discoveries.
- **Do** retain the separate display, instruction and data type roles.
- **Do** stack the workspace and retain visible keyboard focus on narrow screens.
- **Do** honor reduced-motion preference for scan and reveal effects.

### Don't:
- **Don't** turn local leaderboard medal colors into competing brand accents.
- **Don't** replace the instrument's fine framing with hard offset shadows.
- **Don't** inherit the build's remaining decorative uppercase kickers or tiny mobile metadata as reusable patterns; they are recorded defects, not system rules.

## Current theme application
The final Neon Spectrum section of style.css overrides the earlier instrument styles. The body uses three fixed radial ambient lights over violet; content panels remain opaque for readability. Primary controls are pink with dark text and 12px corners; inputs have 9px corners. Navigation uses lavender pill selection. The orbital π gains a pink elliptical ring, violet illumination and a gold locator. Motion remains limited to existing interactions and respects reduced-motion settings. Home retains only the title, short description and Start action.

### Ambient and scan motion
The star-field layer carries slow 28-second transform-based aurora drift; a second glow follows fine-pointer input with interpolation. There is no in-site motion toggle; only the system reduced-motion preference disables effects. Scanning centers a three-ring instrument around the target sequence. One fixed verified digit passage translates over four seconds, while a light band sweeps once; the final phase highlights the true position or the completed not-found search. No random or frame-swapped digit rain is used.

The interactive background now uses a clearly visible 520px pink/violet spotlight, stronger parallax, and 1.4-second click/tap rings. Aurora drift is 18 seconds. Effects stay behind controls, ignore pointer hits, and respect reduced-motion preferences.

Refinement: visible cursor outlines and click rings are removed. Pointer light is diffuse and low-opacity, interpolation is slower, parallax travel is reduced, and ambient drift returns to 26 seconds. The response stays perceptible without becoming a foreground effect.
