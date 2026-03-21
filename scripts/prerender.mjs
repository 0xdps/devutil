import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keep in sync with src/App.tsx (canonical paths only; omit duplicate JSON tool aliases)
const routes = [
    '/',
    '/data-transform',
    '/encoding',
    '/text-utilities',
    '/generators',
    '/hash-verify',
    '/jwt-decoder',
    '/code-formatter',
    '/regex-tester',
    '/code-diff',
    '/color-picker',
    '/url-tools',
    '/seo-generator',
    '/qr-code',
    '/timestamp-tools',
    '/timezone-compare',
    '/markdown-previewer',
    '/html-playground',
    '/js-runner',
    '/regex-playground',
    '/contribute',
];

const distPath = path.join(__dirname, '..', 'dist');
const port = 4173; // Vite preview port

async function prerender() {
    console.log('🚀 Starting pre-rendering...\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        for (const route of routes) {
            const page = await browser.newPage();

            // Navigate to the page
            const url = `http://localhost:${port}${route}`;
            console.log(`📄 Pre-rendering: ${route}`);

            await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: 30000,
            });

            // Wait a bit for React Helmet to update meta tags
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the rendered HTML
            const html = await page.content();

            // Determine output path
            const outputPath = route === '/'
                ? path.join(distPath, 'index.html')
                : path.join(distPath, route, 'index.html');

            // Create directory if needed
            const outputDir = path.dirname(outputPath);
            await fs.mkdir(outputDir, { recursive: true });

            // Write the HTML file
            await fs.writeFile(outputPath, html, 'utf8');

            console.log(`   ✅ Saved to: ${path.relative(distPath, outputPath)}`);

            await page.close();
        }

        console.log(`\n✨ Pre-rendering complete! Generated ${routes.length} pages.`);
    } catch (error) {
        console.error('❌ Pre-rendering failed:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

prerender();
