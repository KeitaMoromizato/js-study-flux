import React from 'react';
import {connect} from 'react-redux';

class RepoList extends React.Component {
  
  render() {
    return (
      <ul>
        { this.props.repositories.map(r => <li key={r.id}><a href={r.html_url}>{ r.name }</a></li>) }
      </ul>
    );
  }
}

export default connect(state => ({
  repositories: state.repositories
}))(RepoList);
