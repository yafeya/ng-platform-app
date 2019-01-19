import { TestBed, async } from '@angular/core/testing';
import { ActionRepository } from './ActionRepository';
import { Action } from './Action';

describe('ActionRepository', () => {

    let repository: ActionRepository;

    beforeEach(async(() => {
        repository = new ActionRepository();
    }));

    it('default constructor should success', async(() => {
        expect(repository).toBeTruthy();
        expect(repository.Actions.Count).toEqual(0);
    }));

    it(`register action`, async(() => {
        let action = new Action(() => { });
        action.Name = 'test';
        action.Group = 'test';
        action.Tag = 'test';

        repository.Register(action);

        expect(repository.Actions.Count).toEqual(1);
    }));

    it(`find action by name`, async(() => {
        let action = new Action(() => { });
        action.Name = 'test';
        action.Group = 'test';
        action.Tag = 'test';

        repository.Register(action);
        let result = repository.FindOne(action.Name);
        expect(result.Name).toEqual(action.Name);
        expect(result.Group).toEqual(action.Group);
        expect(result.Tag).toEqual(action.Tag);

    }));

    it(`find all actions`, async(() => {
        let action = new Action(() => { });
        action.Name = 'test';
        action.Group = 'test';
        action.Tag = 'test';

        repository.Register(action);

        let action1 = new Action(() => { });
        action1.Name = 'test1';
        action1.Group = 'test';
        action1.Tag = 'test1';

        repository.Register(action1);

        let result = repository.Find(x => x.Group === action.Group);
        expect(result.Count).toEqual(2);
    }));

    it(`invoke action`, async(() => {
        let invoked = false;
        let value = 0;
        let action = new Action((arg: any) => {
            invoked = true;
            value = arg;
        });

        action.Invoke(2);
        expect(invoked).toEqual(true);
        expect(value).toEqual(2);
    }));
});