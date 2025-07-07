const defaultFooter = `
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 12px; color: #888; line-height: 1.5; text-align: center;">
    You are receiving this email because you registered on <strong>FileForge</strong>.<br />
    If this wasn’t you, please ignore this email or <a href="mailto:support@syncspace.app" style="color: #888;">contact support</a>.<br /><br />
    &copy; ${new Date().getFullYear()} SyncSpace 2025, All rights reserved.<br />
    <span style="font-size: 11px;">Made with ❤️ in India</span>
  </p>
`;

export const getVerificationEmailHtml = (name: string, code: string): string => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px;">
    <h2 style="color: #333;">Verify your email address</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thanks for signing up to <strong>FileForge</strong>! Use the verification code below to verify your email address:</p>
    
    <div style="text-align: center; margin: 24px 0;">
      <div style="display: inline-block; padding: 16px 32px; font-size: 24px; letter-spacing: 4px; background-color: #f0f0f0; border-radius: 8px; font-weight: bold; color: #333;">
        ${code}
      </div>
    </div>

    <p>Enter this code in the app to complete your verification.</p>
    <p style="font-size: 12px; color: #999;">This code will expire in 48 hours.</p>
    ${defaultFooter}
  </div>
`;
