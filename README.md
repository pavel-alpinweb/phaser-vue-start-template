# Starter Template: Phaser + Vue + Pinia + Vite for HTML5 Games

```md
This is a starter template for creating HTML5 games.  
Optimized for PC and platforms like [itch.io](https://itch.io).  
Supports fullscreen mode.
```

## Tech Stack:

- [Phaser](https://phaser.io) – used for game logic and graphics rendering
- [Vue](https://vuejs.org) – used for building user interfaces
- [Pinia](https://pinia.vuejs.org) – used for managing game state
- [Vite](https://vitejs.dev) – used for project bundling and development

## Authors:

- [Pavel Bezdornov](https://github.com/pavel-alpinweb)
- [Mark Bezdornov](https://github.com/Bakuard)

Art is sourced from open resources.  
Character design and animation by Pavel Bezdornov.


## Built-in Game Mechanics:

- Top-down movement (WASD)
- Platformer movement (WAD)
- Level transitions powered by [Vue Router](https://router.vuejs.org)
- Health gain and loss system

## Installation and Build:

- Requires Node.js version 20+
- Install dependencies: `npm i`
- Start development server: `npm run dev`
- Build the project: `npm run build`
- Serve the built project: `npx serve dist`  
  (This allows running the template on a regular hosting or platforms like itch.io)

## Project Structure:

- `composition` – contains files for game logic using the Phaser engine
- `configs` – contains constants for engine settings, game logic, and event names
- `scenes` – contains files for managing Phaser scenes (`Phaser.Scene`)
- `screens` – contains Vue components responsible for rendering game screens
- `store` – contains files for working with Pinia
- `ui-components` – contains Vue components for rendering the HUD
- `utils` – contains helper functions
- `public/assets` – contains all assets



