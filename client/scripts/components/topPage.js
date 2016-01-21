import React from 'react';
import {connect} from 'react-redux';

import {RepositoryAction} from '../actions/repositoryAction';
import SearchForm from './searchForm';
import RepoList from './repoList';

class TopPage extends React.Component {
  
  componentDidMount() {
    this.repositoryAction = new RepositoryAction(this.props.dispatch);
  }
  
  onSubmit(text) {
    console.log(text);
    this.repositoryAction.fetch(text);
  }
  
  render() {
    return (
      <div>
        <div>Hello!!!</div>
        <SearchForm onSubmit={(text) => this.onSubmit(text)}/>
        <RepoList />
      </div>
    );
  }
}

export default connect(state => ({}))(TopPage);
