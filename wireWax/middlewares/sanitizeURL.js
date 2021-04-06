const _msg = 'Unauthorized to process this URL!';
module.exports = {
    admin: (req, res, next) => { 
        let userType = req.session.type;
        if(userType !== null){
            next();
        }else{
            res.status(401).json({ status: 0, msg:  _msg});
            res.end();
        }
    },
    adminAndBackendOtherUser: (req, res, next) => { 
        let userType = req.session.type;
        if(userType !== null){
            next();
        }else{
            res.status(401).json({ status: 0, msg: _msg });
            res.end();
        }
    },
    user: (req, res, next) => { 
        let userType = req.session.type;
        if(userType !== null){
            next();
        }else{
            res.status(401).json({ status: 0, msg: _msg });
            res.end();
        }
    },
    fieldManager: (req, res, next) => { 
        let userType = req.session.type;
        if(userType !== null){
            next();
        }else{
            res.status(401).json({ status: 0, msg: _msg });
            res.end();
        }
    }
}
