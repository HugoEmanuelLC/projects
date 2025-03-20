export const PORT = 3001

// Configuration du CORS pour autoriser l'accès à l'API
const whitelist = [
    'http://localhost:8080',
    'http://localhost:3001',
    
    'https://wawmomo-website-test.root.caprover.clavinas.com',
    'http://srv-captain--wawmomo-website-test',
    
];
export const corsOptionsCheck = (req, callback) => {
    console.log('corsOptionsCheck');
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        console.log('Allowed');
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        console.error('Not allowed');
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

