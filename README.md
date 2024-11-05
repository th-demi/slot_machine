# Slot Machine Game

This project is a **Slot Machine Game** built using **React** and **TailwindCSS**, offering a fun slot machine experience where players can spin reels and win rewards. The game features multipliers and random spins based on item rarity.

## Project Structure

The project is organized as follows:

```
.
├── README.md                 # Project documentation
├── eslint.config.js           # ESLint configuration for maintaining code quality
├── index.html                # HTML template for the app
├── package-lock.json          # Automatically generated file for locking dependency versions
├── package.json               # Manages dependencies, scripts, and project metadata
├── postcss.config.js          # Configuration for PostCSS (CSS transformations)
├── public
│   ├── assets
│   │   ├── audio
│   │   │   ├── pubg_music.mp3  # Background music
│   │   │   └── spin.mp3        # Spin sound effect
│   │   ├── images
│   │   │   ├── adrenaline-syringe.png  # Image of adrenaline syringe
│   │   │   ├── apple.png             # Image of apple
│   │   │   ├── awm.png               # Image of AWM weapon
│   │   │   ├── bandages.png          # Image of bandages
│   │   │   ├── ghillie-suit.png      # Image of ghillie suit
│   │   │   ├── lv3-helmet.png       # Image of Level 3 Helmet
│   │   │   ├── med-kit.png          # Image of med-kit
│   │   │   ├── scar-l.png           # Image of SCAR-L weapon
│   │   │   ├── slot_machine.png     # Image of the slot machine
│   │   │   └── ump45.png            # Image of UMP45 weapon
│   │   └── videos
│   │       └── pubg_background.mp4  # Background video for the app
│   └── vite.svg                   # Vite logo used in the project
├── src
│   ├── App.jsx                    # Main React component that renders the layout and child components
│   ├── SlotMachine.jsx            # React component that implements the slot machine game logic
│   ├── components
│   │   └── ui
│   │       ├── alert.jsx          # Component for displaying win/loss alerts
│   │       ├── button.jsx         # Custom button component for user interactions
│   │       └── card.jsx           # Card component used for layout
│   ├── index.css                  # Global styles and TailwindCSS integration
│   ├── lib
│   │   └── utils.js               # Utility functions for the game logic
│   └── main.jsx                   # Entry point for React app, renders App component
├── tailwind.config.js             # TailwindCSS configuration
└── vite.config.js                 # Vite configuration for building and bundling the project
```

## Directory Breakdown

### `public/`
This directory contains static assets like images, audio files, and videos that are publicly available to the app:
- **assets/audio**: Contains sound effects, including the background music (`pubg_music.mp3`) and the spin sound (`spin.mp3`).
- **assets/images**: Stores images of the different items (weapons, consumables, etc.) used in the game.
- **assets/videos**: Contains the background video (`pubg_background.mp4`) used for the game's theme.
- **vite.svg**: A static SVG file used as a visual asset for the app.

### `src/`
The **src** folder contains the React application source code, including components and utility files:
- **App.jsx**: The main React component, responsible for rendering the app's layout and embedding the slot machine.
- **SlotMachine.jsx**: Handles the logic of the slot machine, including spinning reels, displaying results, and managing the game state.
- **components/ui**: Contains reusable UI components:
  - `alert.jsx`: Displays win or loss notifications.
  - `button.jsx`: A custom button component used for game controls.
  - `card.jsx`: A reusable card component used for layout.
- **index.css**: Contains global styles and TailwindCSS integration for responsive design and utility-based styling.
- **lib/utils.js**: Contains helper functions and utilities used across the app (e.g., randomization logic).
- **main.jsx**: The entry point for the app, where the React application is rendered into the DOM.

### Configuration Files
- **eslint.config.js**: Configures ESLint to ensure code quality and consistency across the project.
- **postcss.config.js**: Configuration for PostCSS, used to process CSS, handle autoprefixing, etc.
- **tailwind.config.js**: The configuration file for TailwindCSS, defining custom utility classes and responsive settings.
- **vite.config.js**: Vite configuration for fast development, bundling, and optimizations in production.

## Getting Started

To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repo-link>
   ```

2. **Install dependencies**:
   Navigate into the project directory and install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Start the development server**:
   To run the app locally, use the following command:

   ```bash
   npm run dev
   ```

   This will start the development server, and you can view the app at `http://localhost:3000`.

## Deployment

I've used Vercel for deploying this app

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework used for styling the app.
- **Vite**: A fast and modern build tool for bundling and optimizing the project.
- **Audio & Video Assets**: Custom media assets to enhance the game's experience.

---