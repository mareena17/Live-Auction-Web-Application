import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import ItemsForm from './ItemsForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createItem,
  editItem,
  fetchAllItems
} from '../../actions/ItemsActions';

class ItemsDialog extends Component {
  render() {
    const {
      itemsDialogOpen,
      closeItemsDialog,
      selectedItem,
      createItem,
      fetchAllItems,
      editItem
    } = this.props;
    return (
      <Modal
        aria-labelledby="Items"
        aria-describedby="Post a new Item"
        open={itemsDialogOpen ? itemsDialogOpen : false}
        onClose={closeItemsDialog}
        disableAutoFocus
      >
        <ItemsForm
          onClose={closeItemsDialog}
          selectedItem={selectedItem}
          createItem={createItem}
          editItem={editItem}
          fetchAllItems={fetchAllItems}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedItem: state.items.selectedItem
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      fetchAllItems,
      createItem,
      editItem
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsDialog);
