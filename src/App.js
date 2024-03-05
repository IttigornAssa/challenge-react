import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';

const Card = styled.div`
  border: 1px solid #ccc;
  width: 37%;
  display: inline-block;
  margin-left: 1.5em;
  margin-bottom: 2em;
  margin-right: 1.25em;
  border-radius: 5px;
  border: none;
  box-shadow: #ececec 0px 7px 10px 0px;
`;

const EmptyCard = styled.div`
  width: 40%;
  margin-bottom: 2em;
  margin-right: 1.25em;
  display: inline-block;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
`;

const DonateDivName = styled.div`
  width: 70%;
  display: inline-block;
  text-align: left;
  text-indent: 2em;
  padding-top: 1rem; 
  font-weight: bold;
`;

const DonateDivButton = styled.div`
  width: 30%;
  display: inline-block;
`;

const DonateButton = styled.button`
  color: #0d6efd;
  border-color: #0d6efd;
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0d6efd;
  border-radius: 3px;
  background: white;
`;

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
    };

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.setState({ charities: data });
        });

      fetch('http://localhost:3001/payments')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => item.amount)),
          });
        });
    }

    render() {
      const self = this;
      const count = this.state.charities.length;
      console.log(count);
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={function () {
                self.setState({ selectedAmount: amount });
              }}
            />
            {amount}
          </label>
        ));

        const imageStyle = {
          width: '100%',
          height: '250px',
        };
        const index = i + 1;
        return count != index ? (
          <Card key={i}>
            <img src={'/images/' + item.image} style={imageStyle}></img>
            <DonateDivName>{item.name}</DonateDivName>
            <DonateDivButton>
              <DonateButton>Donate</DonateButton>
            </DonateDivButton>
            {/* {payments}
            <button
              onClick={handlePay.call(
                self,
                item.id,
                self.state.selectedAmount,
                item.currency
              )}
            >
              Pay
            </button> */}
          </Card>
        ) : count % 2 != 0 ? (
          <>
            <Card key={i}>
              <img src={'/images/' + item.image} style={imageStyle}></img>
              <DonateDivName>{item.name}</DonateDivName>
              <DonateDivButton>
                <DonateButton>Donate</DonateButton>
              </DonateDivButton>
              {/* {payments}
              <button
                onClick={handlePay.call(
                  self,
                  item.id,
                  self.state.selectedAmount,
                  item.currency
                )}
              >
                Pay
              </button> */}
            </Card>
            <EmptyCard key={i}></EmptyCard>
          </>
        ) : (
          ''
        );
      });

      const style = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      };

      const donate = this.props.donate;
      const message = this.props.message;

      return (
        <Container>
          <h1>Tamboon React</h1>
          <p>All donations: {donate}</p>
          <p style={style}>{message}</p>
          {/* <div style={{display:'flex'}}> */}
          {cards}
          {/* </div> */}
        </Container>
      );
    }
  }
);

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */
function handlePay(id, amount, currency) {}
