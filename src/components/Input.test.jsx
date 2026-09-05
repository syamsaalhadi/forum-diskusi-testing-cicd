import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input component', () => {
  it('should render the label text when the label prop is provided', () => {
    render(<Input id="email" label="Email" onChange={() => {}} value="" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should not render a label element when the label prop is not provided', () => {
    render(<Input id="email" onChange={() => {}} value="" />);

    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });

  it('should call onChange with the typed value when the user types', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Input id="email" label="Email" value="" onChange={onChange} />);

    await user.type(screen.getByLabelText('Email'), 'a');

    expect(onChange).toHaveBeenCalled();
  });
});
