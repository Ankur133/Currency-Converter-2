import logo from './currency 2.gif';
import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [exchangeRates,setExchangeRates] = useState({})
  const [amount,setAmount] = useState(1);
  const [fromcurrency,setFromCurrency] = useState('USD')
  const [tocurrency,setToCurrency] = useState('INR')
  const [convertedAmount,setConvertedAmount] = useState(null);

  useEffect(() => {
    
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
    axios.get(apiUrl)
    .then(
      response => {
        setExchangeRates(response.data.rates);
      }
    )
    .catch(error => {
      console.error('error fetching exchange rates:',error);
    });

  }, [fromcurrency])

  useEffect(()=>{

    const conversionRate = exchangeRates[tocurrency];
    if(conversionRate){
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }

  },[amount,fromcurrency,tocurrency,exchangeRates]);
  




  const handleChange = (e) => {
    const {name,value} = e.target;
    switch(name){
      case 'amount': 
      setAmount(value);
      break;
      case 'fromcurrency': 
      setFromCurrency(value);
      break;
      case 'tocurrency': 
      setToCurrency(value);
      break;
    }
  }
  return (
    <div className='card'>
      <img src={logo}  width="115" alt='Ankur'/>
      <h1 className='text-6xl'>Currency Converter</h1>
      <div className='exchange'>
        <div className='input'>
          <label className='label'>Amount:</label>
          <input type='number' name='amount' value={amount} className='field' onChange={handleChange} />
        </div>

        <div className='input'>
          <label className='label'>From Currency:</label>
          <select name="fromcurrency" value={fromcurrency} onChange={handleChange} className='field'>
            {

              Object.keys(exchangeRates).map(currency =>(
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))

            }
          </select>
        </div>

        <div className='input'>
          <label className='label'>To Currency:</label>
          <select name="tocurrency" value={tocurrency} onChange={handleChange} className='field'>
            {
              Object.keys(exchangeRates).map(currency =>(
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            }
          </select>
        </div>

      </div>
      <div className='output'>
        <h2>Converted Amount: <b>{convertedAmount}</b></h2>
      </div>
      </div>
  );
}

export default App;
