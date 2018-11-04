import React from 'react'
import fetch from 'isomorphic-fetch'
import Head from '../components/Head'

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      code: [],
      bill: [],
      value: null, // value as per the code
      increment: 20, // amount to give in
      price: null,
      discount: 25,
      offerPrice: null,
      mobile: null
    }
    this.map = {
      'K': 1,
      'E': 2,
      'L': 3,
      'V': 4,
      'I': 5,
      'N': 6,
      'A': 7,
      'T': 8,
      'O': 9,
      'R': 0
    }
    this.handleCode = this.handleCode.bind(this)
    this.handleButton = this.handleButton.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEqual = this.handleEqual.bind(this)
    this.handleMobile = this.handleMobile.bind(this)
    this.handleWhatsApp = this.handleWhatsApp.bind(this)
  }

  convert (code) {
    let value = []
    code.forEach(c => {
      value.push(this.map[c])
    });
    value = parseInt(value.join(''))
    var price = (value * (100 + this.state.increment) / 100).toFixed(2)
    var offerPrice = (price * (100 - this.state.discount) / 100).toFixed(2)
    this.setState({value, price, offerPrice})
  }

  handleCode (e) {
    const code = e.target.value.toUpperCase().split('')
    this.setState({code})
    this.convert(code)
  }

  handleButton (e) {
    const code = this.state.code.concat(e.target.getAttribute('value'))
    this.setState({code})
    this.convert(code)
  }

  handleClear () {
    this.setState({
      code: [],
      price: null,
      value: null,
      offerPrice: null,
      bill: []
    })
  }

  handleAdd () {
    if (!this.state.offerPrice) return;
    var bill = this.state.bill.concat(parseInt(this.state.offerPrice))
    console.log(bill)
    this.setState({bill, code: [], value: null, price: null, offerPrice: null})
  }

  handleEqual () {
    var sum = this.state.bill.reduce((a, b) => a+b, 0)
    this.setState({
      code: [],
      price: null,
      value: null,
      offerPrice: sum
    })
  }

  handleMobile (e) {
    this.setState({
      mobile: e.target.value
    })
  }

  handleWhatsApp () {
    let bill = ''
    for (let i = 0; i < this.state.bill.length; i ++) {
      bill += `Item ${i + 1}: *${this.state.bill[i]}*%0A`
    }
    bill += `Total: *${this.state.offerPrice}*%0A`
    bill += 'Thanks for shopping with us!%0A🎁🎉🎁🎉Happy Diwali!🎁🎉🎁🎉%0A- *Ruchi Selection*%0A%0AFor more info contact - 9413485247'
    window.location.href = `https://api.whatsapp.com/send?phone=+91${this.state.mobile}&text=${bill}`
  }

  render () {
    console.log(this.state.bill)
    return (
      <div id='main'>
        <Head />
        <div id='bill'>
          <div className='el total'>
            {this.state.bill.map(i => {
              return (
                <span key={i}>{i} + </span>
              )
            })}
          </div>
          <div className='el price'>
            <span className='actual'><strike>{this.state.price}</strike></span>
            <span>{this.state.offerPrice}</span>
          </div>
        </div>
        <div id='calculator'>
          <div className='item' value='A' onClick={this.handleButton}>A</div>
          <div className='item' value='E' onClick={this.handleButton}>E</div>
          <div className='item' value='I' onClick={this.handleButton}>I</div>
          <div className='item passive' onClick={this.handleClear}>C</div>
          <div className='item' value='K' onClick={this.handleButton}>K</div>
          <div className='item' value='L' onClick={this.handleButton}>L</div>
          <div className='item' value='N' onClick={this.handleButton}>N</div>
          <div className='item passive' onClick={this.handleAdd}>+</div>
          <div className='item' value='O' onClick={this.handleButton}>O</div>
          <div className='item' value='R' onClick={this.handleButton}>R</div>
          <div className='item' value='T' onClick={this.handleButton}>T</div>
          <div className='item passive' onClick={this.handleWhatsApp}>W</div>
          <div></div>
          <div className='item' value='V' onClick={this.handleButton}>V</div>
          <div></div>
          <div className='item passive' onClick={this.handleEqual}>{'='}</div>
          <div><input onChange={this.handleMobile} type='number' name='mobile' placeholder='Mobile Number' /></div>
        </div>
        <style jsx global>{`
          body {
            padding: 0;
            margin: 0;
            background-color: #272727;
            color: rgba(255, 255, 255, 0.9);
            overflow: hidden;
          }
          #bill {
            height: 30vh;
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);

            display: grid;
            grid-template-rows: 80% 20%;
          }
          .el {
            text-align: right;
          }
          .total {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.3);
          }
          .price {
            font-size: 32px;
            color: rgba(255, 255, 255, 0.9);
          }
          .actual {
            padding-right: 20px;
          }
          #calculator {
            height: 70vh;
            padding: 20px;

            display: grid;
            grid-template-columns: repeat(4, 70px);
            grid-template-rows: repeat(4, 70px);
            grid-gap: 20px;
          }
          .item {
            font-size: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            text-align: center;
            line-height: 70px;
            height: 70px;
            color: white;
          }
          .passive {
            background-color: rgba(255, 255, 255, 0.1);
          }
          input {
            width: 300px;
            font-size: 22px;
            line-height: 26px;
            padding: 4px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
        `}</style>
      </div>
    )
  }
}