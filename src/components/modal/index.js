import React, { Component } from 'react';
import { ModalOverlay, ModalComponent, CloseModal } from '../styled-component';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.open && (
        <div>
          <ModalOverlay>
            <ModalComponent>
              <button style={CloseModal} onClick={() => this.props.onClose()}>
                &times;
              </button>
              {this.props.message}
            </ModalComponent>
          </ModalOverlay>
        </div>
      )
    );
  }
}
