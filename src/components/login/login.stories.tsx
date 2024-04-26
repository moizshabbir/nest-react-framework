/* eslint-disable */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import {Login} from './login';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

export default {
  title: "Login",
  component: Login,
  decorators: [(story: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => <Provider store={store}>{story()}</Provider>]
};

export const Default = () => <Login />;

Default.story = {
  name: 'default',
};
