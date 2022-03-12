import { UserClass } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new UserClass(1, '1', '1')).toBeTruthy();
  });
});
