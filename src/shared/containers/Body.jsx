import React from 'react';
import { Switch, Route } from 'react-router';
import injectSheet from 'react-jss';
import routes from '../routes';

const styles = {
  root: { position: 'relative' },
};
@injectSheet(styles)
class Body extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          {routes.map(({ path, exact, component: C }) => (
            <Route
              key={path}
              exact={exact}
              path={path}
              render={props => <C {...props} />}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default Body;
