import { TestBed, async } from '@angular/core/testing';
import { StringBuilder } from './StringBuilder';

describe('StringBuilder', () => {
    let builder: StringBuilder;

    beforeEach(async(() => {
        builder = new StringBuilder();
    }));

    it('default constructor should success', async(() => {
        expect(builder).toBeTruthy();
        expect(builder.IsEmpty).toEqual(true);
    }));

    it(`append`, async(() => {
        builder.Append('wonderful').Append('2017');
        let result = builder.toString();

        expect(result).toEqual('wonderful2017');
    }));
    it(`append line`, async(() => {
        builder.AppendLine('wonderful').AppendLine('2017');
        let result = builder.toString();
        let actual = ['wonderful\r\n', '2017\r\n']

        expect(result).toEqual(actual.join(''));
    }));

    it(`append lines`, async(() => {
        builder.AppendLines(['wonderful', '2017']);
        let result = builder.toString();

        let actual = ['wonderful\r\n', '2017\r\n']

        expect(result).toEqual(actual.join(''));
    }));
    it(`join`, async(() => {
        builder.Append('wonderful').Append('2017');
        let actual = builder.Join('|');

        expect(actual).toEqual(['wonderful', '2017'].join('|'));
    }));
    it(`build`, async(() => {
        builder.Append('wonderful').Append('2017');
        let actual = builder.Build();

        expect(actual).toEqual(['wonderful', '2017'].join(''));
    }));
});