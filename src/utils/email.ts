import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  
  try {
    const data = await resend.emails.send({
      from: 'Food Order <onboarding@resend.dev>',
      to: email,
      subject: 'รีเซ็ตรหัสผ่าน Food Order',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Sarabun', sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">รีเซ็ตรหัสผ่าน</h2>
            <p style="margin-bottom: 16px;">สวัสดีค่ะ/ครับ</p>
            <p style="margin-bottom: 16px;">เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ</p>
            <p style="margin-bottom: 16px;">กรุณาคลิกที่ปุ่มด้านล่างเพื่อตั้งรหัสผ่านใหม่:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; 
                        text-decoration: none; border-radius: 8px; font-weight: bold;">
                รีเซ็ตรหัสผ่าน
              </a>
            </div>
            <p style="margin-bottom: 16px; color: #666;">หากคุณไม่ได้เป็นผู้ขอรีเซ็ตรหัสผ่าน กรุณาไม่ต้องดำเนินการใดๆ และละเว้นอีเมลฉบับนี้</p>
            <p style="color: #666; font-size: 14px;">ลิงก์นี้จะหมดอายุภายใน 1 ชั่วโมง</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">อีเมลฉบับนี้ถูกส่งโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>
          </div>
        </body>
        </html>
      `
    });
    return data;
  } catch (error) {
    throw new Error('ไม่สามารถส่งอีเมลได้');
  }
}