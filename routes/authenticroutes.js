// app/routes.js

module.exports = function(app, passport) {


    // route for showing the profile page

    app.get('/profile', isLoggedIn, function(req, res) {
      let headerObject = req.headers
      let ip = (headerObject['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
      ip = (ip === "::1") ? "local" : ip
      res.json({
                authenticated: true,
                userip: ip,
                username: req.user.twitter.username,
                fullData: req.user
            });
    });
        // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    let headerObject = req.headers
     //the x-forwarded-for property of the header does not appear for local host so add an alternative or will
     //error out locally on split to get the ip address the rest of the requests are common to loacl and remote
    let ip = (headerObject['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
    ip = (ip === "::1") ? "local" : ip
    res.json({
      authenticated: false,
      userip: ip,
      username: null,
      fullData: null
    });
}
