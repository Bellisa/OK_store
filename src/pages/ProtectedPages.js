import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Profile } from './Profile';
import { Products } from './Admin/Products';
import { Categories } from './Admin/Categories';
import { Product } from './Admin/Product';
import { Category } from './Admin/Category';

export const ProtectedPages = () => (
  <Switch>
    <Redirect from="/login" to="/" />

    <Route path="/" exact component={Home} />

    <Route path="/profile" exact component={Profile} />

    <Route path="/Categories" exact component={Categories} />

    <Route path="/Categories/:category" component={Category} />

    <Route path="/Products" exact component={Products} />

    <Route path="/Products/:product" component={Product} />
  </Switch>
);
