import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Sad404 from '@material-ui/icons/MoodBad';

class NotFound extends Component {
  goBack = () => {
    if (this.props.history) {
      this.props.history.goBack();
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sad404
          color={'error'}
          fontSize={'large'}
          classes={{ root: classes.sad404 }}
        />
        <Typography
          variant="h1"
          color="primary"
          align="center"
          classes={{ root: classes.notFound }}
        >
          {'404'}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="center"
          classes={{ root: classes.notFound }}
        >
          {'We are sorry but the page you are looking for was not found...'}
        </Typography>
        <Button
          className={classes.backBtn}
          onClick={this.goBack}
          color={'secondary'}
          variant={'contained'}
        >
          {'Go Back'}
        </Button>
      </div>
    );
  }
}

const styles = () => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '250px',
    justifyContent: 'center'
  },
  sad404: {
    fontSize: 100,
    margin: 'auto'
  },
  notFound: {
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  backBtn: {
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '15px',
    padding: '5px',
    textTransform: 'none'
  }
});

export default withStyles(styles)(NotFound);
