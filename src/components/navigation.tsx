import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const NavWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: ${Dimensions.get('window').width}px;
  height: 90px;
  background-color: red;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  border: none;
`;

const NavItem = styled.View`
  min-width: ${Dimensions.get('window').width / 5}px;

  &:not(:last-child) {
    border-right: 1px solid black;
  }
`;

const navItems = (
  <>
    <NavItem style={{ backgroundColor: 'white' }} />
    <NavItem style={{ backgroundColor: 'yellow' }} />
    <NavItem style={{ backgroundColor: 'green' }} />
    <NavItem style={{ backgroundColor: 'white' }} />
    <NavItem style={{ backgroundColor: 'yellow' }} />
  </>
);

export const Navigation: React.FC = () => {
  return <NavWrapper>{navItems}</NavWrapper>;
};
