import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('should render nothing when there are no categories', () => {
    const { container } = render(
      <CategoryFilter categories={[]} activeCategory="" onSelectCategory={() => {}} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render a button for each category plus a "Semua" button', () => {
    render(
      <CategoryFilter categories={['react', 'redux']} activeCategory="" onSelectCategory={() => {}} />,
    );

    expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#redux' })).toBeInTheDocument();
  });

  it('should call onSelectCategory with the clicked category', async () => {
    const onSelectCategory = jest.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter categories={['react']} activeCategory="" onSelectCategory={onSelectCategory} />,
    );
    await user.click(screen.getByRole('button', { name: '#react' }));

    expect(onSelectCategory).toHaveBeenCalledWith('react');
  });

  it('should call onSelectCategory with an empty string when "Semua" is clicked', async () => {
    const onSelectCategory = jest.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter categories={['react']} activeCategory="react" onSelectCategory={onSelectCategory} />,
    );
    await user.click(screen.getByRole('button', { name: 'Semua' }));

    expect(onSelectCategory).toHaveBeenCalledWith('');
  });
});
