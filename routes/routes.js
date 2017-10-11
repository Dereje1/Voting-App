// app/routes.js

module.exports = function(app, passport) {


    // route for showing the profile page

    app.get('/profile', isLoggedIn, function(req, res) {
        console.log("Hello???")  
        res.send({
            user : req.user // get the user out of session and pass to template
        });
    });
        // route for logging out
    app.get('/logout', function(req, res) {
        console.log("Logging Out")
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
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
