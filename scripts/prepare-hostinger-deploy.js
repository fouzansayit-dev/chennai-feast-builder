import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const outputPublicDir = path.join(projectRoot, '.output', 'public');
const assetsDir = path.join(outputPublicDir, 'assets');
const indexPath = path.join(outputPublicDir, 'index.html');

if (!fs.existsSync(assetsDir)) {
  console.error('Error: .output/public/assets directory not found. Run "npm run build" first.');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsEntry = assetFiles.find(f => /^index-.*\.js$/.test(f));
const cssEntry = assetFiles.find(f => /^styles-.*\.css$/.test(f));

if (!jsEntry || !cssEntry) {
  console.error('Error: Could not find index-*.js or styles-*.css in .output/public/assets');
  console.log('Found assets:', assetFiles);
  process.exit(1);
}

console.log(`Found JS entry: ${jsEntry}`);
console.log(`Found CSS entry: ${cssEntry}`);

let htmlContent = fs.readFileSync(indexPath, 'utf-8');

// Inject CSS if not present
if (!htmlContent.includes(cssEntry)) {
  htmlContent = htmlContent.replace(
    '</head>',
    `  <link rel="stylesheet" href="/assets/${cssEntry}" />\n</head>`
  );
}

// Inject JS if not present
if (!htmlContent.includes(jsEntry)) {
  htmlContent = htmlContent.replace(
    '</body>',
    `  <script type="module" src="/assets/${jsEntry}"></script>\n</body>`
  );
}

fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log('Successfully updated .output/public/index.html with script and stylesheet tags!');

console.log('Creating hostinger_deploy.zip with Linux/POSIX forward slashes...');
try {
  execSync('python scripts/make-zip.py', { cwd: projectRoot, stdio: 'inherit' });
  console.log('Deployment zip ready!');
} catch (err) {
  console.error('Failed to create zip file:', err);
}
