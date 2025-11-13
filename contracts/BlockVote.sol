// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract BlockVote {
    uint public candidateA;
    uint public candidateB;

    function voteCandidateA() public {
        candidateA += 1;
    }

    function voteCandidateB() public {
        candidateB += 1;
    }

    function getVoteList() public view returns (uint, uint) {
        return (candidateA, candidateB);
    }
}