import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h1>About eLL-eFF-G</h1>
      <p>Introducing eLL-eFF-G, an innovative LFG (LookingForGroup) application tailored for video gamers, tabletop enthusiasts, and anyone seeking to arrange leisure time with friends amidst the demanding landscape of adult life. Unlike typical "looking for group" platforms that focus on immediate gaming connections, eLL-eFF-G is designed to streamline the process of scheduling gaming sessions in advance with your friends. In the realm of busy adult schedules, organizing gaming activities often necessitates thoughtful planning. eLL-eFF-G addresses this by allowing your entire gaming circle to input their weekly availability collectively. As soon as enough participants commit to a specific activity, the app sends out notifications. This proactive approach empowers users to anticipate those occasions when a sufficient number of friends can partake, effectively dismantling the barriers that typically hinder our quest to game together.</p>
    </div>
  );
}

export default InfoPage;
