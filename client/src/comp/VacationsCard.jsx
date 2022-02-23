import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

/////////////=========== Page for Admin edit and delete vacations==============///////////////

export default function VacationsCard({ vaca, vacations, setVacations }) {


    const [update, setUpdate] = useState(false);
    const [descriptions, setDescriptions] = useState("");
    const [country, setCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [price, setPrice] = useState();
    const [img, setImg] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateUntil, setDateUntil] = useState("");

    const delvacations = async () => {
        const res = await fetch(`http://localhost:1000/admin/${vaca.id}`, {
            method: "delete",
            headers: { 'content-type': 'application/json' },
            credentials: "include"
        })
        setUpdate(true)
    }


    const editvacation = async () => {
        const res1 = await fetch('http://localhost:1000/admin', {
            method: "put",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: vaca.id, descriptions, country, cityName, price, img, dateFrom, dateUntil }),
            credentials: "include"
        })
        const data1 = await res1.json()
        setUpdate(true)

        if (data1.err) {
            alert(data1.err)
        }

        console.log(data1);
    }


    /// for the popover////
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // end of popover

    return (


        <>
            <Card className="card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={vaca.img}
                    alt={vaca.cityName}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vaca.cityName}, {vaca.country}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {new Date(vaca.dateFrom).toLocaleDateString('he-IL')} - {new Date(vaca.dateUntil).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {vaca.descriptions}
                    </Typography>
                    <div className='pricefollowers'>
                        <Typography variant="h5">
                            ${vaca.price}
                        </Typography>
                        <EditIcon onClick={handleClick} />
                        <DeleteForeverIcon onClick={delvacations} />
                    </div>
                </CardContent>

            </Card>


            <Box sx={{ '& > :not(style)': { m: 1 } }}>

                <div className='popOver'>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2, display: "flex", flexDirection: 'column' }}>
                            <input type="url" placeholder='Img URL' onChange={e => setImg(e.target.value)} />
                            <input type="text" placeholder='Country Name' onChange={e => setCountry(e.target.value)} />
                            <input type="text" placeholder='City Name' onChange={e => setCityName(e.target.value)} /> 
                            <input type="date" onChange={e => setDateFrom(e.target.value)} /> 
                            <input type="date" onChange={e => setDateUntil(e.target.value)} />
                            <input type="text" placeholder='Descriptions' onChange={e => setDescriptions(e.target.value)} />
                            <input type="text" placeholder='Price' onChange={e => setPrice(e.target.value)} />
                            <button onClick={editvacation}>Edit Vacation</button>
                        </Typography>
                    </Popover>

                </div>
            </Box>
        </>
    )
}
