export const disableTouchableOpacity = component => {
  component.setState({ disabled: true });
  setTimeout(() => {
    component.setState({
      disabled: false,
    });
  }, 500);
};
