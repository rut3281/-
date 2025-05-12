import { createAsyncThunk } from "@reduxjs/toolkit";

export const paymentThunk = createAsyncThunk(
   
    // הפונקציה מקבלת את השם 
    'paymentThunk',
    // פונקציה להפעלה 
   
    async ({blPayment , blCreditCards , licensePlate , numOfPayments}) => {
      
 
        // const shalvush = {
        //     blPayment:blPayment,
        //     blCreditCards:blCreditCards
        // }
        const shalvush = {
           
                blPayment: {
                  creditCardCode: blPayment.creditCardCode,
                  sum: blPayment.sum,
                  date: "2025-04-27T12:41:57.724Z"
                },
                blCreditCards: {
                  code: 0,
                  creditCardNum: blCreditCards.creditCardNum,
                  validityCard: "2025-04-27T12:41:57.724Z",
                  id: blCreditCards.id,
                  cvv: blCreditCards.cvv,
                  driverCode:blCreditCards.driverCode
                  
                }
            
        }

            const response = await fetch(`https://localhost:7164/api/Payment/AddPayment/${licensePlate}/${numOfPayments}`, {
            method: 'POST',
            body: JSON.stringify(shalvush),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            
            console.log("came to thunk");
            const data = await response.json();
            console.log(data);
            return data;
        }
        else { 
            throw new Error('faild to fetch');
        }
    }
)