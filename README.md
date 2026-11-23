# Cabin Blueprint

An interactive blueprint of a small forest cabin (~16 m², logs and clay) with a Korean *ondol* underfloor heating system. Built with React and Vite.

The interface is in Russian.

## Views

- **Floor plan**: the rooms, the firebox and the chimney.
- **Section A–A**: wall construction and the ondol channels.
- **Ondol system**: how smoke from the firebox runs under the floor and heats it.
- **3D view**: a three-dimensional view of the building.
- The legend can be toggled on and off.

## Running

Node.js 20+ is required.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`).

Static build:

```bash
npm run build
npm run preview
```

The output goes to `dist/` and can be deployed to any static host.

## Stack

React 19, Vite, ESLint, SCSS.
