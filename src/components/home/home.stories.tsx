/* eslint-disable */
import { Provider } from 'react-redux';
import Home from './home';
import { store } from '../../app/store';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default {
  title: "Home",
  component: Home,
  decorators: [(story: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => <Provider store={store}>{story()}</Provider>]
};

export const Default = () => <Home />;

Default.story = {
  name: 'default',
};
