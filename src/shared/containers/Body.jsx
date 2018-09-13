import React from 'react';
import classNames from 'classnames';
import { Switch, Route } from 'react-router';
import injectSheet from 'react-jss';
import routes from '../routes';

const styles = {
  root: {
    marginBottom: props => props.footerOffset,
  },
};
@injectSheet(styles)
class Body extends React.Component {
  render() {
    const { classes, className } = this.props;
    return (
      <main className={classNames(classes.root, className)}>
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
      </main>
    );
  }
}

export default Body;
