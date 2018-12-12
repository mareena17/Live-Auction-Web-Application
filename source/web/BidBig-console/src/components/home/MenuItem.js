import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import GoTo from '@material-ui/icons/Input';

class MenuItem extends Component {
  render() {
    const { classes, name, description, path } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h3"
          >
            {name}
          </Typography>
          <Typography variant="h6" className={classes.description}>
            {description}
          </Typography>
          <div className={classes.linkWrapper}>
            <Link to={path} style={{ color: 'orange' }}>
              <Tooltip title={`Go to ${name}`} aria-label={`Go to ${name}`}>
                <Fab color="primary" className={classes.fab}>
                  <GoTo classes={{ root: classes.goto }} />
                </Fab>
              </Tooltip>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const styles = () => ({
  card: {
    margin: 10,
    maxWidth: 280,
    background: 'aliceblue',
    height: '100%'
  },
  cardContent: {
    display: 'inline-block'
  },
  title: {
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  description: {
    fontFamily: 'Lucida Console, Monaco, monospace',
    marginBottom: 20,
    marginTop: 20
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuItem)
  )
);
