/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

module.exports = [
  // [\d\d] -> [\d]
  require('./char-class-remove-duplicates-transform'),

  // a{1,2}a{2,3} -> a{3,5}
  require('./quantifiers-merge-transform'),

  // a{1,} -> a+, a{3,3} -> a{3}, a{1} -> a
  require('./quantifier-range-to-symbol-transform'),

  // [0-9] -> [\d]
  require('./char-class-to-meta-transform'),

  // [\d] -> \d, [^\w] -> \W
  require('./char-class-to-single-char-transform'),

  // \e -> e
  require('./char-escape-unescape-transform'),

  // (ab|ab) -> (ab)
  require('./disjunction-remove-duplicates-transform'),

  // (a|b|c) -> [abc]
  require('./group-single-chars-to-char-class'),

  // (?:)a -> a
  require('./remove-empty-group-transform'),

  // (?:a) -> a
  require('./ungroup-transform'),

  // abcabcabc -> (?:abc){3}
  require('./combine-repeating-patterns-transform')
];