// Vercel Serverless Function to proxy MangaDex API requests
// This solves CORS issues by making requests from the server

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Extract path from query parameters
        const { path, ...queryParams } = req.query;
        
        if (!path) {
            return res.status(400).json({ error: 'Path parameter is required. Use ?path=manga&limit=20' });
        }

        // Build the MangaDex API URL
        const baseUrl = 'https://api.mangadex.org';
        const apiPath = Array.isArray(path) ? path.join('/') : path;
        const apiUrl = `${baseUrl}/${apiPath}`;

        // Build query string from remaining query parameters (excluding path)
        const filteredParams = { ...queryParams };
        const queryString = new URLSearchParams(filteredParams).toString();
        const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

        // Make the request to MangaDex API
        const response = await fetch(fullUrl, {
            method: req.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ 
                error: 'API request failed',
                details: errorText 
            });
        }

        const data = await response.json();
        
        // Return the data with CORS headers
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
