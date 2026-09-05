import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButtons from './VoteButtons';

describe('VoteButtons component', () => {
  it('should display the correct up-vote and down-vote counts', () => {
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        userId={null}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onUpVote when the up-vote button is clicked', async () => {
    const onUpVote = jest.fn();
    const user = userEvent.setup();

    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        userId="user-1"
        onUpVote={onUpVote}
        onDownVote={() => {}}
      />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote when the down-vote button is clicked', async () => {
    const onDownVote = jest.fn();
    const user = userEvent.setup();

    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        userId="user-1"
        onUpVote={() => {}}
        onDownVote={onDownVote}
      />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);

    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('should not throw when userId is not provided (guest user)', () => {
    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        userId={undefined}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
