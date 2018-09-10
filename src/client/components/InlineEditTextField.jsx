import React from 'react';
import TextField from '@material-ui/core/TextField';
import injectSheet from 'react-jss';
import Typography from './Typography';

const styles = {
  root: {
  },
};
export class RawInlineEditTextField extends React.Component {
  state = {
    editing: false,
    value: this.props.value,
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  onStartEdit = () => {
    this.setState({
      editing: true,
    });
    this.focusAndSelect();
  }
  onBlur = () => {
    this.props.onChange(this.state.value);
    this.setState({
      editing: false,
    });
  }
  onSetRef = (r) => {
    if (r) {
      this.ref = r;
      this.focusAndSelect();
    }
  }
  focusAndSelect = () => {
    if (this.ref) {
      this.ref.focus();
      if (this.ref.select) this.ref.select();
      if (this.ref.setSelectionRange) this.ref.setSelectionRange(0, this.state.value.length + 1);
    }
  }
  render() {
    const { editing } = this.state;
    const { onChange, onBlur, inputRef, value, ...props } = this.props;
    return (
      <div>
        {editing &&
          <TextField
            inputRef={this.onSetRef}
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.value}
            {...props}
          />
        }
        {!editing &&
          <Typography onClick={this.onStartEdit} variant={'body1'}>
            {value}
          </Typography>
        }
      </div>
    );
  }
}
export default injectSheet(styles)(RawInlineEditTextField);
