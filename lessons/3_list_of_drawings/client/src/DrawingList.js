import React, { Component } from 'react';
import { subscribeToDrawings } from './api';

class DrawingList extends Component {
  constructor(props) {
    super(props);

    subscribeToDrawings(drawing => {
      this.setState({ drawings: [...this.state.drawings, drawing] });
    })
  }
  state = {
    drawings: [],
  };

  render() {
    const drawings = this.state.drawings.map(drawing => (
      <li
        className="DrawingList-item"
        key={drawing.id}
      >
        {drawing.name}
      </li>
    ));

    return (
      <ul className="DrawingList">
        {drawings}
      </ul>
    );
  }
}

export default DrawingList;