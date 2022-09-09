/**
 * https://ramblings.mcpher.com/gassnippets2/simple-unit-test-library/
 * Uses library ID 1zOlHMOpO89vqLPe5XpC-wzA9r5yaBkWt_qFjKqFNsIZtNJ-iUjBYDt-x
 */
const unit = new bmUnitTester.Unit();



function simplestTest() {
unit.section(() => {
    unit.is('foo', 'foo', { description: 'foo is foo' })
    unit.not('foo', 'bar', { description: 'foo is not bar' })
    unit.is('foo', 'bar', { description: 'foo is bar SHOULD FAIL' })
  }, { description: 'sections can have descriptions' })

  // tests for equality by default use 'deepEqual
  unit.section(() => {
    const fixture = { a: 1, b: 2, c: { x: [1, 2, 3] } }
    unit.is(fixture, fixture, { description: 'deep equal comparison' })
    unit.is(fixture, { ...fixture }, { description: 'deep equal compares object values/content' })
    unit.not(fixture, { ...fixture }, {
      description: 'Using a custom compare',
      compare: (expect, actual) => expect === actual
    })
  }, { description: 'deepequal versus javascript equal' })  
   unit.section(() => {
    unit.is (undefined, undefined, {description: 'by default undefined is never good'})
    unit.is (null, null, {description: 'but null can be ok'})
    unit.is (undefined, undefined, {
      neverUndefined: false,
      description: 'but we can change that to allow undefined'
    })
    unit.is (null, null,  {
      neverNull: true,
      description: 'and lets make null always bad also'
    })
  }, {description: 'null and undefined treatment'})
}


function myUnitTestFunction() {
  // tests for equality by default use 'deepEqual
  unit.section(() => {
    const fixture = { a: 1, b: 2, c: { x: [1, 2, 3] } }
    unit.is(fixture, fixture, { description: 'deep equal comparison' })
    unit.is(fixture, { ...fixture }, { description: 'deep equal compares object values/content' })
    unit.not(fixture, { ...fixture }, {
      description: 'Using a custom compare',
      compare: (expect, actual) => expect === actual
    })
  }, { description: 'deepequal versus javascript equal' })  
}

function undefinedAndNull(){
  unit.section(() => {
    unit.is (undefined, undefined, {description: 'by default undefined is never good'})
    unit.is (null, null, {description: 'but null can be ok'})
    unit.is (undefined, undefined, {
      neverUndefined: false,
      description: 'but we can change that to allow undefined'
    })
    unit.is (null, null,  {
      neverNull: true,
      description: 'and lets make null always bad also'
    })
  }, {description: 'null and undefined treatment'})
}