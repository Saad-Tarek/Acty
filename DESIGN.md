---
name: "Acty"
theme: "light"

colors:
  neutral:
    shade-0: "#FFFFFF"
    shade-1: "#F2F2F2"
    shade-2: "#D8D8D8"
    shade-3: "#B2B2B2"
    shade-4: "#7F7F7F"
    shade-5: "#4C4C4C"
    shade-6: "#191919"
    shade-7: "#000000"
    white: "#FFFFFF"
  torea-bay:
    shade-1: "#E6EBF4"
    shade-2: "#CED8E9"
    shade-3: "#5477B2"
    shade-4: "#0B3D91"
    shade-5: "#083074"
    shade-6: "#04183A"
    shade-7: "#03122B"
  burnt-sienna:
    shade-1: "#FCF1EC"
    shade-2: "#F9E4D9"
    shade-3: "#ECA17C"
    shade-4: "#E57A44"
    shade-5: "#B76136"
    shade-6: "#5B301B"
    shade-7: "#442414"
  silver-tree:
    shade-1: "#F0F7F3"
    shade-2: "#E2F0E8"
    shade-3: "#9CCCB0"
    shade-4: "#72B78F"
    shade-5: "#5B9272"
    shade-6: "#2D4939"
    shade-7: "#22362A"
  hopbush:
    shade-1: "#F9EEF5"
    shade-2: "#F3DEEC"
    shade-3: "#D68DBE"
    shade-4: "#C55DA3"
    shade-5: "#9D4A82"
    shade-6: "#4E2541"
    shade-7: "#3B1B30"

typography:
  heading:
    fontFamily: "Fraunces"
    fontWeight: 700
  body:
    fontFamily: "Inter"
    fontWeight: 400
  sizes:
    desktop:
      h1: 84px
      h2: 60px
      h3: 48px
      h4: 40px
      h5: 32px
      h6: 26px
      text-large: 26px
      text-medium: 20px
      text-regular: 18px
      text-small: 16px
      text-tiny: 12px
    mobile:
      h1: 48px
      h2: 44px
      h3: 32px
      h4: 24px
      h5: 20px
      h6: 18px
      text-large: 18px
      text-medium: 16px
      text-regular: 14px
      text-small: 12px
      text-tiny: 10px

ui:
  style: "elevate"
  buttonRadius: 12px
  tagRadius: 6px
  inputRadius: 12px

cards:
  style: "outlined"
  borderWidth: 1px
  dividerWidth: 1px
  radiusLarge: 16px
  radiusMedium: 16px
  radiusSmall: 16px

schemes:
  - name: "Scheme 1"
    background: "neutral-shade-0"
    backgroundHex: "#FFFFFF"
    foregroundHex: "#FFFFFF"
    textHex: "#000000"
    accentHex: "#0B3D91"
    borderValue: "#00000026"
    useLogoVariant: light
    cssClass: "scheme-1"
  - name: "Scheme 2"
    background: "neutral-shade-1"
    backgroundHex: "#F2F2F2"
    foregroundHex: "#F2F2F2"
    textHex: "#000000"
    accentHex: "#0B3D91"
    borderValue: "#00000026"
    useLogoVariant: light
    cssClass: "scheme-2"
  - name: "Scheme 3"
    background: "neutral-shade-2"
    backgroundHex: "#D8D8D8"
    foregroundHex: "#D8D8D8"
    textHex: "#000000"
    accentHex: "#0B3D91"
    borderValue: "#00000026"
    useLogoVariant: light
    cssClass: "scheme-3"
---

# Acty — Design Specification

This file contains machine-readable design tokens in the YAML frontmatter above, and human-readable guidance below.

## Colors

The design uses a **light** theme with a neutral palette and 4 chromatic palettes.

- **Neutral shades** range from shade-0 (darkest) to shade-7 (lightest), plus white
- **Torea Bay** — primary shade: `#0B3D91`
- **Burnt Sienna** — primary shade: `#E57A44`
- **Silver Tree** — primary shade: `#72B78F`
- **Hopbush** — primary shade: `#C55DA3`

Use the CSS custom properties from `react/globals.css` for all colors (e.g. `--color-neutral-darkest`, `--color-blue-ribbon`).

## Typography

Headings use **Fraunces** at weight 700. Body text uses **Inter** at weight 400.

The type scale has desktop and mobile sizes. Apply mobile sizes at smaller breakpoints. All values are in `react/globals.css`.

## UI Elements

UI style is **elevate** with button radius 12px. Cards use the **outlined** style with border-width 1px.

## Color Schemes

Sections use color schemes to control their visual appearance. Each scheme is derived from a single background color — all other colors (text, foreground, accent, border) are automatically computed for optimal contrast.

| Scheme | Background | Text | Accent | Logo | CSS class |
|--------|-----------|------|--------|------|-----------|
| Scheme 1 | Neutral White (#FFFFFF) | #000000 | #0B3D91 | light | `.scheme-1` |
| Scheme 2 | Neutral Lightest (#F2F2F2) | #000000 | #0B3D91 | light | `.scheme-2` |
| Scheme 3 | Neutral Lighter (#D8D8D8) | #000000 | #0B3D91 | light | `.scheme-3` |

Apply a scheme by adding its CSS class to the section element. See `sitemap.md` for which scheme each section uses.

### Tweaking Schemes

To create visual variation, you can change which scheme a section uses. When switching schemes:

- Swap the CSS class (e.g. change `.scheme-1` to `.scheme-2`)
- All child elements automatically inherit the correct text, accent, and border colors
- Use the matching logo variant (`logo-light.svg` or `logo-dark.svg`) based on the scheme's `useLogoVariant`
- Alternate between light and dark schemes to create visual rhythm
