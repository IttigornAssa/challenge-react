import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';

const device = {
  xs: `(max-width: ${'400px'})`,
  sm: `(max-width: ${'600px'})`,
  md: `(max-width: ${'900px'})`,
  lg: `(max-width: ${'1280px'})`,
  xl: `(max-width: ${'1440px'})`,
  xxl: `(max-width: ${'1920px'})`,
};

const Containers = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #595959;

  @media ${device.xl} {
    width: 100%;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  width: 37%;
  display: inline-block;
  margin-left: 1.5em;
  margin-bottom: 2em;
  margin-right: 1.25em;
  border-radius: 5px;
  border: none;
  box-shadow: #ecece9 0px 3px 3px 3px;

  @media ${device.lg} {
    width: 42%;
  }

  @media ${device.md} {
    width: 70%;
  }

  @media ${device.sm} {
    width: 90%;
  }
`;

const FateImg = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const DetailPay = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
const EmptyCard = styled.div`
  width: 37%;
  margin-left: 1.5em;
  margin-bottom: 2em;
  margin-right: 1.25em;
  display: inline-block;
  @media ${device.lg} {
    width: 42%;
  }

  @media ${device.md} {
    width: 70%;
  }

  @media ${device.sm} {
    width: 90%;
  }
`;

const DonateDivName = styled.div`
  width: 70%;
  display: inline-block;
  text-align: left;
  text-indent: 2em;
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
  margin-bottom: 1.2em;

  @media ${device.lg} {
    margin-left: -1em;
  }

  &: active {
    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
  }
`;

const CloseButton = styled.button`
  font-size: 30px;
  color: gray;
  background: none;
  border: none;
  z-index: 1;
  cursor: pointer;
`;

const CloseDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
`;

const PayButton = styled.button`
  color: #0d6efd;
  border-color: #0d6efd;
  font-size: 1em;
  font-weight: bold;
  padding: 0.25em 0.5em;
  border: 2px solid #0d6efd;
  border-radius: 3px;
  background: white;
  margin-top: 1em;
  cursor: pointer;

  &: active {
    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
  }
`;

const DonamteImg = {
  width: '100%',
  height: '250px',
};

const DonamteImgFate = {
  width: '100%',
  height: '250px',
  opacity: '0.1',
};

const Label = styled.label`
  color: black;
  margin-top: 5px;
  padding: 5px;
`;

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
      clickDonate: [],
    };

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.initClickDonate(data);
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

    initClickDonate = (charities) => {
      let list = [];
      charities.map((item) => {
        list.push(false);
      });
      this.setState({ clickDonate: [...list] });
    };

    onHandleDonate = (i, e) => {
      let update = this.state.clickDonate;
      update[i] = e == true ? false : true;
      this.setState({ clickDonate: update });
      console.log(this.state.clickDonate);
    };

    render() {
      const self = this;
      const count = this.state.charities.length;
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <Label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={function () {
                self.setState({ selectedAmount: amount });
              }}
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                paddingLeft: '5px',
              }}
            />
            {amount}
          </Label>
        ));

        const index = i + 1;
        // return count != index ? (
        return (
          i < count && (
            <>
              <Card key={i}>
                {self.state.clickDonate[i] ? (
                  <FateImg>
                    <img
                      src={'/images/' + item.image}
                      style={DonamteImgFate}
                    ></img>
                    <CloseDiv>
                      <CloseButton
                        onClick={() =>
                          self.onHandleDonate(i, self.state.clickDonate[i])
                        }
                        key={'close'.i}
                      >
                        &times;
                      </CloseButton>
                    </CloseDiv>
                    <DetailPay>
                      <Label>Select the amiount to donate (USD)</Label>
                      <br />
                      {payments}
                      <br />
                      <PayButton
                        onClick={handlePay.call(
                          self,
                          item.id,
                          self.state.selectedAmount,
                          item.currency
                        )}
                      >
                        Pay
                      </PayButton>
                    </DetailPay>
                  </FateImg>
                ) : (
                  <div>
                    <img src={'/images/' + item.image} style={DonamteImg}></img>
                  </div>
                )}
                <div
                  style={{ opacity: self.state.clickDonate[i] ? '0.1' : '1' }}
                >
                  <DonateDivName>{item.name}</DonateDivName>
                  <DonateDivButton>
                    <DonateButton
                      key={item.name.i}
                      disabled={self.state.clickDonate[i]}
                      onClick={() =>
                        self.onHandleDonate(i, self.state.clickDonate[i])
                      }
                      style={{
                        cursor: self.state.clickDonate[i]
                          ? 'default'
                          : 'pointer',
                      }}
                    >
                      Donate
                    </DonateButton>
                  </DonateDivButton>
                </div>
              </Card>
              {i+1 == count && <EmptyCard key={'empc'.i}></EmptyCard>}
            </>
          )
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
        <Containers>
          <h1>Tamboon React</h1>
          <p>All donations: {donate}</p>
          <p style={style}>{message}</p>
          {cards}
        </Containers>
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
