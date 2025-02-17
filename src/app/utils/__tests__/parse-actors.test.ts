import { parseActors } from "@utils/parse-actors";

describe('parseActors', () => {
  const validActors = 'Robert De Niro, Meryl Streep, Al Pacino';
  const validResult = ['Robert De Niro', 'Meryl Streep', 'Al Pacino'];
  const invalidFullName = 'S@m Smit';

  it('should parse valid full names', () => {
    const res = parseActors(validActors);

    expect(res).toEqual(validResult);
  });

  it('should filter invalid full names', () => {
    const res = parseActors(`${validActors}, ${invalidFullName}`);

    expect(res).toEqual(validResult);
  });

  it('should trim redundant spaces', () => {
    const res = parseActors('Robert De Niro   , Meryl Streep ,   Al Pacino  ');

    expect(res).toEqual(validResult);
  });
});
