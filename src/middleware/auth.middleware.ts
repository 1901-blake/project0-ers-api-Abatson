

export function loggedIn(req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.status(401);
        res.send('You need to login')
    }
}

//TODO
//Assert user is a finance manager or admin
export function userMatchingCheckMiddleware(req, res, next) {
    if(req.session.user){
        if(req.session.user.role.role === 'Admin' || req.session.user.role.role === 'Finance-Manager' || req.session.user.userId === +req.params.userId){
            next();
        }else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

export function managerCheckMiddleware(req, res, next) {
    if(req.session.user){
        if(req.session.user.role.role === 'Admin' || req.session.user.role.role === 'Finance-Manager'){
            next();
        }else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}


//TODO
//Assert user is an admin
export function adminCheckMiddleware(req, res, next) {

    if(req.session.user){
        if(req.session.user.role.role === 'Admin'){
            next();
        }else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
    
}