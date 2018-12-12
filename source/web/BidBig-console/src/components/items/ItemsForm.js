import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

class ItemsForm extends Component {
  constructor(props) {
    super(props);
    if (!props.selectedItem) {
      this.state = {
        name: '',
        description: '',
        minBidPrice: '',
        selectedFile: null,
        loaded: 0,
        heading: 'Post New Item',
        buttonText: 'Create'
      };
    } else {
      this.state = {
        name: props.selectedItem.name,
        description: props.selectedItem.description,
        minBidPrice: props.selectedItem.minBidPrice,
        selectedFile: null,
        loaded: 0,
        heading: 'Edit Item',
        buttonText: 'Save'
      };
    }
  }

  trimBase64String(str) {
    return str.replace(/(\w+?:\w+?\/\w+;base64,)/g, '');
  }

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };
  handleSelectedFile = event => {
    event.preventDefault();
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, description, minBidPrice, selectedFile } = this.state;
    const {
      selectedItem,
      fetchAllItems,
      onClose,
      pageIndex,
      pageSize,
      editItem,
      createItem,
      username
    } = this.props;
    //const data = new FormData();
    const data = {};
    const item = {
      name,
      description,
      minBidPrice,
      username
    };
    if (!selectedItem) {
      let file = selectedFile;
      var filename = file.name;
      var extension = file.type;
      console.log('name and type: ', filename, extension);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        data['image'] = reader.result;
        data['item'] = item;
        createItem(data)
          .then(response => {
            onClose();
            console.log('fetch all');
            fetchAllItems(username, pageIndex, pageSize);
          })
          .catch(error => {
            console.log('Error while creating item', error);
          });
      };
    } else {
      editItem(selectedItem.itemId, item)
        .then(response => {
          onClose();
          fetchAllItems(username, pageIndex, pageSize);
        })
        .catch(error => {
          console.log('Error while modifying item', error);
        });
    }
  };

  render() {
    const { classes, onClose, selectedItem } = this.props;
    return (
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardHeader
            subheader={this.state.heading}
            classes={{ subheader: classes.header }}
          />
          <Divider />
          <CardContent classes={{ root: classes.cardContent }}>
            <form onSubmit={this.handleSubmit} className={classes.itemForm}>
              <TextField
                id="name"
                type="text"
                label="Name"
                inputProps={{ maxLength: 255 }}
                value={this.state.name}
                required
                className={classes.textField}
                onChange={e => this.handleChange(e, 'name')}
              />
              <TextField
                id="description"
                type="text"
                label="Description"
                required
                value={this.state.description}
                className={classes.textField}
                onChange={e => this.handleChange(e, 'description')}
              />
              <TextField
                id="minBidPrice"
                type="number"
                step="0.01"
                label="Bidding Price ($)"
                value={this.state.minBidPrice}
                className={classes.textField}
                onChange={e => this.handleChange(e, 'minBidPrice')}
              />
              {!selectedItem ? (
                <Fragment>
                  <label htmlFor="selectedFile">Choose file to upload</label>
                  <input
                    type="file"
                    id="selectedFile"
                    name="selectedFile"
                    onChange={this.handleSelectedFile}
                  />
                </Fragment>
              ) : (
                ''
              )}
              <div className={classes.btnWrapper}>
                <Button
                  variant="contained"
                  color={'primary'}
                  className={classes.dialogBtn}
                  type={'submit'}
                >
                  {this.state.buttonText}
                </Button>
                <Button
                  variant="contained"
                  color={'primary'}
                  className={classes.dialogBtn}
                  onClick={onClose}
                >
                  {'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = () => ({
  paper: {
    position: 'absolute',
    backgroundColor: '#FFF',
    padding: '0px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: 4
  },
  card: {
    background: '#FFF',
    outline: 'none',
    overflow: 'initial'
  },
  cardContent: {
    padding: '0 10px',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  itemForm: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  header: {
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 20
  },
  textField: {
    width: '30vw'
  },
  uploadText: {
    marginTop: 20
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  dialogBtn: {
    margin: '15px 5px 15px 0',
    padding: '5px',
    textTransform: 'none'
  }
});
const mapStateToProps = state => {
  return {
    pageSize: state.items.pageSize,
    pageIndex: state.items.pageIndex,
    items: state.items.items,
    username: state.user.username
  };
};
export default withStyles(styles)(connect(mapStateToProps)(ItemsForm));
