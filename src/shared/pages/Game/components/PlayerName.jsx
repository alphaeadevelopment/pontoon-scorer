import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '../../../components';

class PlayerName extends React.Component {
  state = {
    editing: false,
    value: this.props.initialValue,
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
    if (this.ref) {
      this.ref.focus();
      this.ref.selectAll();
    }
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
      r.focus();
      if (r.select) r.select();
      if (r.setSelectionRange) r.setSelectionRange(0, this.state.value.length);
    }
  }
  render() {
    const { editing, value } = this.state;
    return (
      <div>
        {editing && <TextField inputRef={this.onSetRef} value={value} onChange={this.onChange} onBlur={this.onBlur} />}
        {!editing &&
          <Typography onClick={this.onStartEdit} variant={'body1'}>
            {value}
          </Typography>
        }
      </div>
    );
  }
}
export default PlayerName;
