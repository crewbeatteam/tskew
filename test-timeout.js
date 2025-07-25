// Test timeout configuration
const { powo, ipni, kpl } = require('./dist/index.js');

async function testTimeout() {
  console.log('🧪 Testing timeout configuration...');
  console.log('='.repeat(60));

  // Test 1: Normal timeout (should work)
  console.log('\n🕐 Test 1: Normal timeout (10 seconds)');
  try {
    const start = Date.now();
    const results = powo.search('Rosa', null, { timeout: 10000 });
    const first = await results.first();
    const elapsed = Date.now() - start;
    console.log(`   ✅ Completed in ${elapsed}ms`);
    console.log(`   📋 Result: ${first?.name || 'No results'}`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Very short timeout (should timeout)
  console.log('\n⏱️  Test 2: Very short timeout (100ms - should timeout)');
  const start2 = Date.now();
  try {
    const results = powo.search('Rosa', null, { timeout: 100 });
    const first = await results.first();
    const elapsed = Date.now() - start2;
    console.log(`   ⚠️  Unexpectedly completed in ${elapsed}ms`);
    console.log(`   📋 Result: ${first?.name || 'No results'}`);
  } catch (error) {
    const elapsed = Date.now() - start2;
    console.log(`   ✅ Timed out as expected in ${elapsed}ms`);
    console.log(`   📋 Error: ${error.message}`);
  }

  // Test 3: Different APIs with different timeouts
  console.log('\n🔄 Test 3: Different APIs with custom timeouts');
  const tests = [
    { api: powo, name: 'POWO', query: 'Rosa', timeout: 5000 },
    { api: ipni, name: 'IPNI', query: 'Quercus', timeout: 8000 },
    { api: kpl, name: 'KPL', query: 'Poa', timeout: 3000 }
  ];

  for (const test of tests) {
    try {
      const start = Date.now();
      const results = test.api.search(test.query, null, { timeout: test.timeout });
      const first = await results.first();
      const elapsed = Date.now() - start;
      console.log(`   ${test.name}: ✅ ${elapsed}ms (timeout: ${test.timeout}ms)`);
    } catch (error) {
      console.log(`   ${test.name}: ❌ ${error.message}`);
    }
  }

  console.log('\n🎯 Timeout configuration test completed');
}

// Build and run test
console.log('🔨 Building...');
require('child_process').execSync('npm run build', { stdio: 'pipe' });

testTimeout();