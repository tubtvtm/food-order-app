
# แอปสั่งอาหาร (Food Order App)

แอปพลิเคชันสั่งอาหารสมัยใหม่ สร้างด้วย Next.js และ TypeScript

## ฟีเจอร์หลัก

- ระบบยืนยันตัวตนผู้ใช้ (User authentication)
- ระบบสั่งอาหารแบบโต้ตอบได้ (Interactive food ordering)
- ฟังก์ชันตะกร้าสินค้า (Shopping cart)
- รองรับหลายช่องทางการชำระเงิน (Multiple payment methods)
- ติดตามสถานะคำสั่งซื้อแบบเรียลไทม์ (Real-time order tracking)

## เทคโนโลยีที่ใช้

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase Authentication
- การดีพลอยบน Vercel

## วิธีเริ่มต้นใช้งาน

1. โคลนโปรเจกต์นี้

```bash
git clone https://github.com/yourusername/food-order-app.git
````

2. ติดตั้ง dependencies

```bash
cd food-order-app
npm install
```

3. ตั้งค่าตัวแปรแวดล้อม
   สร้างไฟล์ `.env.local` และใส่ข้อมูลดังนี้:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

4. รันเซิร์ฟเวอร์สำหรับพัฒนา

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) บนเว็บเบราว์เซอร์ของคุณเพื่อดูผลลัพธ์

คุณสามารถแก้ไขไฟล์ `app/page.tsx` เพื่อเปลี่ยนแปลงหน้าแรกได้ ระบบจะอัปเดตให้อัตโนมัติ

โปรเจกต์นี้ใช้ [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) เพื่อปรับแต่งและโหลดฟอนต์ [Geist](https://vercel.com/font) ให้เหมาะสมโดยอัตโนมัติ

## เรียนรู้เพิ่มเติม

หากต้องการเรียนรู้เพิ่มเติมเกี่ยวกับ Next.js สามารถดูได้ที่:

* [เอกสาร Next.js (ภาษาอังกฤษ)](https://nextjs.org/docs) - เรียนรู้ฟีเจอร์และ API ของ Next.js
* [เรียนรู้ Next.js (ภาษาอังกฤษ)](https://nextjs.org/learn) - แบบฝึกหัด Next.js แบบอินเทอร์แอคทีฟ

นอกจากนี้ยังสามารถดู [GitHub repository ของ Next.js](https://github.com/vercel/next.js) เพื่อให้ข้อเสนอแนะหรือมีส่วนร่วมได้

## การดีพลอยบน Vercel

วิธีที่ง่ายที่สุดในการดีพลอยแอป Next.js คือใช้ [แพลตฟอร์ม Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) จากผู้สร้าง Next.js

ดูรายละเอียดเพิ่มเติมได้ที่ [เอกสารการดีพลอย Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

## เว็บไซต์ที่ Deploy แล้ว

🔗 ทดลองใช้งานแอปได้ที่:
[https://your-project-name.vercel.app](https://your-project-name.vercel.app)  *(เปลี่ยนเป็น URL ของคุณ)*

## การดีพลอย

แอปนี้จะถูกดีพลอยอัตโนมัติไปยัง Vercel ทุกครั้งที่มีการ push โค้ดไปยัง branch `main`

```

---

### วิธีใช้

- https://food-web-j7ew-git-main-tubtvtms-projects.vercel.app/


```

