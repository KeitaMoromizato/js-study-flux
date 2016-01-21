import React from 'react';
import {connect} from 'react-redux';

class RepoList extends React.Component {
  
  render() {
    return (
      <ul>
        { this.props.repositories.map(r => <li key={r.id}>{ r.name }</li>) }
      </ul>
    );
  }
}

export default connect(state => ({
  repositories: state.repositories
}))(RepoList);
