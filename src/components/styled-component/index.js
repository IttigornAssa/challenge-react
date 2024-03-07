import styled from 'styled-components';

const device = {
  xs: `(max-width: ${'400px'})`,
  sm: `(max-width: ${'600px'})`,
  md: `(max-width: ${'900px'})`,
  lg: `(max-width: ${'1280px'})`,
  xl: `(max-width: ${'1440px'})`,
  xxl: `(max-width: ${'1920px'})`,
};
export const Header = styled.div`
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9eaf0;
`;

export const Footer = styled.div`
  border-top: 1px solid #e9eaf0;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Containers = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #595959;

  @media ${device.xl} {
    width: 100%;
  }
`;

export const Card = styled.div`
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

export const FateImg = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

export const DetailPay = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
export const EmptyCard = styled.div`
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

export const DonateDivName = styled.div`
  width: 70%;
  display: inline-block;
  text-align: left;
  text-indent: 2em;
  font-weight: bold;
`;

export const DonateDivButton = styled.div`
  width: 30%;
  display: inline-block;
`;

export const DonateButton = styled.button`
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

export const DonateAll = styled.div`
  color: black;
  border-color: #0d6efd;
  font-size: 1em;
  font-weight: bold;
  padding: 40px 40px 40px 0;
  background-color: #f7f8fa;
  margin-bottom: 1.2em;
  width: 74%;
  margin: auto;
  margin-bottom: 3em;
  display: flex;

  @media ${device.lg} {
    width: 85%;
    display: block;
  }
`;
export const DonateAllContent1 = styled.div`
  width: 50%;
  text-align: left;
  text-indent: 2em;
  font-size : 24px;
  padding: 1em;
  max-width: 460px;

  @media ${device.lg} {
    width: 100%;
    max-width: 100%;
  }

}
`;

export const DonateAllContentEmpty = styled.div`
  width: 20%;
`;

export const DonateAllContent2 = styled.div`
  width: 30%;
  font-size : 24px;
  background: white;
  padding: 1em;
  text-align: center;
  text-decoration: underline;

  @media ${device.lg} {
    width: 100%;
  }
}
`;

export const CloseButton = styled.button`
  font-size: 30px;
  color: gray;
  background: none;
  border: none;
  z-index: 1;
  cursor: pointer;
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
`;

export const PayButton = styled.button`
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

export const Label = styled.label`
  color: black;
  margin-top: 5px;
  padding: 5px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  alignitems: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalComponent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 2em;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: auto;
  white-space: pre-line;
  @media ${device.md} {
    width: 80%;
  }
  };
`;

export const CloseModal = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  fontSize: '24px',
  background: 'transparent',
  color: 'black',
  border: 'transparent',
  cursor: 'pointer',
};
