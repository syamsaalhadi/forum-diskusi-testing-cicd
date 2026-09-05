import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('should render its children as the button label', () => {
    render(<Button>Kirim</Button>);

    expect(screen.getByRole('button', { name: 'Kirim' })).toBeInTheDocument();
  });

  it('should call onClick when clicked and not disabled', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Kirim</Button>);
    await user.click(screen.getByRole('button', { name: 'Kirim' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when the button is disabled', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick} disabled>Kirim</Button>);
    await user.click(screen.getByRole('button', { name: 'Kirim' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render as type="submit" when type prop is "submit"', () => {
    render(<Button type="submit">Kirim</Button>);

    expect(screen.getByRole('button', { name: 'Kirim' })).toHaveAttribute('type', 'submit');
  });
});
