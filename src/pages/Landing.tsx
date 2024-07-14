import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Input from '../components/Input';
import InputButton from '../components/InputButton';
import axios from "axios";

function Landing() {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");
    const [button, setButton] = useState(false);
    const [message, setMessage] = useState("");
    const [primaryId, setPrimaryId] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
    const [secondaryIds, setSecondaryIds] = useState<number[]>([]);

    useEffect(() => {
        if (!inputEmail && !inputPhoneNumber) {
            setButton(false);
        } else if (inputEmail || inputPhoneNumber) {
            setButton(true);
        }
    }, [inputEmail, inputPhoneNumber]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setMessage("Loading Please Wait");
        
        const email = inputEmail === "" ? null : inputEmail;
        const phoneNumber = inputPhoneNumber === "" ? null : inputPhoneNumber;
        
        try {
            const response = await axios.post("https://bitespeedbackend.linkpc.net/identify", {
                email,
                phoneNumber
            });
            const data = response.data.contact;
            setMessage("Data Loaded Successfully");
            setPrimaryId(data.primaryContactId);
            setEmails(data.emails);
            setPhoneNumbers(data.phoneNumbers);
            setSecondaryIds(data.secondaryContactIds);
        } catch (error) {
            setMessage("Error Loading Data");
        }
    }

    return (
        <div className='h-screen w-screen flex'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center w-1/3 text-center'>
                <p className='text-2xl font-semibold text-center'>Input Contact Info</p>
                <Input
                    type='email'
                    placeholder='Enter Email'
                    value={inputEmail}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEmail(event.target.value)}
                />
                <Input
                    type='number'
                    placeholder='Enter Phone Number'
                    value={inputPhoneNumber}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setInputPhoneNumber(event.target.value)}
                />
                <p className='text-center'>{message}</p>
                <InputButton buttonSubmit={button} text='Submit' />
            </form>
            <div className='w-2/3 p-4'>
                <h1 className='text-3xl text-center'>Contacts</h1>
                <div className='flex space-x-4 items-start'>
                    <h3 className='text-xl font-semibold w-60'>Primary Contact Id :</h3>
                    <h3 className='text-xl'>{primaryId}</h3>
                </div>
                <div className='flex space-x-4 items-start'>
                    <h3 className='text-xl font-semibold w-60'>Emails :</h3>
                    <ul className='text-xl'>
                        {emails.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex space-x-4 items-start'>
                    <h3 className='text-xl font-semibold w-60'>Phone Numbers :</h3>
                    <ul className='text-xl'>
                        {phoneNumbers.map((number, index) => (
                            <li key={index}>{number}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex space-x-4 items-start'>
                    <h3 className='text-xl font-semibold w-60'>Secondary Contact IDs : </h3>
                    <ul className='text-xl'>
                        {secondaryIds.map((id, index) => (
                            <li key={index}>{id}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Landing;
