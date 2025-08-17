const noodle = {
  name: 'ก๋วยเตี๋ยว',
  image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2000&auto=format&fit=crop',
  price: 59,
  meatOptions: [
    {
      id: 'pork',
      name: 'หมู',
      image: 'https://images.unsplash.com/photo-1602847175243-4b761b7c3e7b?q=80&w=2000&auto=format&fit=crop',
      description: 'หมูนุ่มหอม หมักเครื่องเทศพิเศษ'
    },
    {
      id: 'chicken',
      name: 'ไก่',
      image: 'https://images.unsplash.com/photo-1619019187211-adf2a6be4ceb?q=80&w=2000&auto=format&fit=crop',
      description: 'เนื้อไก่ฉ่ำนุ่ม คัดพิเศษ'
    },
    {
      id: 'beef',
      name: 'เนื้อ',
      image: 'https://images.unsplash.com/photo-1603048297172-c84c7504d211?q=80&w=2000&auto=format&fit=crop',
      description: 'เนื้อวัวนำเข้า เนื้อนุ่มหอม'
    },
    {
      id: 'seafood',
      name: 'ทะเล',
      image: 'https://images.unsplash.com/photo-1565680018434-b583b38e94b7?q=80&w=2000&auto=format&fit=crop',
      description: 'อาหารทะเลสด รวมกุ้ง หอย ปลา'
    }
  ],
  noodleTypes: ['เส้นเล็ก', 'เส้นใหญ่', 'เส้นหมี่', 'บะหมี่', 'วุ้นเส้น'],
  soupOptions: ['น้ำใส', 'ต้มยำ', 'เย็นตาโฟ', 'น้ำตก'],
  spiceOptions: ['ไม่เผ็ด', 'เผ็ดน้อย', 'เผ็ดกลาง', 'เผ็ดมาก'],
  brothOptions: ['น้ำซุปหมู', 'น้ำซุปไก่', 'น้ำซุปเนื้อ', 'น้ำซุปต้มยำ'],
  sideOptions: ['ถั่วงอก', 'ผักบุ้ง', 'กะหล่ำปลี', 'ต้นหอม'],
  garnishOptions: ['พริกป่น', 'น้ำปลา', 'น้ำตาล', 'น้ำส้มสายชู'],
  toppingsOptions: ['หมูกรอบ', 'ไข่ต้ม', 'เกี๊ยว', 'ลูกชิ้นปลา']
}

export default noodle
