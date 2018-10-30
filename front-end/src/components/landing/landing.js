import React from 'react';

import './landing.scss';

class Landing extends React.Component {
  render() {
    return (
      <div className='landing-container'>
        <h1>Welcome to my note keeping app!</h1>
        <p>It is quite simple: navigate to the dashboard, add a new category,
          and you will be able to add as many cards as you want under that category.
          Need a new category? Just add another one, and give that category its own
          cards. Enjoy!</p>
      </div>
    );
  }
}

export default Landing;
