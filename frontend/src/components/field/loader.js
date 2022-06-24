import React, {PureComponent} from 'react';

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="spinner">
        <div>Please wait ...</div>
      </div>
    );
  }
}

Loader.displayName = 'Loader';