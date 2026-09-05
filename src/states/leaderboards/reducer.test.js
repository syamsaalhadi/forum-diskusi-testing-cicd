import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer', () => {
  it('should return the initial state ([]) when given an unknown action', () => {
    const nextState = leaderboardsReducer([], { type: 'UNKNOWN' });

    expect(nextState).toEqual([]);
  });

  it('should return the leaderboards from payload when given SET_LEADERBOARDS action', () => {
    const leaderboards = [
      { user: { id: 'user-1', name: 'John Doe' }, score: 10 },
      { user: { id: 'user-2', name: 'Jane Doe' }, score: 5 },
    ];
    const action = { type: ActionType.SET_LEADERBOARDS, payload: { leaderboards } };

    const nextState = leaderboardsReducer([], action);

    expect(nextState).toEqual(leaderboards);
    expect(nextState).toHaveLength(2);
  });
});
