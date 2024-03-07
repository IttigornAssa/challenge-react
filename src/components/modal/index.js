import React, { Component } from 'react';

const ModalOverlay = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const ModalStyle = {
  position: 'relative',
  backgroundColor: '#fff',
  padding: '2em',
  borderRadius: '5px',
  maxWidth: '500px',
  width: '100%',
  textAlign: 'center',
  fontSize: '20px',

};

const CloseButton = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  fontSize: '24px',
  background: 'transparent',
  color: 'black',
  border: 'transparent',
  cursor: 'pointer',
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.open && (
        <div>
          <div style={ModalOverlay}>
            <div style={ModalStyle}>
              <button style={CloseButton} onClick={() => this.props.onClose()}>
                &times;
              </button>
              {this.props.message}
            </div>
          </div>
        </div>
      )
    );
  }
}
