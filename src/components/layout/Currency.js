import React, { Component, Fragment } from 'react';
import axios from 'axios';

export class Currency extends Component {
  state = {
    curre: [],
  };

  componentDidMount() {
    axios.get(`https://api.n.exchange/en/api/v1/currency`).then((res) => {
      this.setState({ curre: res.data });
    });
  }

  render() {
    return (
      <Fragment>
        <h1>This is my list of currencies</h1>
        <ul>
          {this.state.curre.map((curr) => (
            <li key={curr.code}>{curr.code}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default Currency;
