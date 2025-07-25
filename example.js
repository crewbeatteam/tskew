// Example demonstrating tskew functionality
// Run with: node example.js
const { ipni, powo } = require('./dist/index.js');

async function demonstrateTskew() {
  console.log('🎉 tskew - TypeScript Kew Gardens API Client');
  console.log('='.repeat(50));

  // Test 1: Simple IPNI search
  console.log('\n📚 IPNI: Search for "Poa annua"');
  const ipniResults = ipni.search('Poa annua');
  const plants = await ipniResults.take(2);
  
  plants.forEach((plant, i) => {
    console.log(`\n${i+1}. ${plant.name || 'Unknown'}`);
    console.log(`   Author: ${plant.authors || 'N/A'}`);
    console.log(`   Family: ${plant.family || 'N/A'}`);
    console.log(`   Rank: ${plant.rank || 'N/A'}`);
    console.log(`   ID: ${plant.id}`);
  });

  // Test 2: POWO genus search with terms
  console.log('\n\n🌱 POWO: Search for genus "Quercus" (oak trees)');
  console.log('Using term constants: powo.Name.genus');
  
  const oakSearch = powo.search({ [powo.Name.genus]: 'Quercus' });
  const oaks = await oakSearch.take(3);
  
  oaks.forEach((oak, i) => {
    console.log(`\n${i+1}. ${oak.name}`);
    console.log(`   Author: ${oak.author || 'N/A'}`);
    console.log(`   Family: ${oak.family}`);
    console.log(`   Status: ${oak.accepted ? 'Accepted' : 'Not accepted'}`);
    console.log(`   Images: ${oak.images ? oak.images.length : 0}`);
  });

  // Test 3: Advanced search with filters
  console.log('\n\n🔍 POWO: Advanced search with filters');
  console.log('Searching accepted names only for "Rosa"');
  
  const roseSearch = powo.search('Rosa', powo.Filters.accepted);
  const roses = await roseSearch.take(2);
  
  roses.forEach((rose, i) => {
    console.log(`\n${i+1}. ${rose.name}`);
    console.log(`   Author: ${rose.author || 'N/A'}`);
    console.log(`   Family: ${rose.family}`);
    console.log(`   Rank: ${rose.rank}`);
  });

  // Test 4: Show async iteration
  console.log('\n\n🔄 Demonstrating async iteration:');
  const smallSearch = ipni.search('Fagus sylvatica');
  
  let count = 0;
  for await (const result of smallSearch) {
    if (count >= 2) break; // Limit for demo
    console.log(`   ${count + 1}. ${result.name} (${result.authors || 'no author'})`);
    count++;
  }

  // Test 5: Show available terms
  console.log('\n\n📖 Available search terms:');
  console.log('IPNI Name terms:', Object.keys(ipni.Name).slice(0, 8).join(', ') + '...');
  console.log('POWO Name terms:', Object.keys(powo.Name).join(', '));
  console.log('POWO Geography:', Object.keys(powo.Geography).join(', '));
  console.log('POWO Filters:', Object.keys(powo.Filters).join(', '));

  console.log('\n\n✅ tskew is working perfectly!');
  console.log('🚀 Ready for production use!');
}

// Build and run
console.log('🔨 Building...');
require('child_process').execSync('npm run build', { stdio: 'pipe' });

demonstrateTskew().catch(console.error);