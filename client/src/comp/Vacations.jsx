import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Login from './Login';
import VacationsCard from './VacationsCard';
import VacationUser from './VacationUser';
import VacationUnfollow from './VacationUnfollow';
import Admin from './Admin';
import Nonfollow from './Nonfollow';



export default function Vacations() {


    const [update, setUpdate] = useState(false);
    const [currUser, setCurrUser] = useState(localStorage.username);
    const [currUserId, setCurrUserId] = useState(localStorage.id);
    const [vacations, setVacations] = useState([]);
    const [vacationsID, setVacationsID] = useState([]);
    const [vacationsFollow, setVacationsFollow] = useState([]);
    const [vacationsUnFollow, setVacationsUnFollow] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/vacations', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                credentials: "include"
            })
            const data = await res.json();
            if (data.err) {
                alert(data.err)
            } else {
                setVacations(data)
            }
            // console.log(data);


        })()


    }, [update])



    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:1000/vacations/follow/${currUserId}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                credentials: "include"
            })
            const data1 = await res.json();
            let newDatad = data1.map(vac => ({ ...vac }));
            if (data1.err) {
                alert(data1.err)
            } else {
                setVacationsFollow(newDatad)
                setUpdate(up => !up)
            }
            console.log(data1);


        })();
        (async () => {
            const res = await fetch(`http://localhost:1000/vacations/unfollow/${currUserId}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                credentials: "include"
            })
            const data = await res.json();
            if (data.err) {
                alert(data.err)
            } else {
                setVacationsUnFollow(data)
                setUpdate(up => !up)
            }
            console.log(data);
            
            
        })();
        (async () => {
            const res = await fetch(`http://localhost:1000/vacations/unfollow`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                credentials: "include"
            })
            const data1 = await res.json();
            if (data1.err) {
                alert(data1.err)
            } else {
                setVacationsID(data1)
                setUpdate(up => !up)
            }
            console.log(data1);


        })()

    }, [])



    return (
        <div>
            {
                !localStorage.username ?
                    <>
                        <Login />
                    </>
                    :
                    <>



                        {
                            localStorage.role === "user" ?
                                <>
                                    <div className='uppercard' >

                                        {
                                            vacationsFollow.map(vacafollow => <VacationUser key={vacafollow.id} vacafollow={vacafollow} />)
                                        }

                                        {
                                            vacationsUnFollow.map(vacaunfollow => <VacationUnfollow key={vacaunfollow.id} vacaunfollow={vacaunfollow} />)
                                        }
                                        {
                                            vacationsID.map(nonfollow => <Nonfollow key={nonfollow.id} nonfollow={nonfollow} />)
                                        }
                                    </div>

                                </>
                                :
                                <>
                                    <h1 className='h1header'>Your Admin Page</h1>
                                    <div className='uppercard' >
                                        {
                                            vacations.map(vaca => <VacationsCard key={vaca.id} vaca={vaca}/>)
                                        }

                                    </div>
                                    <Admin setVacations={setVacations} vacations={vacations} />

                                </>
                        }

                    </>
            }
        </div>
    )
}
