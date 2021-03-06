/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const {transform} = require('../../../transform');
const charUnescape = require('../char-escape-unescape-transform');

describe('\e -> e', () => {

  it('simple chars', () => {
    const re = transform(/\e\*/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/e\*/.toString());
  });

  it('preserve escape', () => {
    const re = transform(/\*\^\$\(\)\[\|/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/\*\^\$\(\)\[\|/.toString());
  });

  it('unescapes curly braces', () => {
    const re = transform(/\{\}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/{}/.toString());
  });

  it('does not unescape \{ when looking like a quantifier', () => {
    let re = transform(/a\{3}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a\{3}/.toString());

    re = transform(/a\{3,}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a\{3,}/.toString());

    re = transform(/a\{10,12}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a\{10,12}/.toString());
  });

  it('does not unescape \} when looking like a quantifier', () => {
    let re = transform(/a{3\}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a{3\}/.toString());

    re = transform(/a{3,\}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a{3,\}/.toString());

    re = transform(/a{10,12\}/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/a{10,12\}/.toString());
  });

  it('char class', () => {
    const re = transform(/[\e\*\(\]\ \^\$\-]\(\n/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/[e*(\] ^$-]\(\n/.toString());
  });

  it('does not unescape \^ in char class when in first position', () => {
    const re = transform(/[\^a]/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/[\^a]/.toString());
  });

  it('does not unescape \- in char class when not in first or last position', () => {
    const re = transform(/[a\-z]/, [
      charUnescape,
    ]);
    expect(re.toString()).toBe(/[a\-z]/.toString());
  });

});