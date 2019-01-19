import { TestBed, async } from '@angular/core/testing';
import { Enumerable } from './Enumerable';
import { IEnumerable } from './IEnumerable';
import { List } from './List';
import './CollectionExtensions';
import { Type } from '@angular/core';
import { Dictionary } from './Dictionary';

class Person {
    Name: string;
    Age: number;
}

describe('Dictionary', () => {
    let dict: Dictionary<string, Person>;

    beforeEach(async(() => {
        dict = new Dictionary<string, Person>();
        dict.Add('Andy', { Name: 'Andy', Age: 40 })
    }));

    it(`Get item`, async(() => {
        let item = dict.Item('Andy');
        expect(item).toBeTruthy();

    }));
});