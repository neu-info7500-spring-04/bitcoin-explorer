import { test, expect } from '@playwright/test';

test.describe('UtxoChart component', () => {
    test('fetches data with valid address', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        
        // Fill the input field with a valid Bitcoin address
        await page.fill('input[type="text"]', '3MfsfKpuUKYB7ML13o5gXFeg8Wx48DanmH');
        
        // Click the button to fetch data
        await page.click('button');
        
        // Assert that the chart is rendered
        await page.waitForSelector('.highcharts-series');
        const chartVisible = await page.isVisible('.highcharts-series');
        expect(chartVisible).toBeTruthy();
    });
});

test.describe('UtxoPieChart component', () => {
    test('renders pie chart with valid data', async ({ page }) => {
        const utxos = [
            {
                txid: 'txid1',
                vout: 0,
                status: {
                    confirmed: true,
                    blockHeight: 12345,
                    blockHash: 'blockHash1',
                    blockTime: 1234567890,
                },
                value: 1000,
            },
            {
                txid: 'txid2',
                vout: 1,
                status: {
                    confirmed: true,
                    blockHeight: 67890,
                    blockHash: 'blockHash2',
                    blockTime: 2345678901,
                },
                value: 2000,
            },
        ];

        await page.goto('http://localhost:3000/');
        
        // Mock the data
        await page.evaluate((utxos) => {
            window['mockUtxos'] = utxos;
        }, utxos);
        
        // Assert that the chart is rendered
        await page.waitForSelector('.highcharts-series');
        const chartVisible = await page.isVisible('.highcharts-series');
        expect(chartVisible).toBeTruthy();
    });
});
