import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, '..', 'dist');

function injectScript(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture.js') || !content.includes('</head>')) {
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Injected console capture script into ${filePath}`);
}

function processDirectory(dirPath) {
  const files = readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Injecting console capture script into HTML files...');
processDirectory(distPath);
console.log('Console capture script injection complete!');