import {Component, Input} from '@angular/core';
import {Commit} from '../components/commitList/commit';

@Component({
  selector: 'commits-view',
  templateUrl: 'commits.view.html'
})
export class CommitsView {
  commitsUrl(username) {
    return `https://api.github.com/users/${username}/events`;
  }

  toCommits(response: any[]) {
    return toCommits(response);
  }
}

// Pure functions --> easy to test
const isPushEvent = (entry) => entry.type === 'PushEvent';

const toCommits = (response: any[]) => 
  response
    .filter(isPushEvent)
    .reduce((commits, pushEvent) => // [[Commit, Commit], [Commit, Commit, Commit]] => [Commit, Commit, Commit, Commit, Commit]
    commits.concat(pushEvent.payload.commits.map(commit => 
        new Commit(commit.sha, 
            pushEvent.repo.name, 
            commit.author.name, 
            commit.message))
        )    
    , []);