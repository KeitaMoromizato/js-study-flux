import React from 'react';

class SearchForm extends React.Component {
  
  onClick() {
    const value = this.refs.text.value;
    
    if (value && this.props.onSubmit) this.props.onSubmit(value);
  }

  render() {
    return (
      <div className="searchForm">
        <textarea ref="text" />
        <button onClick={() => this.onClick()}>Search</button>
      </div>
    );
  }
}

export default SearchForm;
