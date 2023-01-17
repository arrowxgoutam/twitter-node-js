const displayContent =(req, res) => {
    const url = req.url;
    const method = req.method;

    if(url == "/profile"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>This is the profile page</p>');
        return res.end();
    } else if (url == "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>Twitter</p>');
        return res.end();
    } else if (url == "/setting"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Settings</h1>');
        return res.end();
    }


    res.setHeader('Content-Type', 'text/html');
    res.write('<p>Page Not Found 404</p>');
    res.end();
}

module.exports = displayContent;