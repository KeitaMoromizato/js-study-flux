import request from 'superagent';

export const FETCH_REPOSITORIES = 'REPOSITORY_ACTION.FETCH_REPOSITORIES';

export class RepositoryAction {
  
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  
  fetch(username) {
    request(`https://api.github.com/users/${username}/repos`, (error, res, body) => {
      if (error) return console.error(error);
      
      console.log('fetch repositories', res.body);
      
      this.dispatcher({
        type: FETCH_REPOSITORIES,
        repositories: res.body
      });
    });
  }
}