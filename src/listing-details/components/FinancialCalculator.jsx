import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinancialCalculator({carDetail}) {
    const [carprice,setCarPrice] = useState(0);
    const [intrestRate,setIntrestRate] = useState(0);
    const [loanTerm,setLoanTerm] = useState(0);
    const [downPayment,setDownPayment] = useState(0);
    const [MonthlyPayment,setMonthlyPayment]= useState(0);

    const CalculateMonthlyPayment=()=>{
         const Principal = carprice-downPayment;
         const MonthlyIntrestRate = intrestRate/1200;  //convert to decimal

         const MonthlyPayment=(Principal*MonthlyIntrestRate*Math.pow(1+MonthlyIntrestRate,loanTerm))/
        (Math.pow(1+MonthlyIntrestRate,loanTerm)-1);

        setMonthlyPayment(MonthlyPayment.toFixed(2));
    }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl'>Financial Calculator</h2>
     <div className='flex gap-5'>
        <div className='w-full'>
            <label htmlFor="">  Price $ </label>
            <Input type='number'onChange={(e)=>setCarPrice(e.target.value)}/>
        </div>
        <div className='w-full'>
            <label htmlFor="">  Intrest Rate </label>
            <Input type='number'onChange={(e)=>setIntrestRate(e.target.value)}/>
        </div>
     </div>
     <div className='flex gap-5'>
        <div className='w-full'>
            <label htmlFor="">  Loan Term (Months) </label>
            <Input type='number'onChange={(e)=>setLoanTerm(e.target.value)}/>
        </div>
        <div className='w-full'>
            <label htmlFor="">   Down Payment </label>
            <Input type='number'onChange={(e)=>setDownPayment(e.target.value)}/>
        </div>
      </div>
     {MonthlyPayment>0&&<h2 className='font-medium text-2xl mt-5'>Your Monthly Payment Is: <span className='text-4xl font-bold'>${MonthlyPayment}</span></h2>}
      <Button className='w-full mt-5'size='lg'
        onClick={CalculateMonthlyPayment}>
        Calculate</Button>
    </div>
  )
}

export default FinancialCalculator
