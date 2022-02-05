import * as fromGeneral from './general.actions';

describe('addCountries', () => {


  it('should return an action', () => {
    let countries:Array<any> = [];
    expect(fromGeneral.addCountries({countries: countries}).type).toBe('[General] Add Countries');
  });
});
