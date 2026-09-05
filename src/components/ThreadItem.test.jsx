import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import api from '../utils/api';
import renderWithProviders from '../test-utils/renderWithProviders';
import ThreadItem from './ThreadItem';

jest.mock('../utils/api');

const thread = {
  id: 'thread-1',
  title: 'Belajar React',
  body: '<p>Diskusi seputar React dan ekosistemnya.</p>',
  category: 'react',
  createdAt: new Date().toISOString(),
  ownerName: 'John Doe',
  ownerAvatar: 'https://example.com/avatar.png',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
};

describe('ThreadItem component', () => {
  it('should render the thread title, category, and total comments', () => {
    renderWithProviders(<ThreadItem {...thread} />, {
      preloadedState: { authUser: null },
    });

    expect(screen.getByText('Belajar React')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('should call the up-vote API with the thread id when the up-vote button is clicked by a logged-in user', async () => {
    api.upVoteThread.mockResolvedValue();
    const user = userEvent.setup();

    renderWithProviders(<ThreadItem {...thread} />, {
      preloadedState: { authUser: { id: 'user-1' } },
    });

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });
});
