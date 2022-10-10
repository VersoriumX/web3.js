﻿/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import {
	ethAbiToJsonSchema,
	transformJsonDataToAbiFormat,
	codePointToInt,
	hexToNumber,
} from '../../src/utils';
import { abiToJsonSchemaCases } from '../fixtures/abi_to_json_schema';
import {
	validCodePoints,
	invalidCodePoints,
	validHexStrictDataWithNumber,
	invalidHexData,
} from '../fixtures/validation';

describe('utils', () => {
	describe('ethAbiToJsonSchema', () => {
		describe('full schema', () => {
			it.each(abiToJsonSchemaCases)('$title', ({ abi, json }) => {
				expect(ethAbiToJsonSchema(abi.fullSchema)).toEqual(json.fullSchema);
			});
		});

		describe('short schema', () => {
			it.each(abiToJsonSchemaCases)('$title', ({ abi, json }) => {
				expect(ethAbiToJsonSchema(abi.shortSchema)).toEqual(json.shortSchema);
			});
		});
	});

	describe('transformJsonDataToAbiFormat', () => {
		describe('full schema', () => {
			it.each(abiToJsonSchemaCases)('$title', ({ abi, json }) => {
				expect(transformJsonDataToAbiFormat(abi.fullSchema, json.data)).toEqual(abi.data);
			});
		});
	});

	describe('codePointToInt', () => {
		it.each(validCodePoints)('valid code points', (input, res) => {
			expect(codePointToInt(input)).toEqual(res);
		});

		it.each(invalidCodePoints)('valid code points', (input: number) => {
			expect(() => {
				codePointToInt(input);
			}).toThrow(new Error(`Invalid code point: ${input}`));
		});
	});

	describe('hexToNumber', () => {
		it.each(validHexStrictDataWithNumber)('valid hex string data', (input, res) => {
			expect(hexToNumber(input)).toEqual(res);
		});

		it.each(invalidHexData)('invalidHexData', (input: string) => {
			expect(() => {
				hexToNumber(input);
			}).toThrow(new Error('Invalid hex string'));
		});
	});
});
