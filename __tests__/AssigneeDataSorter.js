const expect = require('chai').expect;
const data = require('../client/dummyData/GET_ALL_ISSUES_REPO_SPECIFIC.JS');


function handleCheckIfWeHaveDifferentAssignees(oldIssues, newIssues) {
    for (let i = 0; i < oldIssues.length; i++) {
        for (let j = 0; j < oldIssues[i].assignees.length; i++) {
            if(oldIssues[i].assignees[j].login !== newIssues[i].assignees[j].login) {
                return false;
            }
        }
    }
    return true;
}

describe('Assignee changed function', () => {
  it('should return false if assignees have changed', () => {
    expect(handleCheckIfWeHaveDifferentAssignees(data.issues, data.issuesChanged)).to.equal(false);
  });

  it('should return true if assignees remain the same', () => {
    expect(handleCheckIfWeHaveDifferentAssignees(data.issues, data.issues)).to.equal(true);
  });
});
