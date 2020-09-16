const express = require('express');
const app = express();
const shell = require('shelljs');
const port = 3000;
const BASEPATH = 'usdpython';
const PYTHONPATH = process.env.PYTHONPATH;
const CONVERT = `${BASEPATH}/usdzconvert/usdzconvert`;

process.env.PYTHONPATH = `${PYTHONPATH}:${BASEPATH}/USD/lib/python`

app.use(express.static('public'));

app.get('/', (req, res) => {
    /** 
     * Uncomment this to checkout the options for materials etc in your console
     */
    // shell.exec(`${CONVERT} -h`);

    shell.exec(`${CONVERT} chair.glb ./public/chair.usdz -metersPerUnit 1`, function(code, stdout, stderr) {
        if (stderr) {
            res.send(`Error: ${stderr}`)
            return
        }
        res.send(`
            <pre>${stdout}</pre> 
            <h1>🔥 🤟😎 🔥</h1>
            <a href="chair.usdz" rel="ar">View in Apple Quick Look</a>
        `);
    });
    
});

app.listen(port, () => console.log(`Visit https://localhost:${port} to convert...`))