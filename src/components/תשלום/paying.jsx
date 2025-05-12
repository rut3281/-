import { useEffect, useState } from 'react'
import './paying.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCreditCardThunk } from '../../redux/Thunks/addCreditCardThunk'
import { getDriversCardsThunk } from '../../redux/Thunks/getDriversCardsThunk'
import { paymentThunk } from '../../redux/Thunks/paymentThunk'
import { changeCcDetails } from '../../redux/slices/creditCardsSlice'
import masterCard from './Mastercard_2019_logo.svg.png'
import { PhotoSizeSelectLarge, CreditCard, Security, Receipt, Payment, CheckCircle, Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const Paying = () => {
  const dispatch = useDispatch()
  const sum = useSelector(state => state.routine.price)
  const nav = useNavigate()
  const [numOfPayments, setNumOfPayments] = useState(1)
  const [flag, setFlag] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const cards = useSelector(state => state.cards.creditCards)
  const licensePlate = useSelector(state => state.driver.licensePlate)
  const driverCode = useSelector(state => state.driver.code)
  const lastCreditCards = useSelector(state => state.cards.lastCreditCards)
  const [blPayment, setBlPeyment] = useState({
    creditCardCode: 0,
    sum: 0,
    date: Date()
  })

  const [blCreditCards, setblCreditCards] = useState(
    {
      creditCardNum: "",
      validityCard: "",
      id: "",
      cvv: "",
      driverCode: ""
    }
  )

  useEffect(() => {
    setBlPeyment({ ...blPayment, sum: sum, creditCardCode: lastCreditCards.code })
    setblCreditCards({
      ...blCreditCards, creditCardNum: lastCreditCards.creditCardNum,
      validityCard: lastCreditCards.validityCard,
      id: lastCreditCards.id,
      cvv: lastCreditCards.cvv,
      driverCode: driverCode
    })
  }, [lastCreditCards])


  useEffect(() => {
    dispatch(getDriversCardsThunk(driverCode))
    setBlPeyment({ creditCardCode: lastCreditCards.code, sum: sum })
    setblCreditCards({ ...lastCreditCards, driverCode: driverCode })
  }, [])

  const pay = () => {
    setIsProcessing(true);
    setNumOfPayments(document.getElementById("numOf").value)
    
    // Simulate payment processing
    setTimeout(() => {
      dispatch(paymentThunk({ 
        blPayment: blPayment, 
        blCreditCards: blCreditCards, 
        licensePlate: licensePlate, 
        numOfPayments: document.getElementById("numOf").value 
      }))
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Redirect after payment with full page refresh
      setTimeout(() => {
        // איפוס כל הנתונים המקומיים
        setBlPeyment({
          creditCardCode: 0,
          sum: 0,
          date: Date()
        });
        
        setblCreditCards({
          creditCardNum: "",
          validityCard: "",
          id: "",
          cvv: "",
          driverCode: ""
        });
        
        // רענון מלא של הדפדפן וניווט לדף הבית
        window.location.href = '/';
      }, 3000);
    }, 2000);
  }

  // Format credit card number with spaces
  const formatCardNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  return (
    <>
      {/* Background Elements */}
      <div className="premium-payment-background">
        <div className="premium-payment-shape payment-shape-1"></div>
        <div className="premium-payment-shape payment-shape-2"></div>
      </div>

      <div className='inputsPaying'>
        {!paymentComplete ? (
          <>
            {/* Payment Header */}
            <div className="payment-logo">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="url(#paint0_linear)" />
                <path d="M18 12C18 8.69 15.31 6 12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12ZM8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12Z" fill="white" />
                <path d="M13 10H11C10.45 10 10 10.45 10 11V14C10 14.55 10.45 15 11 15H11.5V13H13C13.55 13 14 12.55 14 12V11C14 10.45 13.55 10 13 10ZM13 12H11.5V11H13V12Z" fill="white" />
                <path d="M10 8L9 9H15L14 8H10Z" fill="white" />
                <path d="M10 16L9 15H15L14 16H10Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#0369A1" />
                  </linearGradient>
                </defs>
              </svg>
              <p>תשלום מאובטח</p>
            </div>

            {/* Payment Summary */}
            <div className="payment-summary">
              <div className="payment-summary-title">
                <Receipt style={{ fontSize: '1.2rem' }} />
                פרטי התשלום
              </div>
              <div className="payment-summary-row">
                <div className="payment-summary-label">סכום לתשלום:</div>
                <div className="payment-summary-value">{sum} ₪</div>
              </div>
              <div className="payment-summary-row">
                <div className="payment-summary-label">מספר תשלומים:</div>
                <div className="payment-summary-value">{numOfPayments}</div>
              </div>
              <div className="payment-summary-row">
                <div className="payment-summary-label">סה"כ לתשלום:</div>
                <div className="payment-summary-value">{sum} ₪</div>
              </div>
            </div>

            {/* Card Type Indicator */}
            <div className="card-type-indicator">
              <img src={masterCard} alt="MasterCard" className="active" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" />
            </div>

            {/* Credit Card Form */}
            <div className="card-form-section">
              <div className="card-form-title">
                <CreditCard />
                פרטי כרטיס אשראי
              </div>

              <input 
                className='inputs card-number-input' 
                type="text" 
                defaultValue={cards.length != 0 ? formatCardNumber(lastCreditCards.creditCardNum) : ""} 
                placeholder='מספר כרטיס אשראי' 
                required 
                onChange={(e) => setblCreditCards({ ...blCreditCards, creditCardNum: e.target.value.replace(/\s/g, '') })} 
              />

              <div className="card-security-row">
                <input 
                  className='inputs' 
                  defaultValue={cards.length !== 0 ? lastCreditCards.validityCard.substring(0, 10) : ""} 
                  type="text" 
                  placeholder="תוקף (MM/YY)" 
                  required 
                  onChange={(e) => setblCreditCards({ ...blCreditCards, validityCard: e.target.value })} 
                />
                <input 
                  className='inputs' 
                  defaultValue={cards.length !== 0 ? lastCreditCards.cvv : ""} 
                  type="text" 
                  placeholder="CVV" 
                  required 
                  onChange={(e) => setblCreditCards({ ...blCreditCards, cvv: e.target.value })} 
                />
              </div>

              <input 
                className='inputs' 
                defaultValue={cards.length !== 0 ? lastCreditCards.id : ""} 
                type="text" 
                placeholder="תעודת זהות" 
                required 
                onChange={(e) => setblCreditCards({ ...blCreditCards, id: e.target.value })} 
              />

              <div className="card-form-title" style={{ marginTop: '20px' }}>
                <Payment />
                אפשרויות תשלום
              </div>

              <label className='inputs'>מספר תשלומים</label>
              <select className='inputs' style={{ marginTop: 0 }} required id='numOf' onChange={(e) => setNumOfPayments(e.target.value)}>
                <option>1</option>
                <option>2</option>
                {sum > 100 &&
                  <>
                    <option>3</option>
                    <option>4</option>
                  </>
                }
              </select>

              <button onClick={() => pay()} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="loading-spinner"></span>
                    מבצע תשלום...
                  </>
                ) : (
                  <>לתשלום {sum} ₪</>
                )}
              </button>

              <div className="security-badge">
                <Lock />
                התשלום מאובטח ומוצפן בתקן SSL
              </div>

              <u onClick={() => setFlag(true)}>לבחירת כרטיס אשראי שמור</u>
            </div>
          </>
        ) : (
          <div className="payment-success">
            <div className="payment-success-icon">
              <CheckCircle style={{ fontSize: '40px' }} />
            </div>
            <div className="payment-success-title">התשלום בוצע בהצלחה!</div>
            <div className="payment-success-message">
              התשלום על סך {sum} ₪ בוצע בהצלחה. מעבירים אותך למערכת החניה...
            </div>
          </div>
        )}
      </div>

      {flag && cards.map(c => (
        <div 
          className='chooseCC' 
          key={c.code} 
          onClick={() => { 
            dispatch(changeCcDetails(c.code)); 
            setFlag(false);
          }}
        >
          <img width={"50px"} height={"30px"} src={masterCard} alt="MasterCard" />
          <div>
            <div className='ccDetails'>**** **** **** {c.creditCardNum.substring(12)}</div>
            <div className='ccDetails'>{c.validityCard.substring(0, 10)}</div>
          </div>
        </div>
      ))}
    </>
  );
};
 
