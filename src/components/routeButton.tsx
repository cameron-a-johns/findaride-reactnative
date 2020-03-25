import React from 'react';
import { Button } from 'react-native';
import { withRouter } from 'react-router-native';

interface Props {
  path: string;
  text: string;
}

export const RouteButton = ({ path, text }: Props) =>
  withRouter(({ history }) => {
    return <Button onPress={() => history.push(path)} title={text} />;
  });
