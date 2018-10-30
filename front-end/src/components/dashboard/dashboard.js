import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as categoryActions from '../../action/category-actions'
import CategoryForm from '../category-form/category-form';
import CategoryItem from '../category-item/category-item';

import './dashboard.scss';

class Dashboard extends React.Component {
  render() {
    return (
        <div className='main-container'>
          <CategoryForm
            onComplete={this.props.categoryCreate}
          />
          <div className='category-container'>{ this.props.categories.map(currentCategory => <CategoryItem
              key={currentCategory.id}
              category={currentCategory}
              onRemove={this.props.categoryRemove}
              onUpdate={this.props.categoryUpdate}
            />)}
           </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryCreate: (category) => {
      dispatch(categoryActions.create(category));
    },
    categoryRemove: (category) => {
      dispatch(categoryActions.remove(category));
    },
    categoryUpdate: (category) => {
      dispatch(categoryActions.update(category));
    },
  };
};

Dashboard.propTypes = {
  categoryCreate: PropTypes.func,
  categoryRemove: PropTypes.func,
  categoryUpdate: PropTypes.func,
  categories: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
