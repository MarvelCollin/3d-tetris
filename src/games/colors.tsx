import * as THREE from 'three';

// Define multiple color themes
const THEMES = {
    neon: {
        colors: [
            0x00ffff, // Cyan
            0xff1493, // Deep Pink
            0x7fff00, // Chartreuse
            0xff4500, // Orange Red
            0x4169e1, // Royal Blue
            0xffd700, // Gold
            0x9400d3  // Violet
        ],
        background: 0x000811,
        grid: 0x0088ff,
        border: 0x00ffff
    },
    retro: {
        colors: [
            0xff0000, // Red
            0x00ff00, // Green
            0x0000ff, // Blue
            0xffff00, // Yellow
            0xff00ff, // Magenta
            0x00ffff, // Cyan
            0xffa500  // Orange
        ],
        background: 0x111111,
        grid: 0x444444,
        border: 0x888888
    },
    pastel: {
        colors: [
            0xffb3ba, // Pastel Red
            0xbaffc9, // Pastel Green
            0xbae1ff, // Pastel Blue
            0xffffba, // Pastel Yellow
            0xffdfba, // Pastel Orange
            0xe0bbff, // Pastel Purple
            0xdcd0ff  // Pastel Violet
        ],
        background: 0x2a2a2a,
        grid: 0x444444,
        border: 0x666666
    },
    monochrome: {
        colors: [
            0xffffff, // White
            0xe6e6e6,
            0xcccccc,
            0xb3b3b3,
            0x999999,
            0x808080,
            0x666666
        ],
        background: 0x111111,
        grid: 0x333333,
        border: 0x555555
    },
    cyberpunk: {
        colors: [
            0xff00ff, // Magenta
            0x00ffff, // Cyan
            0xff3366, // Hot Pink
            0x33ff33, // Bright Green
            0xffff00, // Yellow
            0xff9900, // Orange
            0x9933ff  // Purple
        ],
        background: 0x000033,
        grid: 0x003366,
        border: 0x0099ff
    }
};

// Get random theme
export const currentTheme = THEMES[Object.keys(THEMES)[Math.floor(Math.random() * Object.keys(THEMES).length)]];

export const COLORS = currentTheme.colors;

// Add bevel to blocks
export const BLOCK_GEOMETRY = new THREE.BoxGeometry(0.92, 0.92, 1.2);

export const MATERIALS = COLORS.map(color => 
    new THREE.MeshPhongMaterial({
        color,
        opacity: 0.95,
        transparent: true,
        shininess: 100,
        specular: 0xffffff,
        emissive: new THREE.Color(color).multiplyScalar(0.3),
        flatShading: false,
        metalness: 0.5,
        roughness: 0.2,
    })
);

export const SHADOW_MATERIALS = COLORS.map(color => 
    new THREE.MeshPhongMaterial({
        color: color,
        opacity: 0.2,
        transparent: true,
        shininess: 30,
        emissive: new THREE.Color(color).multiplyScalar(0.15),
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        wireframe: true
    })
);