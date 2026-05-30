import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INSIGHTS_FILE = path.join(__dirname, '..', 'insights.json');

const router = Router();

router.get('/', async (req, res) => {
 
    if (fs.existsSync(INSIGHTS_FILE)) {
        const fileContent = await fs.readFileSync(INSIGHTS_FILE, 'utf-8');
        const data = fileContent ? await JSON.parse(fileContent) : {};
        return res.status(200).json({ success: true, data });
    }
    
    // If it hasn't been created yet
    res.status(200).json({ 
        success: true, 
        data: {}, 
        message: "No insights logged yet." 
    });
});

export default router;