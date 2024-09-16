const fs = require('fs');
const path = require('path');

// Function to check if directory exists and create it if it doesn't
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }
};

// Function to create files only if they don't exist
const createFileIfNotExists = (filePath, content = '') => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`File created: ${filePath}`);
    } else {
        console.log(`File already exists: ${filePath}`);
    }
};

// Function to create the directory and file structure
const createStructure = (baseDir, structure) => {
    structure.forEach(item => {
        const itemPath = path.join(baseDir, item.name);
        if (item.type === 'folder') {
            ensureDirectoryExists(itemPath);
            if (item.children) {
                createStructure(itemPath, item.children);
            }
        } else if (item.type === 'file') {
            createFileIfNotExists(itemPath, item.content);
        }
    });
};

// Project structure
const structure = [
    { name: 'public', type: 'folder', children: [
        { name: 'images', type: 'folder' },
        { name: 'favicon.ico', type: 'file', content: '' },
    ]},
    { name: 'src', type: 'folder', children: [
        { name: 'pages', type: 'folder', children: [
            { name: 'index.tsx', type: 'file', content: '// Landing Page' },
            { name: 'signup.tsx', type: 'file', content: '// Signup Page' },
            { name: 'dashboard.tsx', type: 'file', content: '// Dashboard Page' },
            { name: 'career-discovery.tsx', type: 'file', content: '// Career Discovery Page' },
            { name: 'career-recommendations.tsx', type: 'file', content: '// Career Recommendations Page' },
            { name: 'mentorship.tsx', type: 'file', content: '// Mentorship Page' },
            { name: 'resource-hub.tsx', type: 'file', content: '// Resource Hub Page' },
            { name: 'achievements.tsx', type: 'file', content: '// Achievements & Leaderboard Page' },
            { name: 'profile.tsx', type: 'file', content: '// Profile Page' },
        ]},
        { name: 'components', type: 'folder', children: [
            { name: 'HeroSection.tsx', type: 'file', content: '// Hero Section Component' },
            { name: 'CTAButton.tsx', type: 'file', content: '// Call To Action Button Component' },
            { name: 'Navbar.tsx', type: 'file', content: '// Navbar Component' },
            { name: 'Footer.tsx', type: 'file', content: '// Footer Component' },
            { name: 'QuizCard.tsx', type: 'file', content: '// QuizCard Component for Career Discovery' },
            { name: 'CareerTree.tsx', type: 'file', content: '// Career Tree Component' },
            { name: 'MentorCard.tsx', type: 'file', content: '// Mentor Card Component' },
            { name: 'ResourceCard.tsx', type: 'file', content: '// Resource Card Component' },
            { name: 'BadgeDisplay.tsx', type: 'file', content: '// Badge Display Component' },
            { name: 'Leaderboard.tsx', type: 'file', content: '// Leaderboard Component' },
        ]},
        { name: 'styles', type: 'folder', children: [
            { name: 'globals.css', type: 'file', content: '/* Global styles */' },
            { name: 'landing-page.module.css', type: 'file', content: '/* Landing Page specific styles */' },
        ]},
        { name: 'utils', type: 'folder', children: [
            { name: 'api.ts', type: 'file', content: '// API calls and configurations' },
        ]},
        { name: 'lib', type: 'folder', children: [
            { name: 'auth.ts', type: 'file', content: '// Auth utility functions' },
        ]},
        { name: 'hooks', type: 'folder', children: [
            { name: 'useAuth.tsx', type: 'file', content: '// useAuth custom hook' },
        ]},
    ]},
    { name: '.eslintrc.json', type: 'file', content: '{\n  "extends": "next/core-web-vitals"\n}' },
    { name: '.gitignore', type: 'file', content: 'node_modules/\n.next/\nout/\n' },
    { name: 'next.config.js', type: 'file', content: 'module.exports = {};' },
    { name: 'package.json', type: 'file', content: '' }, // Handled by create-next-app
    { name: 'README.md', type: 'file', content: '# CareerQuest\n' },
];

// Base directory of your Next.js project
const baseDir = path.resolve(__dirname, 'carrerquest');

// Create the structure
createStructure(baseDir, structure);

console.log('Next.js file structure creation completed!');