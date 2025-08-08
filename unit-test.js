// A simple script to test the API endpoints.
const API_URL = 'http://localhost:3000/api/x-transaction-redis';
const TRANSACTION_ID = 'github-action-test-1234';

const test = async () => {
  // Test 1: Successful new transaction
  console.log('Testing a new transaction...');
  try {
    const response1 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-transaction-id': TRANSACTION_ID,
      },
      body: JSON.stringify({ message: 'First test' }),
    });

    const data1 = await response1.json();
    if (response1.status !== 200) {
      console.error('Test 1 Failed: New transaction returned an error.', data1);
      process.exit(1);
    }
    console.log('Test 1 Passed: New transaction successful.');

    // Test 2: Duplicate transaction
    console.log('\nTesting a duplicate transaction...');
    const response2 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-transaction-id': TRANSACTION_ID,
      },
      body: JSON.stringify({ message: 'Second test' }),
    });

    const data2 = await response2.json();
    if (response2.status === 400 && data2.error_code === '40002') {
      console.log('Test 2 Passed: Duplicate transaction correctly blocked.');
    } else {
      console.error('Test 2 Failed: Duplicate transaction was not blocked.', data2);
      process.exit(1);
    }

  } catch (error) {
    console.error('An unexpected error occurred during tests:', error);
    process.exit(1);
  }
};

test();