const { SQL } = require('../db/dbconfig')
const { loggedUser } = require('../helper/loggedUser')

const router = require('express').Router()



router.post('/login', async (req, res) => {

    try {
        const { username, password, role } = req.body

        if (!username || !password) {
            return res.status(400).send({ err: "You are missing username or/and passwored" })

        }
        if (!role) {
            return res.status(400).send({ err: "**Are you an Owner or Renter?" })
        }

        const user = await SQL(`SELECT username,password,id
        FROM users
        WHERE username="${username}" AND password="${password}" AND role="${role}"`)
        console.log(user[0].id);

        if (user.length < 1) {
            return res.status(400).send({ err: "**wrong username or/and password" })

        }
        res.send({ msg: "Succefull login " + username, username, role, user })

        req.session.username = username
        req.session.role = role 
        req.session.id = user[0].id 
        console.log( req.session.role);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }


})

router.post('/register', async (req, res) => {
    try {
        const { name, password, famliyName, username } = req.body

        if (!username || !password || !name || !famliyName) {
            return res.status(400).send({ err: "**Missing Information, all filed are required" })
        }


        const usertaken = await SQL(`SELECT * 
        FROM users
        WHERE username = '${username}'`)

        if (usertaken.length !=0) {
            return res.status(400).send({ err: "****username already taken" })
        }

        const register = await SQL(`INSERT INTO users (name,famliyName,username,password,role)
        VALUES ('${name}','${famliyName}' ,'${username}','${password}','user')`)


        console.log(req.body);
        res.send({ msg: "User was created, welcome " + name })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})


router.delete('/logout', (req, res) => {

    req.session.destroy()
    res.send({ msg: "bye bye! see you soon" })

})









module.exports = router