import { useState } from "react";
import { Button, Input } from "web3uikit";

export default function Prime(){
    const [number, setNumber] = useState(0)
    const [isPrime, setIsPrime] = useState("")

    const checkPrime = (number) =>{
        for(let i = 2, s = Math.sqrt(number); i <= s; i++) {
            if(number % i === 0) {
                return false;
            }
            
        }
        return number > 1;
    }

    function handleSubmit() {
        console.log(number)
        console.log(checkPrime(number))
        if(!checkPrime(number)){
            setIsPrime(false)
        }else{
            setIsPrime(true)
        }
        
        console.log(isPrime)
        
    }
    return (
        <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
            <h2>This is a prime number program.</h2>
            <Input
                label="Entre the number"
                value={number}
                onChange={(event)=>{setNumber(event.target.value)}}
            ></Input>
            <br></br>
            {/* <Button theme="secondary" text="Check" onClick={handleSubmit}/> */}
            {checkPrime(number) ? (
                <h3>{number} is a Prime number</h3>
            ) : (
                <div>
                    <h3>{number} is not a Prime number</h3>
                </div>
            )}
        </div>
        
    )
}