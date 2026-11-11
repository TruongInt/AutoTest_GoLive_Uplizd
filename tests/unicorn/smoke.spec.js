// tests/unicorn/smoke.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Unicorn - Daily Smoke', () => {

  test('CL-UNICORN-001: Landing page loads correctly', async ({ page }) => {
    await page.goto('https://unicorn.uplizd.ai/');
    
    // Kiểm tra trang load không quá chậm và có nội dung chính
    await expect(page).toHaveTitle(/Uplizd Unicorn|Unicorn/i);
    await expect(page.locator('body')).not.toBeEmpty();
    
    // Kiểm tra không bị trang trắng
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('CL-UNICORN-002: Navbar main tabs visible', async ({ page }) => {
    await page.goto('https://unicorn.uplizd.ai/');
    
    // Kiểm tra các tab quan trọng trên navbar (theo checklist)
    await expect(page.getByRole('link', { name: /About Uplizd/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('CL-UNICORN-007: Pricing section visible', async ({ page }) => {
    await page.goto('https://unicorn.uplizd.ai/');
    
    // Kéo xuống phần Pricing
    await page.getByText(/Pricing|120% Value Promise|Logic Only/i).first().scrollIntoViewIfNeeded();
    
    // Kiểm tra có ít nhất một trong các tier
    await expect(page.getByText(/Logic Only|Logic \+ Hosting|Full-Stack Build/i).first()).toBeVisible();
  });

  test('CL-UNICORN-010: Contact form elements visible', async ({ page }) => {
    await page.goto('https://unicorn.uplizd.ai/');
    
    // Tìm form liên hệ
    await page.getByText(/Contact|Submit Now|We’re Human/i).first().scrollIntoViewIfNeeded();
    
    // Kiểm tra các field cơ bản
    await expect(page.locator('input[name*="name"], input[placeholder*="Name"], input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="email"], input[name*="email"]').first()).toBeVisible();
  });

});