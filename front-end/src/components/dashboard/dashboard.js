import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPS IN DASHBOARD', this.props.dungeon);
    return (
        <div>
          <p>You are logged in, sucka!</p>
          {this.props.dungeon ? <p>{this.props.dungeon.currentRoom.description}</p> : undefined}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  dungeon: state.dungeon,
});
export default connect(mapStateToProps, null)(Dashboard);
