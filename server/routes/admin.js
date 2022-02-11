const { SQL } = require('../db/dbconfig')

const router = require('express').Router()


router.post('/', async (req, res) => {
    try {
        const { descriptions, country, cityName, price, img, dateFrom, dateUntil } = req.body

        const newVaca = await SQL(`INSERT into vacations(descriptions,country,cityName,price,img,dateFrom,dateUntil)
        VALUES ("${descriptions}","${country}","${cityName}",${price},"${img}","${dateFrom}","${dateUntil}")`)
        // console.log(newVaca.insertId);
        await SQL(`INSERT into follow(user_id,vacations_id)
        VALUES (2,${newVaca.insertId})`)

        res.send({ msg: "The vacations was post" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})

router.delete('/:id', async (req, res) => {
    try {

        await SQL(`DELETE FROM vacations WHERE id=${req.params.id}`)

        res.send({ msg: "deleted" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
 
})


router.put('/', async (req, res) => {

    try {
        const { descriptions, id, img, cityName, country, dateFrom, dateUntil, price } = req.body


        if (!descriptions || !img || !cityName || !country || !dateFrom || !dateUntil || !price ) {
            return res.status(400).send({ err: " Everything Is Requird" })
        }

        await SQL(`UPDATE vacations
        SET img = "${img}" , cityName = "${cityName}", country = "${country}" , dateFrom = ${dateFrom} , dateUntil = ${dateUntil}, descriptions = "${descriptions}", price = ${price}
        WHERE id = ${id};`)

        res.send({ msg: "you've changed the post" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }


})

router.put('/img', async (req, res) => {

    try {
        const { img, id } = req.body


        if (!img) {
            return res.status(400).send({ err: " Img is requird" })
        }

        await SQL(`UPDATE vacations
        SET img = '${img}'
        WHERE id = ${id};`)

        res.send({ msg: "you've changed the img" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }


})
router.put('/price', async (req, res) => {

    try {
        const { price, id } = req.body


        if (!price) {
            return res.status(400).send({ err: " price is requird" })
        }

        await SQL(`UPDATE vacations
        SET price = ${price}
        WHERE id = ${id};`)

        res.send({ msg: "you've changed the price" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }


})





module.exports = router