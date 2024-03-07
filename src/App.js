import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';
import {
  Header,
  Containers,
  Card,
  FateImg,
  DetailPay,
  EmptyCard,
  DonateDivButton,
  DonateDivName,
  DonateButton,
  CloseButton,
  CloseDiv,
  PayButton,
  Label,
  DonateAll,
  DonateAllContent1,
  DonateAllContent2,
  DonateAllContentEmpty,
  Footer,
} from './components/styled-component';
import Modal from './components/modal';

const DonamteImg = {
  width: '100%',
  height: '250px',
};

const DonamteImgFate = {
  width: '100%',
  height: '250px',
  opacity: '0.1',
};

const style = {
  color: 'red',
  margin: '1em 0',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center',
};

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
      clickDonate: [],
      modal: false,
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

    setModalOpen = () => {
      this.setState({ modal: true });
    };

    setModalClose = () => {
      this.setState({ modal: false });
    };

    initClickDonate = (charities) => {
      let list = [];
      charities.map(() => {
        list.push(false);
      });
      this.setState({ clickDonate: [...list] });
    };

    onHandleDonate = (i, e) => {
      let update = this.state.clickDonate;
      update[i] = e == true ? false : true;
      update.map((item, index) => {
        if (i !== index) {
          update[index] = false;
        }
      });
      this.setState({ clickDonate: update });
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
              defaultChecked={amount === self.state.selectedAmount}
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                paddingLeft: '5px',
              }}
            />
            {amount}
          </Label>
        ));

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
                      <Label>
                        Select the amiount to donate ({item.currency})
                      </Label>
                      <br />
                      {payments}
                      <br />
                      <PayButton
                        onClick={() => {
                          handlePay.call(
                            self,
                            item.id,
                            item.name,
                            self.state.selectedAmount,
                            item.currency
                          );
                          self.setModalOpen();
                        }}
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
              {i + 1 == count && <EmptyCard key={'empc'.i}></EmptyCard>}
            </>
          )
        );
      });

      return (
        <>
          <Header>
            <img
              style={{ marginLeft: '1em' }}
              src="https://camo.githubusercontent.com/d509791c2c6ab11a38047679868334fb3d138889d52ff1c0f278b003f849f464/68747470733a2f2f63646e2e6f6d6973652e636f2f6173736574732f6f6d6973652d6c6f676f2f6f6d6973652d776f72646d61726b2e706e67"
              width={125}
            />
          </Header>
          <Containers>
            <h1>Tamboon React</h1>
            {cards}
            <DonateAll>
              <DonateAllContent1>
                Invitation to Donate. "There are many more people in need of
                help".
              </DonateAllContent1>
              <DonateAllContentEmpty></DonateAllContentEmpty>
              <DonateAllContent2>
                All donations :{' '}
                <span style={{ color: '#0d6efd' }}>{this.props.donate}</span>
              </DonateAllContent2>
            </DonateAll>
          </Containers>
          <Modal
            open={this.state.modal}
            onClose={this.setModalClose}
            message={this.props.message}
          ></Modal>
          <Footer></Footer>
        </>
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

function handlePay(id, name, amount, currency) {
  fetch('http://localhost:3001/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
  })
    .then((resp) => {
      if (!resp.ok) {
        console.log('fetch not ok');
      }
      return resp.json();
    })
    .then((json) => {
      this.props.dispatch({
        type: 'UPDATE_MESSAGE',
        message: `Thank You for Donate (${name} :${amount}${currency}).`,
      });
      const sum = summaryDonations([json].map((item) => item.amount));
      if (sum) {
        this.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: sum,
        });
      } else {
        console.log('summaryDonations error');
      }
    })
    .catch((error) => {
      console.log('fetch error', error);
    });
}
