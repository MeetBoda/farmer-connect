import React, {useState, useEffect} from 'react'

export default function ProfileHeader() {
    return(
        <div className='profile'>
            <div className='ProfileAndName'>
                <div className='nameAndActive'>
                    <div className='name'>{localStorage.getItem("username")}</div>
                </div> 
            </div>

            <hr Style="border: 0.7px solid " />
        </div>
    )
}